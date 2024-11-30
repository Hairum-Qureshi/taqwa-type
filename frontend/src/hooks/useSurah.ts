import axios from "axios";
import { useEffect, useState } from "react";
import { Section, Surah, SurahTools, Verse } from "../interfaces";
import { useParams } from "react-router-dom";

export default function useSurah(): SurahTools {
    const [englishSurahData, setEnglishSurahData] = useState<Verse[]>([]);
    const { surah_no, ayahs, section_no } = useParams();
    const surahs = localStorage.getItem("surahs");
    const [surahData, setSurahData] = useState<Surah>(surahs ? JSON.parse(surahs)[0].data[Number(surah_no) - 1] : {});
    const [sections, setSections] = useState<Section[]>([]);

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
                else {
                    setEnglishSurahData(englishSurahRes.data[Number(surah_no)]);
                }

            } catch (error) {
                console.error(error);
            }
        };
    
        getSurahInfo();
    }, [surah_no]); 

    // Algorithm that will handle breaking down a surah into chunks
    async function makeSections() {
        let sectionCounter = 0;
        let currentVerse = 1;
        const addingFactor = 15;
        const numSections = Math.ceil(surahData.numberOfAyahs / addingFactor);
        let endingVerse = addingFactor;
        // const englishSurahRes = await axios.get(`https://raw.githubusercontent.com/risan/quran-json/refs/heads/main/data/editions/en.json`);
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

            if (endingVerse > numVerses) {
                endingVerse = endingVerse - (endingVerse - numVerses);
            }

            const verses = `${currentVerse === endingVerse ? endingVerse : `${currentVerse}-${endingVerse}`}`;
            sections.push({
                section_no: sectionCounter + 1,
                verses,
                url: `/practice/surah/${surah_no}/section/${sectionCounter + 1}/${verses}`
            });
        
            currentVerse += addingFactor;
            endingVerse += addingFactor;
            sectionCounter++;
        }

        setSections(sections);

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

    useEffect(() => {
        makeSections();
    }, [surah_no]);

    return { englishSurahData, sections };
}