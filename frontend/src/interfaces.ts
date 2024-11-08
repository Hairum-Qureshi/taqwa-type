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
};

export interface SurahResponse {
    data: Surah[];
};
 
export interface SPTChildren { // SPT = SurahProgressTracker
    user: UserData | null;
    userData: UserData | null;
}

export interface AccountHandlers {
    getAccountDataByID: (user_id: string) => Promise<UserData | null>;
    searchSurah: (surah: string) => void;
    filteredSurahs: Surah[];
    isLoadingSurahs: boolean;
    isProgressLoading: boolean;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>, imageRef:React.RefObject<HTMLImageElement | null>) => void;
    uploadPfp: (fileInputRef:React.RefObject<HTMLInputElement>) => void;
    reportAccount: () => void;
}