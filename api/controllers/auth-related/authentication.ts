import { Request, Response } from "express";
import { nanoid } from "nanoid";
import User from "../../models/user";
import bcrypt from "bcrypt";
import VerificationCode from "../../models/verification";
import { sendVerificationEmail, sendWelcomeEmail } from "../../mailtrap/emails/account-related";
import { checkAndUnbanUser, checkIfUserExists, createCookie } from "./handlers";

// TODO - need to implement code that will delete the verification code in 24hrs if the user hasn't verified their account within that time frame
// TODO - also consider where if the user hasn't verified their email in 24hrs, delete their account info from MongoDB 

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
				await sendWelcomeEmail(createdUser.email, createdUser._id);
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

	try {
		const uuid: string = nanoid().replace(/-/g, "").replace(/_/g, "");

		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		if(!emailRegex.test(email)) {
			res.status(400).json({
				message: "Invalid email"
			});
		}
		else {
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

const signOut = (req:Request, res:Response) => {
	try {
		res.clearCookie("auth-session");
		res.status(200).send("Success");
	} catch (error) {
		console.error(
			"<authentication.ts> (controllers folder) signIn function ERROR".red.bold,
			(error as Error).toString()
		);
		res.status(500).json({
			message: (error as Error).toString()
		});
	}
}
  
export { googleAuth, signUp, signIn, signOut };

