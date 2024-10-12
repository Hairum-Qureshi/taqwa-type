import { Request, Response } from "express";
import { nanoid } from "nanoid";
import User from "../models/user";

const googleAuth = async (req: Request, res: Response) => {
	const { email, first_name, last_name, full_name, pfp } = req.body;

	try {
		const uuid: string = nanoid().replace(/-/g, "").replace(/_/g, "");

		const user = await User.create({
			_id: uuid,
			first_name,
			last_name,
			full_name,
			isGoogleAccount: true,
			email,
			pfp
		});

		console.log(user);
		res.status(201).json({ message: "User created successfully", user });
	} catch (error) {
		console.error(
			"<authentication.ts> (controllers folder) ERROR".red.bold,
			(error as Error).toString()
		);
		// res
		// 	.status(500)
		// 	.json({ message: "Error creating user", error: error.message });
	}
};

export { googleAuth };
