import { InferSchemaType, Schema, model } from "mongoose";

const resetTokenSchema = new Schema(
	{
		token: {
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

type PasswordResetToken = InferSchemaType<typeof resetTokenSchema>;
export default model<PasswordResetToken>("reset-token", resetTokenSchema);
