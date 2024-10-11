import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import colors from "colors";
import { MongoClient, ServerApiVersion } from "mongodb";
import authentication from "./routes/authentication";

dotenv.config();
colors.enable();

const app = express();

const corsOptions = {
	origin: process.env.FRONTEND_URL,
	credentials: true,
	optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authentication);

const PORT: string | number = process.env.PORT || 4000;

const MONGO_URI: string = process.env.MONGO_URI!;

const client = new MongoClient(MONGO_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
});

async function run() {
	try {
		await client.connect();
		await client.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!".green
				.bold
		);
	} catch (error) {
		console.log("<index.ts> error", (error as Error).toString().red.bold);
	} finally {
		await client.close();
	}
}

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}!`.yellow.bold);
	run().catch(console.dir);
});
