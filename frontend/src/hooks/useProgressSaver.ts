import { useParams } from "react-router-dom";
import axios from "axios";

interface ProgressSaver {
    saveProgress: (accuracy: string, wpm:string, timeSpent: string) => void;
}

const ENG_SURAHS = [
    "Al-Faatihah",
    "Al-Baqarah",
    "Aal-I-Imran",
    "An-Nisa",
    "Al-Maidah",
    "Al-An'am",
    "Al-A'raf",
    "Al-Anfal",
    "At-Tawbah",
    "Yunus",
    "Hud",
    "Yusuf",
    "Ar-Ra'd",
    "Ibrahim",
    "Al-Hijr",
    "An-Nahl",
    "Al-Isra",
    "Al-Kahf",
    "Maryam",
    "Taha",
    "Al-Anbiya",
    "Al-Hajj",
    "Al-Mu'minun",
    "An-Nur",
    "Al-Furqan",
    "Ash-Shu'ara",
    "An-Naml",
    "Al-Qasas",
    "Al-Ankabut",
    "Ar-Rum",
    "Luqman",
    "As-Sajda",
    "Al-Ahzab",
    "Saba",
    "Fatir",
    "Ya-Sin",
    "As-Saffat",
    "Sad",
    "Az-Zumar",
    "Ghafir",
    "Fussilat",
    "Ash-Shura",
    "Az-Zukhruf",
    "Ad-Dukhan",
    "Al-Jathiya",
    "Al-Ahqaf",
    "Muhammad",
    "Al-Fath",
    "Al-Hujurat",
    "Qaf",
    "Adh-Dhariyat",
    "At-Tur",
    "An-Najm",
    "Al-Qamar",
    "Ar-Rahman",
    "Al-Waqia",
    "Al-Hadid",
    "Al-Mujadila",
    "Al-Hashr",
    "Al-Mumtahina",
    "As-Saff",
    "Al-Jumua",
    "Al-Munafiqun",
    "At-Taghabun",
    "At-Talaq",
    "At-Tahrim",
    "Al-Mulk",
    "Al-Qalam",
    "Al-Haqqa",
    "Al-Maarij",
    "Nuh",
    "Al-Jinn",
    "Al-Muzzammil",
    "Al-Muddathir",
    "Al-Qiyama",
    "Al-Insan",
    "Al-Mursalat",
    "An-Naba",
    "An-Nazi'at",
    "Abasa",
    "At-Takwir",
    "Al-Infitar",
    "Al-Mutaffifin",
    "Al-Inshiqaq",
    "Al-Buruj",
    "At-Tariq",
    "Al-A'la",
    "Al-Ghashiya",
    "Al-Fajr",
    "Al-Balad",
    "Ash-Shams",
    "Al-Lail",
    "Ad-Duha",
    "Ash-Sharh",
    "At-Tin",
    "Al-Alaq",
    "Al-Qadr",
    "Al-Bayyina",
    "Az-Zalzala",
    "Al-Adiyat",
    "Al-Qaria",
    "At-Takathur",
    "Al-Asr",
    "Al-Humaza",
    "Al-Fil",
    "Quraish",
    "Al-Ma'un",
    "Al-Kawthar",
    "Al-Kafiroon",
    "An-Nasr",
    "Al-Masad",
    "Al-Ikhlas",
    "Al-Falaq",
    "An-Nas"
];
  
export default function useProgressSaver():ProgressSaver {
    const { surah_no } = useParams();

    async function saveProgress(accuracy: string, wpm:string, timeSpent: string) {
        const englishSurahRes = await axios.get(`https://raw.githubusercontent.com/risan/quran-json/refs/heads/main/data/editions/en.json`);

        // TODO - don't forget: for the Surah model, add an attempts array which will store the last 20 attempts the user made on the surah and replace the oldest attempt with the newest if the max is reached

        const surahNameEng = ENG_SURAHS[Number(surah_no) - 1];

        if(accuracy && wpm && timeSpent !== "00:00") {
            const decimalAccuracy = Number(accuracy.split("%")[0]) / 100;
            const numWPM = Number(wpm);
            const surahHasSections:boolean = englishSurahRes.data[Number(surah_no)].length > 15;
    
            await axios.post("http://localhost:4000/api/surah/save-progress", {
                decimalAccuracy,
                numWPM,
                surahHasSections,
                timeSpent,
                surahNameEng,
                surah_no,
                numVerses: englishSurahRes.data[Number(surah_no)].length
            }, {
                withCredentials: true
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.error(error);
            });
        }        
    }

    return { saveProgress };
}