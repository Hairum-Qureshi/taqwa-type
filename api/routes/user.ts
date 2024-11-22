import express from "express";
import {
	banUser,
	getCurrentUser,
	getUserData,
	getUserProgress,
	reportUser,
	warnUser
} from "../controllers/user";
import upload from "./config/handle_uploads";
import fs from "fs";
import path from "path";
import colors from "colors";
import { v2 as cloudinary } from "cloudinary";
import { jwtDecode } from "jwt-decode";
import cloundinary_config from "./config/cloudinary";
import User from "../models/user";
import { UserJWTPayload } from "../interfaces";
import { checkAuthStatus } from "../middleware/checkAuthStatus";
import isNSFW from "../utils/content-moderator";

const router = express.Router();

colors.enable();
router.get("/:user_id/progress", getUserProgress);

router.post(
    "/upload/pfp",
    checkAuthStatus,
    upload.single("profile_picture"),
    async (req, res) => {
        const FOLDER_PATH = path.join(__dirname, "..", "/temp_images");
        try {
            cloundinary_config; // Ensure Cloudinary configuration is loaded

            // Read files in the temp_images folder
            const files = await fs.promises.readdir(FOLDER_PATH);

            for (const file of files) {
                const uploadedImagePath = path.resolve(__dirname, `../temp_images/${file}`);

                // Check for NSFW content
                if (await isNSFW(uploadedImagePath)) {
                    // Remove the file
                    await fs.promises.unlink(uploadedImagePath);

                    // Respond immediately with an error
                    res.status(400).json({ message: "NSFW content is not allowed" });
					return;
                }

                // Process the file
                const uid = req.cookies.decoded_uid;
                try {
                    const uploadResult = await cloudinary.uploader.upload(uploadedImagePath, {
                        public_id: `${uid}-profile_picture`,
                    });

                    if (uploadResult?.url) {
                        // Delete the local file
                        await fs.promises.unlink(uploadedImagePath);

                        // Update the user's profile picture in the database
                        await User.findByIdAndUpdate(
                            { _id: uid },
                            {
                                pfp: uploadResult.url || "https://pbs.twimg.com/media/FegInEPXkAAS1PE.png",
                            }
                        );
                    }
                } catch (uploadError) {
                    console.error(
                        "<user.ts> Cloudinary upload error:".red.bold,
                        uploadError
                    );
                }
            }

            res.status(200).send("Success");
			return;
        } catch (error) {
            console.error("There was an error", (error as Error).toString().red.bold);
            res.status(500).send("An error occurred while processing your request.");
			return;
        }
    }
);

router.post("/report", checkAuthStatus, reportUser);

// TODO - implement middleware to double check that only the admin has access to this route; you may need to update your user model to include a 'isAdmin' property
//! checkAdminStatus -> middleware to check if the user is an admin

// router.get("/:user_id/ban", checkAdminStatus, banUser);

// router.get("/:user_id/email", checkAdminStatus, warnUser);

// router.get(":user_id/user", getUser);

router.get('/current', checkAuthStatus, getCurrentUser);

router.get('/:user_id', checkAuthStatus, getUserData);

export default router;
