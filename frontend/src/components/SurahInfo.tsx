import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SurahInfo as SurahInfoI, Verse } from "../interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import NotFound from "./NotFound";
import LoadingSpinner from "./LoadingSpinner";

export default function SurahInfo() {
    const { surah_no } = useParams();
    const [chapterInfo, setChapterInfo] = useState<SurahInfoI>();
    const [englishSurah, setEnglishSurah] = useState<Verse[]>([]);

    // TODO - make the verse links in the info section work
    // TODO - see if you can have it so that the div on the right is the same height as the div on the left and that the content in the right div will utilize a scrollbar if the content on the right exceeds the left div's content
    // TODO - consider seeing if you can add the surah's name too

    useEffect(() => {
        const getSurahInfo = async () => {
            try {
                const response = await axios.get(`https://api.quran.com/api/v4/chapters/${surah_no}/info`);
                const englishSurahRes = await axios.get(`https://raw.githubusercontent.com/risan/quran-json/refs/heads/main/data/editions/en.json`);
                
                // Correctly access the chapter info data
                setChapterInfo(response.data.chapter_info);
                
                // Access the English translation by index
                setEnglishSurah(englishSurahRes.data[Number(surah_no)]);
            } catch (error) {
                console.error(error);
            }
        };
    
        getSurahInfo();
    }, [surah_no]);    

    return (
        Number(surah_no) > 114 ? <NotFound /> : !chapterInfo || englishSurah.length === 0 ? <LoadingSpinner /> : 
        <div className = "lg:flex m-5 border border-slate-300 rounded-md">
            {chapterInfo && 
            <div
                className="prose bg-gray-100 lg:prose-md prose-h2:mb-2 max-w-none lg:w-1/2 p-10" 
                dangerouslySetInnerHTML={{ __html: chapterInfo?.text }}
            />}
            <div className = "lg:w-1/2 p-5 relative">
                {englishSurah[Number(surah_no)]?.chapter !== 1 && <div className = "w-full text-2xl m-2 text-center p-2 font-amiri font-semibold">
                    ﷽
                    <p className = "mt-4 font-normal text-xl">In the name of Allah, the Most Gracious, the Most Merciful</p>
                </div>}
                {englishSurah.map((verse:Verse, index:number) => {
                    return <p key = {index} className = "text-lg mb-5">({index + 1}) {verse.text}.</p>
                })}

                {/* <div className = "border-2 bg-gray-100 border-slate-200 rounded-full p-5 w-5 h-5 flex justify-center items-center cursor-pointer right-0 absolute mr-3 hover:bg-gray-200 active:bg-gray-300 select-none">
                    <FontAwesomeIcon icon={faChevronUp} />                
                </div> */}
            </div>
        </div>
    );    
}
