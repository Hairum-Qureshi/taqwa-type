import { InferSchemaType, Schema, model } from "mongoose";

const verificationSchema = new Schema(
	{
		verificationCode: {
            type: String,
            default: null
        },
        expires: {
            type: Number,
            default: null
        },
        user_id: {
            type: String,
            ref: "User"
        }
	}
);

type VerificationCode = InferSchemaType<typeof verificationSchema>;
export default model<VerificationCode>("verification-code", verificationSchema);
