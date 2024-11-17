import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authenticated = (req: Request, res: Response, next: NextFunction) => {
	const token: string | undefined = req.cookies["auth-session"];
	const secret: string = process.env.JWT_SECRET!;
	if (token) {
		jwt.verify(
			token,
			secret,
			(err: Error | null, decoded: string | jwt.JwtPayload | undefined) => {
				if (err) {
					console.log("<authentication.ts> middleware".yellow.bold, err);
					res.status(401).json({ message: "Invalid token" });
				} else {
					const decoded_parsed: JwtPayload = decoded as JwtPayload;
					req.cookies.decoded_uid = decoded_parsed.user_id;
					next();
				}
			}
		);
	} else {
		res.status(401).json({ message: "Unauthorized" });
	}
};

export { authenticated };
