import { Verse } from "../../interfaces";
import LoadingSpinner from "../LoadingSpinner";
import useSurah from "../../hooks/useSurah";

export default function Reference() {
    const { englishSurahData } = useSurah();
    
    return (
        englishSurahData.length === 0 ? <LoadingSpinner /> : 
        <div className="w-3/4 my-10 m-auto p-4 border border-slate-300 rounded-md bg-gray-100">
            {englishSurahData.length > 0 ? (
                englishSurahData.length === 1 ? (
                <p className="text-lg mb-5">
                    ({englishSurahData[0].verse}) {englishSurahData[0].text}.
                </p>
            ) : (
                englishSurahData.map((verse: Verse, index: number) => (
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
