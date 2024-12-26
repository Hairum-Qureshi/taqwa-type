import { Decimal128 } from "mongodb";
import { InferSchemaType, Schema, model } from "mongoose";
import Section from "./section";

const surahSchema = new Schema(
	{
		uid: {
            type: String,
            required: true,
            ref: "User"
        },
        chapterName: {
            type: String,
            required: true
        },
        chapterNo: {
            type: Number,
            required: true
        },
        noVerses: {
            type: Number,
            required: true
        },
        wpm: {
            type: Number,
            required: true
        },
        accuracy: {
            type: Decimal128,
			default: 0.0
        },
        isCompleted: {
			type: Boolean,
			default: false
		},
        sections: {
            type: [Section],
            default: []
        },
        progress: {
            type: Decimal128,
			default: 0.0
        },
        completionStatus: {
			type: String,
			default: "Incomplete"
		},
	},
	{
		timestamps: true
	}
);

type Surah = InferSchemaType<typeof surahSchema>;
export default model<Surah>("Surah", surahSchema);
