import { Request, Response } from "express";

const googleAuth = (req: Request, res: Response) => {
	const { email, first_name, last_name, full_name, pfp } = req.body;

	console.log({
		email,
		first_name,
		last_name,
		full_name,
		pfp
	});
};

export { googleAuth };
