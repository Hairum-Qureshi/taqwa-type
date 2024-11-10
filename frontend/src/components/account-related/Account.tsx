import { useEffect, useRef, useState } from "react";
import { UserData } from "../../interfaces";
import useAccount from "../../hooks/useAccount";
import SurahProgressTracker from "./SurahProgressTracker";
import LoadingSpinner from "../LoadingSpinner";
import NotFound from "../NotFound";
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
						className={`border-2 border-black lg:w-40 lg:h-40 w-32 h-32 rounded-md flex-shrink-0 ${user._id === userData._id ? "hover:cursor-pointer" : ""}`}
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
							className="object-cover w-full h-full"
							ref={imageRef}
						/>
					</div>
					<div className="border-2 border-black w-full p-2 ml-5">
						<div>
							<h1 className="font-semibold text-xl">{`${userData.first_name} ${userData.last_name}`}</h1>
						</div>
						<div>Test X</div>
						{user._id !== userData._id && 
						<div>
							<button onClick={reportAccount} className = "border-2 border-black rounded-md bg-red-600 text-white px-2 py-1">
								Report Inappropriate Profile Picture
							</button>
						</div>}
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
