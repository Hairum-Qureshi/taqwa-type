import { Request, Response } from "express";
import { nanoid } from "nanoid";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

async function checkIfUserExists(email: string): Promise<boolean> {
	const user: Document[] = await User.find({ email });
	return user.length !== 0;
}

// interface IUser {
// 	_id: string;
// 	first_name: string;
// 	last_name: string;
// 	full_name: string;
// 	isGoogleAccount: boolean;
// 	email: string;
// 	pfp: string;
// 	password: string;
// 	experience: number;
// 	mostPracticedSurah: string;
// 	totalSurahsCompleted: string;
// 	wordsPerMinute: string;
// 	accuracy: number;
// 	streak: string;
// }

function createCookie(user_id: string, res: Response) {
	const payload = {
		user_id
	};
	const secretKey: string = Math.floor(
		Math.random() * Number(new Date())
	).toString();
	const token = jwt.sign(payload, secretKey, { expiresIn: "3d" });
	res.cookie("auth-session", token, { httpOnly: true, maxAge: 259200000 }); // 3 days in milliseconds
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
				pfp
			});

			if (createdUser && createdUser._id) {
				createCookie(createdUser._id, res);

				res.status(201).send(createdUser);
			}
		} else {
			const [user] = await User.find({ email }).lean();
			if (user && user._id && !user.isBanned) {
				createCookie(user._id, res);

				res.status(201).send(user);
			} else if (user && user.isBanned) {
				res.status(403).send({ message: "Your account has been banned" });
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

			const createdUser = await User.create({
				_id: uuid,
				first_name,
				last_name,
				full_name,
				isGoogleAccount: false,
				email,
				password: hashedPassword
			});

			if (createdUser && createdUser._id) {
				createCookie(createdUser._id, res);

				res.status(201).send(createdUser);
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

const signIn = async (req: Request, res: Response) => {
	// TODO - check if email is valid

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
			if (isPassword && !user.isBanned) {
				if (user && user._id) {
					createCookie(user._id, res);

					res.status(201).send(user);
				}
			} else {
				if (isPassword && user.isBanned) {
					res.status(401).json({ message: "Your account has been banned" });
				} else {
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

export { googleAuth, signUp, signIn };
