import axios from "axios";
import { useEffect, useState } from "react";
import { Surah, Verse } from "../interfaces";
import { useParams } from "react-router-dom";

export default function useSurah() {
    const [englishSurahData, setEnglishSurahData] = useState<Verse[]>([]);
    const { surah_no, ayahs, section_no } = useParams();
    const surahs = localStorage.getItem("surahs");
    const [surahData, setSurahData] = useState<Surah>(surahs ? JSON.parse(surahs)[0].data[Number(surah_no) - 1] : {});
    const numSections = Math.floor(surahData.numberOfAyahs / 50) + (surahData.numberOfAyahs % 50 >= 20 ? 1 : 0);

    useEffect(() => {
        const getSurahInfo = async () => {
            try {
                const englishSurahRes = await axios.get(`https://raw.githubusercontent.com/risan/quran-json/refs/heads/main/data/editions/en.json`);
                
                if(ayahs) {
                    const verses:string[] = ayahs.split("-");
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

    interface Section {
        section_no: number,
        verses: string, // etc. in the form: 1-55
        url: string
    }

    // Algorithm that will handle breaking down a surah into chunks
    async function makeSections() {
        let sectionCounter = 0;
        let currentVerse = 1;
        const numSections = Math.floor(surahData.numberOfAyahs / 50) + (surahData.numberOfAyahs % 50 >= 20 ? 1 : 0);
        let endingVerse = 50;
        const englishSurahRes = await axios.get(`https://raw.githubusercontent.com/risan/quran-json/refs/heads/main/data/editions/en.json`);
        const numVerses = surahData.numberOfAyahs;

        // interface Chunk {
        //     section_no: number,
        //     verses: [{
        //         verse_no: number,
        //         verse: string
        //     }]
        // }

        const sections:Section[] = [];
        while (sectionCounter < numSections) {
            sections.push({
                section_no: sectionCounter + 1,
                verses: `${currentVerse}-${Math.min(endingVerse, numVerses)}`,
                url: ""
            });

            currentVerse += 50;
            endingVerse += 50;
            sectionCounter++;
        }

        console.log(sections);

        // const chunks: Chunk[] = [];
        // while(sectionCounter < numSections) {
        //     const chunk:Verse = englishSurahRes.data[Number(surah_no)].slice(currentVerse, endingVerse);
        //     chunks.push({
        //         section_no: sectionCounter + 1,
        //         verses: chunk.map((verse:string, index:number) => ({
        //             verse_no: currentVerse + (index + 1),
        //             verse: verse
        //         }))
        //     })
        //     sectionCounter++;
            // currentVerse += 50;
            // endingVerse += 50;
        // }
    }

    makeSections();

    return { englishSurahData };
}