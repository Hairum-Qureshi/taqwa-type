import { Request, Response } from "express";
import User from "../models/user";
import { SurahProgress, UserReport } from "../interfaces";
import { jwtDecode, JwtDecodeOptions, JwtPayload } from "jwt-decode";
import { UserJWTPayload } from "../interfaces";
import checkNSFW from "../utils/content-moderator";
import { sendBanEmail, sendPermanentBanEmail, sendWarningEmail } from "../mailtrap/emails/moderation-related";

const SELECT_PARAMS = "_id first_name last_name email pfp experience totalSurahsCompleted wordsPerMinute accuracy streak createdAt";

const getUserProgress = async (req:Request, res:Response) => {
	try {
		const user = await User.findById({ _id: req.params.user_id }).lean();
		const progressData: SurahProgress[] = [];

		if(user && user.surahs) {
			for(let i = 0; i < user.surahs.length; i++) {
				progressData.push({
					chapterNo: user.surahs[i].chapterNo,
					progress: Number(user.surahs[i].progress),
					isCompleted: user.surahs[i].completionStatus === "Completed",
					timeSpent: user.surahs[i].timeSpent,
					accuracy: Number(user.surahs[i].accuracy),
					wpm: user.surahs[i].wpm
				});
			}
		}

		res.status(200).send(progressData);

	} catch (error) {
			console.log(
				"There was an error (user.ts file, getUserProgress function)",
				(error as Error).toString().red.bold
			);
	}
}

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
	const user = await User.findById(uid).select(SELECT_PARAMS);
	res.status(200).send(user);
}

const getUserData = async (req:Request, res:Response) => {
	const user = await User.findById(req.params.user_id).select(SELECT_PARAMS);
	if(user) {
		res.status(200).send(user);
	}
	else {
		res.status(404).send("User not found");
	}
}

const getAllUsers = async (req:Request, res:Response) => {
	const USERS_PER_PAGE = 10; 
	const page = Number(req.query.page) || 1;
	const filterBy = req.query.filter;	


	try {
		const numUsers = await User.countDocuments();
		const pageCount = Math.ceil(numUsers / USERS_PER_PAGE); 
		const skip = (page - 1) * USERS_PER_PAGE;
		// TODO - add a type for 'users'
		let users;

		switch (filterBy) {
			case 'wpm': 
				users = await User.find({}).sort({
					wordsPerMinute: -1
				}).limit(USERS_PER_PAGE).skip(skip).select(SELECT_PARAMS);
				break;
			case 'accuracy':
				users = await User.find({}).sort({
					accuracy: -1
				}).limit(USERS_PER_PAGE).skip(skip).select(SELECT_PARAMS);
				break;
			case 'surahs-practiced':
				users = await User.find({}).sort({
					totalSurahsCompleted: -1
				}).limit(USERS_PER_PAGE).skip(skip).select(SELECT_PARAMS);
				break;
			case 'date-joined':
				users = await User.find({}).sort({
					createdAt: -1
				}).limit(USERS_PER_PAGE).skip(skip).select(SELECT_PARAMS);
				break;
			default:
				users = await User.find({}).limit(USERS_PER_PAGE).skip(skip).select(SELECT_PARAMS);
		}

		res.json({ users, pageCount, numUsers });

	} catch (error) {
		console.log(
			"There was an error (user.ts file, getAllUsers function)",
			(error as Error).toString().red.bold
		);
	}
}

const searchUser = async (req:Request, res:Response) => {
	const { nameToSearch } = req.body;
	const USERS_PER_PAGE = 10;
	const page = Number(req.query.page) || 1;
	const filterBy = req.query.filter;	
	try {
		const numUsers = await User.countDocuments({ $text: { $search: nameToSearch } });
		const pageCount = Math.ceil(numUsers / USERS_PER_PAGE); 
		const skip = (page - 1) * USERS_PER_PAGE;
		// TODO - add a type for 'users'
		let users;
	
		switch (filterBy) {
			case 'wpm': 
				users = await User.find({ $text: { $search: nameToSearch } }).sort({
					wordsPerMinute: -1
				}).limit(USERS_PER_PAGE).skip(skip).select(SELECT_PARAMS);
				break;
			case 'accuracy':
				users = await User.find({ $text: { $search: nameToSearch } }).sort({
					accuracy: -1
				}).limit(USERS_PER_PAGE).skip(skip).select(SELECT_PARAMS);
				break;
			case 'surahs-practiced':
				users = await User.find({ $text: { $search: nameToSearch } }).sort({
					surahsPracticed: -1
				}).limit(USERS_PER_PAGE).skip(skip).select(SELECT_PARAMS);
				break;
			case 'date-joined':
				users = await User.find({ $text: { $search: nameToSearch } }).sort({
					createdAt: -1
				}).limit(USERS_PER_PAGE).skip(skip).select(SELECT_PARAMS);
				break;
			default:
				users = await User.find({ $text: { $search: nameToSearch } }).limit(USERS_PER_PAGE).skip(skip).select(SELECT_PARAMS);
		}

		res.json({ users, pageCount, numUsers });
	} catch (error) {
		console.log(
			"There was an error (user.ts file, getAllUsers function)",
			(error as Error).toString().red.bold
		);
	}
}

export { getUserProgress, reportUser, getCurrentUser, getUserData, getAllUsers, searchUser };
