import { Request, Response } from "express";
import Progress from "../models/progress";
import User from "../models/user";
import { UserReport } from "../interfaces";
import { jwtDecode, JwtDecodeOptions, JwtPayload } from "jwt-decode";
import { UserJWTPayload } from "../interfaces";
import checkNSFW from "../utils/content-moderator";
import { sendBanEmail, sendPermanentBanEmail, sendWarningEmail } from "../mailtrap/emails/moderation-related";

const getUserProgress = async (req: Request, res: Response) => {
	const uid = req.params.user_id;
	try {
		const [userProgress] = await Progress.find({ uid }).lean();
		if (!userProgress) {
			// User has no progress
			// const Surahs = mongoose.model<Document>(
			// 	"surahs",
			// 	new mongoose.Schema({}, { strict: false })
			// );
			// const surahs = await Surahs.findOne();
			res.status(200).send("No progress found");
		} else {
			res.json(userProgress);
		}
	} catch (error) {
		console.log(
			"There was an error (user.ts file, getUserProgress function)",
			(error as Error).toString().red.bold
		);
	}
};

const reportUser = async (req: Request, res: Response) => {
	// TODO - need to implement a check to see if a user has reported this user (to prevent them from reporting repeatedly)
	const { user_id } = req.body;
	try {
		const user = await User.findById({ _id: user_id }).lean();
		if(user) {
			const isNSFW:boolean = await checkNSFW(user.pfp);
			if(isNSFW) {
				// check if the user has been warned before
				if(user.hasBeenWarnedBefore) {
					// if the user has been warned before, ban them
					// check if they've been banned before
					if(user.hasBeenBannedBefore) {
						// let the user know they've been permanently banned
						User.findByIdAndUpdate({ _id: user_id }, {
							$set: {
								hasBeenPermanentlyBanned: true		
							}
						});
						// delete their auth token
						res.clearCookie("auth-session");
						// send them an email
						sendPermanentBanEmail(user.email);
					}
					else {
						const ban = await User.findByIdAndUpdate(user_id, { $set: { banned: true } });
						// delete their auth token
						res.clearCookie("auth-session");

						// send email letting the user know they've been banned
						sendBanEmail(user.email);

						res.status(200).send("Your account has been banned");
					}
				}
				else {
					// warn user
					await User.findByIdAndUpdate(user_id, { $set: { hasBeenWarnedBefore: true } });
					// send warning email
					sendWarningEmail(user.email, user.pfp);
				}
				console.log('nsfw');
			}
			else {
				// user is good
				console.log('sfw');
			}
		} 
		else {
			res.status(404).send("User not found");
		}
	} catch (error) {
		console.log(
			"There was an error (user.ts file, reportUser function)",
			(error as Error).toString().red.bold
		);
	}
};

async function returnUserData(uid:string) {
	// use this as a helper function to return the user data by ID from Mongo to prevent duplicate code
}

const getCurrentUser = async (req:Request, res:Response) => {
	const uid: string = req.cookies.decoded_uid;
	const user = await User.findById(uid).select("_id first_name last_name email pfp experience totalSurahsCompleted wordsPerMinute accuracy streak mostPracticedSurah createdAt");
	res.status(200).send(user);
}

const getUserData = async (req:Request, res:Response) => {
	const user = await User.findById(req.params.user_id).select("_id first_name last_name email pfp experience totalSurahsCompleted wordsPerMinute accuracy streak createdAt");
	if(user) {
		res.status(200).send(user);
	}
	else {
		res.status(404).send("User not found");
	}
}

const getAllUsers = async (req:Request, res:Response) => {

}

export { getUserProgress, reportUser, getCurrentUser, getUserData, getAllUsers };
