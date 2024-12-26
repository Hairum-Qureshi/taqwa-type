import { Decimal128 } from "mongodb";
import { Schema, model } from "mongoose";
import { SectionSchema } from "./section";

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
            type: [SectionSchema],
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

// type Surah = InferSchemaType<typeof surahSchema>;
// export default model<Surah>("Surah", surahSchema);

export const SurahSchema = surahSchema;
export const Surah = model("Surah", surahSchema);