import express from "express";
import {
	banUser,
	getUserProgress,
	reportUser,
	warnUser
} from "../controllers/user";
import upload from "./config/handle_uploads";
import fs from "fs";
import path from "path";
const router = express.Router();
import colors from "colors";

colors.enable();

router.get("/:user_id/progress", getUserProgress);

router.post("/upload/pfp", upload.single("profile_picture"), (req, res) => {
	const FOLDER_PATH = path.join(__dirname, "..", "/temp_images");
	try {
		fs.readdir(FOLDER_PATH, (err, files) => {
			files.forEach(async file => {
				const uploadedImagePath = path.resolve(
					__dirname,
					`../temp_images/${file}`
				);
			});
		});

		res.status(200).send("Success");
	} catch (error) {
		console.log("There was an error", (error as Error).toString().red.bold);
	}
});

router.post("/report", reportUser);

// TODO - implement middleware to double check that only the admin has access to this route; you may need to update your user model to include a 'isAdmin' property
router.get("/:user_id/ban", banUser);

router.get("/:user_id/email", warnUser);

export default router;
