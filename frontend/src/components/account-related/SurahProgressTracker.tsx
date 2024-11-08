import { Link } from "react-router-dom";
import { SPTChildren, Surah } from "../../interfaces";
import useAccount from "../../hooks/useAccount";

export default function SurahProgressTracker({user, userData}:SPTChildren) {
    const { searchSurah, filteredSurahs, isProgressLoading } = useAccount();

    return (
        <div className="bg-gray-200 p-2 h-full w-full">
            <div className="w-full h-full p-1 overflow-y-auto">
                <h1 className="text-center text-xl">{user?._id === userData?._id ? "Your Progress Per Surah:" : `${userData?.first_name}'s Progress Per Surah:`}</h1>
                <input
                    type="text"
                    placeholder="Search Surah or Enter Chapter Number"
                    className="my-3 p-2 w-full rounded-md outline-none"
                    onInput={event =>
                        // setSurahToSearch((event.target as HTMLInputElement).value)
                        searchSurah((event.target as HTMLInputElement).value)
                    }
                />
                {isProgressLoading ? (
                    <h1 className="font-semibold text-center text-lg mt-10">
                        Loading Surah Data and Progress...
                    </h1>
                ) : filteredSurahs.length > 0 ? (
                    filteredSurahs.map((surah: Surah) => {
                        return (
                            <div className={`w-full p-2 ${user?._id === userData?._id ? "hover:cursor-pointer" : ""} bg-white border-2 border-blue-500 rounded-md my-2`} key = {surah.number}>
                                {user?._id === userData?._id ? <Link to = {`/practice/surah/${surah.number}`}>
                                    <div className="flex items-center">
                                        <div className="flex items-center justify-center w-11 h-11 text-lg font-semibold text-white bg-sky-800 mr-3 rounded-md">
                                            {surah.number}
                                        </div>
                                        <div className="w-full">
                                            <h3>
                                                {surah.englishName} |&nbsp;
                                                {surah.englishNameTranslation}&nbsp;|&nbsp;
                                                <span>{surah.numberOfAyahs} verses</span>
                                            </h3>

                                            <div className="border border-green-400 rounded-sm bg-green-800 p-1">
                                                <p className="text-white text-xs">Progress: 0%</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link> : 
                                    <div className="flex items-center">
                                        <div className="flex items-center justify-center w-11 h-11 text-lg font-semibold text-white bg-sky-800 mr-3 rounded-md">
                                            {surah.number}
                                        </div>
                                        <div className="w-full">
                                            <h3>
                                                {surah.englishName} |&nbsp;
                                                {surah.englishNameTranslation}&nbsp;|&nbsp;
                                                <span>{surah.numberOfAyahs} verses</span>
                                            </h3>

                                            <div className="border border-green-400 rounded-sm bg-green-800 p-1">
                                                <p className="text-white text-xs">Progress: 0%</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        );
                    })
                ) : (
                    <h1 className="text-lg mt-10 font-semibold text-center">
                        Surah not found
                    </h1>
                )}
            </div> 
        </div> 
    )
}
