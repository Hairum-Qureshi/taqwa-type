import { Link, useParams } from "react-router-dom";
import { Surah } from "../../interfaces";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import useSurah from "../../hooks/useSurah";

export default function TypingPractice() {
    const { surah_no } = useParams();
    const surahs = localStorage.getItem("surahs");
    const [surahData, setSurahData] = useState<Surah>(surahs ? JSON.parse(surahs)[0].data[Number(surah_no) - 1] : {});
    
    const { sections } = useSurah();
    console.log('x', sections);

    // TODO - if you remove "surahs" from localStorage, you'll need to refresh the page again in order to get the updated data
    
    useEffect(() => {
        const cachedData = localStorage.getItem('surahs');

        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            setSurahData(parsedData[0]?.data[Number(surah_no) - 1] || {});
        } else {
            if (surahs) {
                const data = JSON.parse(surahs)[0].data[Number(surah_no) - 1];
                setSurahData(data);
            }
        }
    }, [surah_no, surahs]);

    const numSections = Math.ceil(surahData.numberOfAyahs / 50);

    return (
        <>
            {!surahData ? <LoadingSpinner /> :
                <Link to = {`/practice/surah/${surah_no}/info`}>
                    <div className = "m-5 font-semibold text-slate-500 p-2 border border-slate-500 bg-gray-100 rounded-md hover:bg-slate-200 active:bg-slate-300 active:text-slate-600">Click here to read and learn about Surah {surahData.englishName}</div>
                </Link>
            }
            {surahData.numberOfAyahs >= 50 && numSections > 1 &&
            <div className="m-5 border border-sky-400 bg-sky-100 p-2 rounded-md text-sky-700 font-semibold">
                <p>
                    This chapter has {surahData.numberOfAyahs} verses and is pretty lengthy so it will be split into&nbsp;{numSections} sections. 
                    These sections are not broken up by difficulty but solely for the sake of ease. It's best to complete them in order, 
                    but feel free to visit a section you feel you need more practice on.
                </p>
            </div>
            }
            <div className = "w-3/4 m-auto text-sm">
                <div className = "border border-slate-400 rounded-md mb-2 w-full p-3 bg-slate-100 hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300">
                    <div className = "flex">
                        <p><b>Section 1:</b> Verses 1-50</p>
                        <p className = "ml-auto">WPM: N/A</p>
                    </div>
                </div>
                <div className = "border border-slate-400 rounded-md mb-2 w-full p-3 bg-slate-100 hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300">
                    <div className = "flex">
                        <p><b>Section 2:</b> Verses 51-101</p>
                        <p className = "ml-auto">WPM: N/A</p>
                    </div>
                </div>
                <div className = "border border-slate-400 rounded-md mb-2 w-full p-3 bg-slate-100 hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300">
                    <div className = "flex">
                        <p><b>Section 3:</b> Verses 102-152</p>
                        <p className = "ml-auto">WPM: N/A</p>
                    </div>
                </div>
                <div className = "border border-slate-400 rounded-md mb-2 w-full p-3 bg-slate-100 hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300">
                    <div className = "flex">
                        <p><b>Section 4:</b> Verses 153-202</p>
                        <p className = "ml-auto">WPM: N/A</p>
                    </div>
                </div>
                <div className = "border border-slate-400 rounded-md mb-2 w-full p-3 bg-slate-100 hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300">
                    <div className = "flex">
                        <p><b>Section 5:</b> Verses 203-252</p>
                        <p className = "ml-auto">WPM: N/A</p>
                    </div>
                </div>
                <div className = "border border-slate-400 rounded-md mb-2 w-full p-3 bg-slate-100 hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300">
                    <div className = "flex">
                        <p><b>Section 6:</b> Verses 253-286</p>
                        <p className = "ml-auto">WPM: N/A</p>
                    </div>
                </div>
            </div>
        </>
    );
}
