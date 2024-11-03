import express from "express";
import {
	banUser,
	getCurrentUser,
	getUserProgress,
	reportUser,
	warnUser
} from "../controllers/user";
import upload from "./config/handle_uploads";
import fs from "fs";
import path from "path";
const router = express.Router();
import colors from "colors";
import { v2 as cloudinary } from "cloudinary";
import { jwtDecode } from "jwt-decode";
import cloundinary_config from "./config/cloudinary";
import User from "../models/user";
import { UserJWTPayload } from "../interfaces";

colors.enable();
router.get("/:user_id/progress", getUserProgress);

router.post(
	"/upload/pfp",
	upload.single("profile_picture"),
	async (req, res) => {
		const FOLDER_PATH = path.join(__dirname, "..", "/temp_images");
		// TODO - need to have middleware check if the user has a cookie or not
		try {
			cloundinary_config; // need this here for the config to be recognized
			const user_cookie: string | undefined = req.cookies["auth-session"];
			if (user_cookie) {
				const decoded_cookie: UserJWTPayload = jwtDecode(user_cookie);
				fs.readdir(FOLDER_PATH, (err, files) => {
					files.forEach(async file => {
						const uploadedImagePath = path.resolve(
							__dirname,
							`../temp_images/${file}`
						);

						if (err) {
							console.error('<user.ts> POST route error', (err as Error).toString().red.bold);
						} else {
							const uid = decoded_cookie.user_id;
							cloudinary.uploader
								.upload(uploadedImagePath, {
									public_id: `${uid}-profile_picture` 
								})
								.then(async uploadResult => {
									if (uploadResult?.url) {
										fs.unlink(path.join(FOLDER_PATH, file), err => {
											if (err) throw err;
										});

										await User.findByIdAndUpdate({_id: uid}, {
											pfp: uploadResult.url || "https://pbs.twimg.com/media/FegInEPXkAAS1PE.png"
										});
									}
								})
								.catch(error => {
									console.log('<user.ts> routes folder POST request ERROR'.red.bold, error);
								});
						}
					});
				});

				res.status(200).send("Success");
			}
		} catch (error) {
			console.log("There was an error", (error as Error).toString().red.bold);
		}
	}
);

router.post("/report", reportUser);

// TODO - implement middleware to double check that only the admin has access to this route; you may need to update your user model to include a 'isAdmin' property
router.get("/:user_id/ban", banUser);

router.get("/:user_id/email", warnUser);

// router.get(":user_id/user", getUser);

router.get('/current', getCurrentUser);

export default router;
