import { Request, Response } from "express";
import Progress from "../models/progress";
import User from "../models/user";
import { sendReport, sendBanEmail } from "../nodemailer";
import { UserReport } from "../types";

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
	// const { user_id } = req.cookies.auth_session; // get the UID of the current logged in user

	try {
		const user = await User.findById({ _id: user_id }).lean();
		const reporter = "";
		if (user) {
			const { _id, full_name, email, pfp, createdAt, hasBeenBannedBefore } =
				user;

			const report: UserReport = {
				_id: _id!,
				full_name,
				email,
				pfp,
				createdAt: createdAt.toString(),
				hasBeenBannedBefore
			};

			const backend_base_url = "http://localhost:4000";
			const frontend_base_url = "http://localhost:5173";

			sendReport(report, backend_base_url, reporter, frontend_base_url);
		} else {
			console.log(
				"User not found. This user may have deleted their account or the user ID may be incorrect"
			);
		}
	} catch (error) {
		console.log(
			"There was an error (user.ts file, reportUser function)",
			(error as Error).toString().red.bold
		);
	}
};

const banUser = async (req: Request, res: Response) => {
	const { user_id } = req.params;

	// TODO - consider implementing helper function that will find the user and return the user data instead of repeating the same code over and over again

	try {
		const user = await User.findById({ _id: user_id }).lean();
		if (user) {
			const { full_name, email, pfp } = user;

			User.findByIdAndUpdate(user_id, {
				isBanned: true,
				bannedDate: new Date(),
				hasBeenBannedBefore: true
			}).then(() => {
				sendBanEmail(full_name, email, pfp);
				res.send("<h1>User successfully banned</h1>");
			});

			// TODO - delete that user's cookie

			// Send email to user when their account is unbanned
		}
	} catch (error) {
		console.log(
			"There was an error (user.ts file, banUser function)",
			(error as Error).toString().red.bold
		);
	}
};

export { getUserProgress, reportUser, banUser };
