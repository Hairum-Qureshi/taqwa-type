import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import colors from "colors";
import authentication from "./routes/authentication";
import user from "./routes/user";
import mongoose from "mongoose";
import surah from "./routes/surah";

dotenv.config();
colors.enable();

const app = express();

const corsOptions = {
	origin: process.env.FRONTEND_URL,
	credentials: true,
	optionSuccessStatus: 200
};

const PORT: string | number = process.env.PORT || 4000;
const MONGO_URI: string = process.env.MONGO_URI!;

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authentication);
app.use("/api/user", user);
app.use("/api/surah", surah);

mongoose
	.connect(MONGO_URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log(
				`Successfully connected to MongoDB! Server listening on port ${PORT}`
					.yellow.bold
			);
		});
	})
	.catch(err => {
		console.log(err);
	});
