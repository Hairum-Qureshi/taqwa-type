import { Decimal128 } from "mongodb";
import { Schema, model } from "mongoose";

const sectionSchema = new Schema(
	{
		uid: {
			type: String,
			ref: "User",
		},
		sectionNumber: {
			type: Number,
			required: true
		},
		chapterNumber: {
			type: Number,
			required: true
		},
		verseRange: {
			type: String,
			required: true
		},
		latestTime: {
			type: String,
			default: "00:00"
		},
		bestTime: {
			type: String,
			default: "00:00"
		},
		wpm: {
			type: Number,
			default: 0
		},
		isCompleted: {
			type: Boolean,
			default: false
		},
		accuracy: {
			type: Decimal128,
			default: 0.0
		}
	},
	{
		timestamps: true
	}
);

export const SectionSchema = sectionSchema;
export const Section = model("Section", sectionSchema);