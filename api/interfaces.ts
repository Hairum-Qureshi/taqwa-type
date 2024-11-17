import { JwtPayload } from "jsonwebtoken";

export interface UserJWTPayload extends JwtPayload {
    user_id: string | null;
}

export interface IUser {
	_id: string;
	first_name: string;
	last_name: string;
	full_name: string;
	isGoogleAccount: boolean;
	email: string;
	pfp: string;
	password: string;
	experience: number;
	mostPracticedSurah: string;
	totalSurahsCompleted: string;
	wordsPerMinute: string;
	accuracy: number;
	streak: string;
	createdAt: string;
}

export interface UserReport {
	_id: string;
	full_name: string;
	email: string;
	pfp: string;
	createdAt: string;
	hasBeenBannedBefore: boolean;
	hasBeenWarnedBefore: boolean;
};
