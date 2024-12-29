import { JwtPayload } from "jsonwebtoken";

export interface UserJWTPayload extends JwtPayload {
	user_id: string | null;
}

interface Section {
	uid: string;
	sectionNumber: number;
	chapterNumber: number;
	verseRange: string;
	latestTime: string;
	bestTime: string;
	wpm: number;
	isCompleted: boolean;
	accuracy: number;
	createdAt: Date;
	updatedAt: Date;
}

interface Surah {
	uid: string;
	chapterName: string;
	chapterNo: number;
	noVerses: number;
	wpm: number;
	accuracy: number;
	isCompleted: boolean;
	sections: Section[];
	timeSpent: string;
	progress: number;
	completionStatus: string;
	numSections: string;
	createdAt: Date;
	updatedAt: Date;
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
	totalSurahsCompleted: number;
	wordsPerMinute: number;
	accuracy: number;
	streak: number;
	isBanned: boolean;
	isPermanentlyBanned: boolean;
	bannedDate: Date;
	hasBeenBannedBefore: boolean;
	hasBeenWarnedBefore: boolean;
	isVerified: boolean;
	surahs: Surah[];
	createdAt: Date;
	updatedAt: Date;
}

export interface UserReport {
	_id: string;
	full_name: string;
	email: string;
	pfp: string;
	createdAt: string;
	hasBeenBannedBefore: boolean;
	hasBeenWarnedBefore: boolean;
}

export interface SurahProgress {
	chapterNo: number;
	progress: number;
	isCompleted: boolean;
	timeSpent: string;
	accuracy: number;
	wpm: number;
}
