import { Request, Response } from "express";
import { nanoid } from "nanoid";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendAccountStatusEmail } from "../nodemailer";
import VerificationCode from "../models/verification";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails";

async function checkIfUserExists(email: string): Promise<boolean> {
	const user: Document[] = await User.find({ email });
	return user.length !== 0;
}

interface IUser {
	_id: string;
	first_name: string;
	last_name: string;
	full_name: string;
	isGoogleAccount: boolean;
	email: string;
	pfp: string;
	password: string;
	experience: number;
	mostPracticedSurah: string;
	totalSurahsCompleted: string;
	wordsPerMinute: string;
	accuracy: number;
	streak: string;
}

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
			}).then(() => {
				// sendAccountStatusEmail(full_name, email, pfp);
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

const googleAuth = async (req: Request, res: Response) => {
	try {
		const { email, first_name, last_name, full_name, pfp } = req.body;

		const uuid: string = nanoid().replace(/-/g, "").replace(/_/g, "");

		const userExists: boolean = await checkIfUserExists(email);

		if (!userExists) {
			const createdUser = await User.create({
				_id: uuid,
				first_name,
				last_name,
				full_name,
				isGoogleAccount: true,
				email,
				pfp,
				isVerified: true
			});

			if (createdUser && createdUser._id) {
				createCookie(createdUser._id, res);

				res.status(201).send(createdUser);
			}
		} else {
			const [user] = await User.find({ email }).lean();
			if (user) {
				if (!user.isBanned) {
					createCookie(user._id!, res);
					res.status(201).send(user);
				} else if (user.isBanned) {
					const stillBanned: boolean = await checkAndUnbanUser(user._id!);
					if (stillBanned) {
						res.status(403).send({ message: "Your account is banned" });
					} else {
						createCookie(user._id!, res);
						res.status(201).json({
							message: "Your account is no longer banned",
							data: user
						});
					}
				}
			}
		}
	} catch (error) {
		console.error(
			"<authentication.ts> (controllers folder) googleAuth function ERROR".red
				.bold,
			(error as Error).toString()
		);
		res.status(500).json({
			message: (error as Error).toString()
		});
	}
};

const signUp = async (req: Request, res: Response) => {
	const { first_name, last_name, full_name, email, password } = req.body;
	// TODO - check if email is valid

	try {
		const uuid: string = nanoid().replace(/-/g, "").replace(/_/g, "");
		const userExists: boolean = await checkIfUserExists(email);
		if (!userExists) {
			const hashedPassword = await bcrypt.hash(password, 10);
			const verificationCode:string = Math.floor(100000 + Math.random() * 900000).toString();

			const createdUser = await User.create({
				_id: uuid,
				first_name,
				last_name,
				full_name,
				isGoogleAccount: false,
				email,
				password: hashedPassword,
			});

			const createdVerificationCode = await VerificationCode.create({
				user_id: uuid,
				verificationCode,
				expires: Date.now() + 24 * 60 * 60 * 1000 // expires in 24 hours
			});

			if (createdUser && createdVerificationCode && createdUser._id) {
				// createCookie(createdUser._id, res);
				await sendVerificationEmail(createdUser.email, verificationCode);
				if(createdUser.isVerified) {
					res.status(201).send(createdUser);
				}
				else {
					res.status(201).send({
						message: "Please check your inbox for a verification code"
					});
				}
			}
		} else {
			const [user] = await User.find({ email }).lean();
			if (user.email.endsWith("@gmail.com")) {
				res.status(200).json({ message: "Login with Google" });
			} else {
				res.status(200).json({ message: "User already exists" });
			}
		}
	} catch (error) {
		console.error(
			"<authentication.ts> (controllers folder) signUp function ERROR".red.bold,
			(error as Error).toString()
		);
		res.status(500).json({
			message: (error as Error).toString()
		});
	}
};

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
			// TODO - *might* want to come back to this part and look over the type-casting and verify everything works fine
			const user = user_verification.user_id as unknown as IUser;  
			await User.findByIdAndUpdate({ _id: user._id }, { isVerified: true });
			createCookie(user._id, res);
			await VerificationCode.findByIdAndDelete({ _id: user_verification._id });
			await sendWelcomeEmail(user.email);
			res.status(200).json({ message: "Email verified successfully!" });
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

const signIn = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const userExists: boolean = await checkIfUserExists(email);
		if (!userExists) {
			res
				.status(401)
				.json({ message: "No account corresponds with this email address" });
		} else {
			const [user] = await User.find({ email }).lean();
			// const user: Document[] = await User.find({ email });
			const isPassword: boolean = await bcrypt.compare(
				password,
				user.password!
			);
			if (isPassword && !user.isBanned && user.isVerified) {
				if (user && user._id) {
					createCookie(user._id, res);

					res.status(201).send(user);
				}
			} else {
				if (isPassword && user.isBanned) {
					const isStillBanned: boolean = await checkAndUnbanUser(user._id!);
					if (isStillBanned) {
						res.status(403).send({ message: "Your account is banned" });
					} else {
						createCookie(user._id!, res);
						res.status(201).json({
							message: "Your account is no longer banned",
							data: user
						});
					}
				} 
				else if(isPassword && !user.isVerified) {
					res.status(403).send({ message: "Your account is not verified. Please check your inbox for a verification code" });
				}
				else {
					res.status(401).json({ message: "Incorrect password" });
				}
			}
		}
	} catch (error) {
		console.error(
			"<authentication.ts> (controllers folder) signIn function ERROR".red.bold,
			(error as Error).toString()
		);
		res.status(500).json({
			message: (error as Error).toString()
		});
	}
};

export { googleAuth, signUp, verifyEmail, signIn };
