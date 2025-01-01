import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useAccount from "../../hooks/useAccount";
import { UserProps } from "../../interfaces";

export default function UserInfoContainer({ user_id, full_name, wpm, surahsPracticed, accuracy, pfp }:UserProps) {
    const { user:currentUserData } = useAccount();

    return (
        <Link to = {`/user/${user_id}/account`}>
            <div className="border-2 border-black mt-5 rounded-md p-1 flex items-center relative bg-gray-100 hover:bg-gray-200 active:bg-gray-300">
                <div className="w-20 h-20 rounded-md flex-shrink-0">
                    <img 
                        src={pfp} 
                        alt="User profile picture" 
                        className="w-full h-full rounded-md border-2 border-black object-cover" 
                    />
                </div>
                <div className="w-full ml-2">
                    <p className="text-sm"><b>{full_name}</b></p>
                    <p className="text-sm">Surahs Practiced: {surahsPracticed}/114</p>
                    <p className="text-sm">Average WPM: {Math.round(wpm)}</p>
                    <p className="text-sm">Overall Accuracy: {Math.round(accuracy * 100) || 0}%</p>
                </div>
               {user_id !== currentUserData?._id && <div className = "w-8 h-8 flex justify-center items-center absolute top-0 right-0 bg-red-400 rounded-tr-sm text-white hover:bg-red-500 active:bg-red-700 hover:cursor-pointer" title = "Report this profile" onClick = {e => { e.stopPropagation() }}>
                    <FontAwesomeIcon icon={faFlag} />
            </div>}
            </div>
        </Link>
    );
}
