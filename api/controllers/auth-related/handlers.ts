import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as crypto from "crypto";
import bcrypt from "bcrypt";
import { sendPasswordResetEmail, sendPasswordResetSuccessEmail, sendWelcomeEmail } from "../../mailtrap/emails/account-related";
import PasswordResetToken from "../../models/reset-token";
import { IUser } from "../../interfaces";
import User from "../../models/user";
import VerificationCode from "../../models/verification";
import { sendAccountStatusEmail } from "../../nodemailer";

function createCookie(user_id: string, res: Response) {
	const payload = {
		user_id
	};
	const secretKey: string = process.env.JWT_SECRET!;
	const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
	res.cookie("auth-session", token, { 
		httpOnly: true, 
		secure: process.env.NODE_ENV === "production", 
		sameSite: 'strict', 
		maxAge: 7 * 24 * 60 * 60 * 1000 
	}); // 1 week in milliseconds
}

async function checkIfUserExists(email: string): Promise<boolean> {
	const user: Document[] = await User.find({ email });
	return user.length !== 0;
}

async function checkAndUnbanUser(user_id: string): Promise<boolean> {
	// If true -> account is still banned
	// If false -> account is no longer (or never was) banned
	try {
		const user = await User.findById({ _id: user_id });

		if (!user || !user.isBanned) {
			console.log("User not found or not banned.");
			return false;
		}

		const bannedDate = Number(new Date(user.bannedDate));
		const currentDate = Number(new Date());

		const hasBeenAMonth: boolean =
			currentDate - bannedDate >= 30 * 24 * 60 * 60 * 1000; // 30 days in ms

		if (hasBeenAMonth) {
			// Unban the user and notify them
			User.findByIdAndUpdate(user_id, {
				isBanned: false,
				bannedDate: null
			});
			// Send notification to the user (e.g., via email, SMS, etc.)
			sendAccountStatusEmail(user.email);
			return false;
		}
	} catch (err) {
		console.error("Error checking and unbanning user:", err);
	}

	return true;
}

const verifyEmail = async (req:Request, res:Response) => {
	const { code } = req.body;
	try {
		const user_verification = await VerificationCode.findOne({
			verificationCode: code,
			expires: { $gt: Date.now() }
		}).populate("user_id").lean();
		  
		if (!user_verification) {
			res.status(400).json({ message: "This verification code might have expired or is invalid" });
		} 
		else {
			const user = user_verification.user_id as unknown as IUser;
			await User.findByIdAndUpdate({ _id: user._id }, { isVerified: true });
			createCookie(user._id, res);
			await VerificationCode.findByIdAndDelete({ _id: user_verification._id });
			await sendWelcomeEmail(user.email);
			res.status(200).json({ message: "Email verified successfully!", user_id: user._id });
		}  
	} catch (error) {
		console.error(
			"<authentication.ts> (controllers folder) verifyEmail function ERROR".red.bold,
			(error as Error).toString()
		);
		res.status(500).json({
			message: (error as Error).toString()
		});
	}
}

const resetPassword = async (req:Request, res:Response) => {
	const { email } = req.body;
	try {
        if(email.endsWith("@gmail.com")) {
            res.status(400).json({ message: "Sorry, you're not able to reset your password because you're using a Gmail account." });
        }

		const user_exists = await User.findOne({ email });
		if(user_exists) {
			// const token = await generateToken(user_exists._id);
			const resetToken = crypto.randomBytes(20).toString("hex");
			const resetTokenExpiration = Date.now() + 1 * 60 * 60 * 1000 // 1 hour

			await PasswordResetToken.create({
				token: resetToken,
				expires: resetTokenExpiration,
				user_id: user_exists._id
			})

			await sendPasswordResetEmail(email, resetToken);
		}
		else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error(
			"<authentication.ts> (controllers folder) resetPassword function ERROR".red.bold,
			(error as Error).toString()
		);
		res.status(500).json({
			message: (error as Error).toString()
		});
	}
}

const updatePassword = async (req: Request, res: Response) => {
	const { token } = req.params;
	const { password } = req.body;
  
	try {
		const resetToken = await PasswordResetToken.findOne({ token });

		if (!resetToken) {
			res.status(404).json({ message: "Invalid token" });
		}
  
		const currentTime = Date.now();
		if (currentTime >= resetToken!.expires) {
			await PasswordResetToken.findByIdAndDelete(resetToken!._id);
			res.status(400).json({ message: "Token has expired" });
		}
  
		const hashedPassword = await bcrypt.hash(password, 10);
		await User.findByIdAndUpdate(resetToken!.user_id, { password: hashedPassword });  
		const user = await resetToken!.populate("user_id");
		const user_data = user.user_id as unknown as IUser;
  
		if (user_data) {
			await sendPasswordResetSuccessEmail(user_data.email);
			await PasswordResetToken.findByIdAndDelete(resetToken!._id);
			res.status(200).json({ message: "Password updated successfully" });
		} 
		else {
			res.status(400).json({ message: "User not found" });
	 	}
  
	} catch (error) {
		console.error(
			"<authentication.ts> (controllers folder) updatePassword function ERROR".red.bold,
			(error as Error).toString()
	    );
		res.status(500).json({ message: (error as Error).toString() });
	}
};

export { verifyEmail, checkIfUserExists, createCookie, checkAndUnbanUser, resetPassword, updatePassword };
