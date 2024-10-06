import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import colors from "colors";
import { MongoClient, ServerApiVersion } from "mongodb";

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

const PORT: string | number = process.env.PORT || 4000;

const MONGO_URI: string = process.env.MONGO_URI!;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MONGO_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
});

async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!".green
				.bold
		);
	} catch (error) {
		console.log("<index.ts> error", (error as Error).toString().red.bold);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}!`.yellow.bold);
	run().catch(console.dir);
});
