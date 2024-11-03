import { JwtPayload } from "jsonwebtoken";

export interface UserJWTPayload extends JwtPayload {
    user_id: string | null;
}