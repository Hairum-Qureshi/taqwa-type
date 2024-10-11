import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		first_name: {
			type: String,
			required: true
		},
		last_name: {
			type: String,
			required: true
		},
		full_name: {
			type: String,
			required: true
		},
		isGoogleAccount: {
			type: Boolean,
			default: false
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		pfp: {
			type: String,
			required: true,
			default: "https://pbs.twimg.com/media/FegInEPXkAAS1PE.png"
		},
		password: {
			type: String,
			required: false
		}
	},
	{
		timestamps: true
	}
);

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);
