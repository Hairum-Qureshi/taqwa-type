import { Decimal128 } from "mongodb";
import { InferSchemaType, Schema, model } from "mongoose";

const progressSchema = new Schema(
	{
		uid: {
			type: String,
			ref: "User",
			default: null
		},
		surahNumber: {
			type: Number,
			required: true,
			default: null
		},
		completionStatus: {
			type: String,
			default: "Incomplete"
		},
		progressCompleted: {
			type: Decimal128,
			default: 0.0
		}
	},
	{
		timestamps: true
	}
);

type Progress = InferSchemaType<typeof progressSchema>;
export default model<Progress>("Progress", progressSchema);
