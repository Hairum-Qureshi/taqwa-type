import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function UserInfoContainer() {
  return (
    <Link to = "/user/123/account">
        <div className="border-2 border-black mt-5 rounded-md p-1 flex items-center relative bg-gray-100 hover:bg-gray-200 active:bg-gray-300">
            <div className="w-20 h-20 rounded-md flex-shrink-0">
                <img 
                    src="https://i.pinimg.com/originals/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg" 
                    alt="User profile picture" 
                    className="w-full h-full rounded-md border-2 border-black object-cover" 
                />
            </div>
            <div className="w-full ml-2">
                <p className="text-sm"><b>John Doe</b></p>
                <p className="text-sm">Surahs Practiced: 10/114</p>
                <p className="text-sm">Average WPM: 10</p>
                <p className="text-sm">Overall Accuracy: 10%</p>
            </div>
            <div className = "w-8 h-8 flex justify-center items-center absolute top-0 right-0 bg-red-600 rounded-tr-sm text-white active:bg-red-700 hover:cursor-pointer" title = "Report this profile">
                <FontAwesomeIcon icon={faFlag} />
            </div>
        </div>
    </Link>
  )
}
