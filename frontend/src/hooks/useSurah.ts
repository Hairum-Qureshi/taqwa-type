import axios from "axios";
import { useEffect, useState } from "react";
import { Verse } from "../interfaces";
import { useParams } from "react-router-dom";

export default function useSurah() {
    const [englishSurahData, setEnglishSurahData] = useState<Verse[]>([]);
    const { surah_no, ayahs } = useParams();

    useEffect(() => {
        const getSurahInfo = async () => {
            try {
                const englishSurahRes = await axios.get(`https://raw.githubusercontent.com/risan/quran-json/refs/heads/main/data/editions/en.json`);
                
                if(ayahs) {
                    const verses:string[] = ayahs?.split("-");
                    if(verses.length > 1) {
                        setEnglishSurahData(englishSurahRes.data[Number(surah_no)].slice(Number(verses[0]) - 1, Number(verses[1])));
                    } 
                    else {
                        setEnglishSurahData([englishSurahRes.data[Number(surah_no)][Number(verses[0]) - 1]]);
                    }
                }

            } catch (error) {
                console.error(error);
            }
        };
    
        getSurahInfo();
    }, [surah_no]); 

    return { englishSurahData };
}