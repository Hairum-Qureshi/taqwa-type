import { useEffect, useRef, useState } from "react";
import { UserData } from "../../interfaces";
import useAccount from "../../hooks/useAccount";
import SurahProgressTracker from "./SurahProgressTracker";
import LoadingSpinner from "../LoadingSpinner";
import NotFound from "../NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
// import { logout } from "../features/authentication/authSlice";

export default function Account() {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const [userData, setUserData] = useState<UserData | null>(null);

	// TODO - see about possibly implementing an "estimated reading time/typing time" indicator for each surah also
	// TODO - add a loading animation prior to when the user views the profile
	// TODO - need to add a way to prevent users from spanning the "report profile picture" button
	// TODO - fix minor problem where user isn't getting alerted when they press the "report profile picture" button

	const { handleImageChange, uploadPfp, reportAccount, user, userData: uData, errorMessage } = useAccount();

	useEffect(() => {
		setUserData(uData);
	}, [user, uData]);  
	
	return (
		errorMessage !== "" ? <NotFound /> : !user || !userData ? <LoadingSpinner /> : 
		<div className="h-screen lg:mx-20">
			<div className="w-full h-full bg-gray-200">
				<div className="flex-grow bg-slate-300 p-5 h-1/4 flex items-center justify-left">
					<div
						className={`border-2 border-black lg:w-40 lg:h-40 w-32 h-32 rounded-md flex-shrink-0 relative ${user._id === userData._id ? "hover:cursor-pointer" : ""}`}
						onClick={user._id === userData._id ? () => uploadPfp(fileInputRef) : undefined }
					>
						<label htmlFor="file-upload" className = "hidden">File upload</label>
						<input
							type="file"
							ref={fileInputRef}
							className="hidden"
							accept="image/png, image/gif, image/jpeg"
							id = "file-upload"
							onChange={user._id === userData._id ? (event) => handleImageChange(event, imageRef) : undefined}
							/>
						<img
							src={userData.pfp || "https://pbs.twimg.com/media/FegInEPXkAAS1PE.png"}
							alt="User pfp"
							referrerPolicy="no-referrer"
							className="object-cover w-full h-full rounded-sm"
							ref={imageRef}
						/>
						{user._id !== userData._id && <div className = "w-8 h-8 flex justify-center p-2 absolute top-0 right-0 bg-red-600 rounded-tr-sm opacity-30 hover:opacity-60 text-white active:opacity-85 hover:cursor-pointer" title = "Report this profile picture" onClick = {e => { e.stopPropagation(); reportAccount() }}>
							<FontAwesomeIcon icon={faFlag} />
						</div>}
					</div>
					<div className="border-2 border-black w-full p-2 ml-5">
						<div>
							<h1 className="font-semibold text-xl">{`${userData.first_name} ${userData.last_name}`}</h1>
						</div>
						<div className = "flex space-x-5">
							<div className = "lg:text-2xl text-lg font-semibold flex-col text-center">{userData ? Math.round(userData.wordsPerMinute) : Math.round(user.wordsPerMinute)}<div className = "text-sm text-gray-500">Avg WPM</div></div>
							<div className = "lg:text-2xl text-lg font-semibold flex-col text-center">{userData ? userData.streak : user.streak} <div className = "text-sm text-gray-500">Day{Number(userData ? userData.streak : user.streak) !== 1 && 's'} Streak</div></div>
							<div className = "lg:text-2xl text-lg font-semibold flex-col text-center">{userData ? Math.round(userData.accuracy * 100) || 0 : Math.round(user.accuracy * 100) || 0}%<div className = "text-sm text-gray-500">Accuracy</div></div>
						</div>
					</div>
				</div>
				<div className="bg-slate-300 h-full p-2 w-full lg:flex">
					<div className="bg-gray-400 p-2 h-full w-full">
						<h1>Left</h1>
					</div>
					<div className="bg-gray-200 p-2 h-full w-full">
						<SurahProgressTracker user={user} userData={userData} />
					</div>
				</div>
			</div>
		</div>
	);
}