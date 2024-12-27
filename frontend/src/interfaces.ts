export interface UserData {
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
    pfp: string,
    experience: number,
    totalSurahsCompleted: number,
    wordsPerMinute: number,
    accuracy: number,
    streak: number,
    createdAt: string
}

export interface AuthState {
    user: UserData | null;
    loading: boolean;
    error: string | null;
}

export interface Surah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
    progress?: number,
    isCompleted?: boolean,
    timeSpent?: string,
	accuracy?: number,
	wpm?: number
};

export interface SurahResponse {
    data: Surah[];
};
 
export interface SPTChildren { // SPT = SurahProgressTracker
    user: UserData | null;
    userData: UserData | null;
}

export interface AccountHandlers {
    // getAccountDataByID: (user_id: string) => Promise<UserData | null>;
    getAccountDataByID: () => void;
    searchSurah: (surah: string) => void;
    filteredSurahs: Surah[];
    isLoadingSurahs: boolean;
    isProgressLoading: boolean;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>, imageRef:React.RefObject<HTMLImageElement | null>) => void;
    uploadPfp: (fileInputRef:React.RefObject<HTMLInputElement>) => void;
    reportAccount: () => void;
    user: UserData | null;
    userData: UserData | null;
    errorMessage: string;
}

export interface SurahInfo {
    id: number,
    chapter_id: number,
    language_name: string,
    short_text: string,
    source: string,
    text: string
}

export interface Verse {
    chapter: number,
    verse: number,
    text: string
}

export interface AuthTools {
	googleAuth: (
		email: string,
		first_name: string,
		last_name: string,
		full_name: string,
		pfp: string
	) => void;
	signUp: (
		e: React.FormEvent,
		first_name: string,
		last_name: string,
		email: string,
		password: string
	) => void;
	login: (e: React.FormEvent, email: string, password: string) => void;
	showVerification: boolean
	verifyUser: (digits:string) => void;
    forgotPassword: (email:string) => void;
    resetPassword: (password:string, retypedPassword:string, token:string) => void;
}

export interface Section {
    section_no: number,
    verses: string, // etc. in the form: 1-55
    url: string
}

export interface SurahTools {
    englishSurahData: Verse[];
    sections: Section[]
}

export interface UserProps {
    user_id: string,
    full_name: string,
    wpm: number,
    surahsPracticed: number,
    accuracy: number,
    pfp: string
}

export interface UserHandlers {
    allUserData: UserData[]
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    queryPage: number;
    maxPages: number;
    numUsers: number;
    filterWPM: () => void;
    filterAccuracy: () => void;
    filterSurahsPracticed: () => void;
    filterDateJoined: () => void;
    loading: boolean;
    searchUser: (nameToSearch:string) => void;
    isSearching: boolean;
}

export interface SurahProgress {
	chapterNo: number,
	progress: number,
	isCompleted: boolean
}