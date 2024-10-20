import express from "express";
import { getUserProgress, reportUser } from "../controllers/user";
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

// router.post("/:user_id/ban", banUser);

export default router;
