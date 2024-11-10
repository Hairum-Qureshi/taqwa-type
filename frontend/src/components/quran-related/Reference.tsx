import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Verse } from "../../interfaces";
import LoadingSpinner from "../LoadingSpinner";

export default function Reference() {
    const [englishSurah, setEnglishSurah] = useState<Verse[]>([]);
    const { surah_no, ayahs } = useParams();

    useEffect(() => {
        const getSurahInfo = async () => {
            try {
                const englishSurahRes = await axios.get(`https://raw.githubusercontent.com/risan/quran-json/refs/heads/main/data/editions/en.json`);
                
                if(ayahs) {
                    const verses:string[] = ayahs?.split("-");
                    if(verses.length > 1) {
                        setEnglishSurah(englishSurahRes.data[Number(surah_no)].slice(Number(verses[0]) - 1, Number(verses[1])));
                    } 
                    else {
                        setEnglishSurah([englishSurahRes.data[Number(surah_no)][Number(verses[0]) - 1]]);
                    }
                }

            } catch (error) {
                console.error(error);
            }
        };
    
        getSurahInfo();
    }, [surah_no]); 
    
    return (
        englishSurah.length === 0 ? <LoadingSpinner /> : 
        <div className="w-3/4 my-10 m-auto p-4 border border-slate-300 rounded-md bg-gray-100">
            {englishSurah.length > 0 ? (
                englishSurah.length === 1 ? (
                <p className="text-lg mb-5">
                    ({englishSurah[0].verse}) {englishSurah[0].text}.
                </p>
            ) : (
                    englishSurah.map((verse: Verse, index: number) => (
                        <p key={index} className="text-lg mb-5">
                            ({verse.verse}) {verse.text}.
                        </p>
                    ))
                )
            ) : (
                <p>No verses found.</p>
            )}
        </div>
    );      
}
