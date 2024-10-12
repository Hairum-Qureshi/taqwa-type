import { Request, Response } from "express";
import { nanoid } from "nanoid";
import User from "../models/user";

async function checkIfUserExists(email: string): Promise<boolean> {
	const user: Document[] = await User.find({ email });
	return user.length !== 0;
}

const googleAuth = async (req: Request, res: Response) => {
	try {
		// TODO - encrypt password
		// TODO - check if email is valid

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

			res.status(201).send(createdUser);
			console.log(createdUser);
		} else {
			res.status(200).json({ message: "User already exists" });
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
		const userExists: boolean = await checkIfUserExists(email);
		if (!userExists) {
			const createdUser = await User.create({
				_id: uuid,
				first_name,
				last_name,
				full_name,
				isGoogleAccount: false,
				email,
				password
			});

			res.status(201).send(createdUser);
		} else {
			const user = await User.find({ email });
			if (user[0].email.endsWith("@gmail.com")) {
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

export { googleAuth, signUp };
