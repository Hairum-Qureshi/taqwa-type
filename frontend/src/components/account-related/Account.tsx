import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { getUserInfo } from "../../features/authentication/authSlice";
import axios from "axios";
import { UserData } from "../../interfaces";
import useAccount from "../../hooks/useAccount";
import SurahProgressTracker from "./SurahProgressTracker";
// import { logout } from "../features/authentication/authSlice";

export default function Account() {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const [userData, setUserData] = useState<UserData | null>(null);
	const { user_id } = useParams();

	// const user_data = useSelector((state:RootState) => state.auth.user);

    const { user } = useSelector((state:RootState) => state.auth); 
	const { getAccountDataByID } = useAccount();

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getUserInfo());
	}, [dispatch]);


	useEffect(() => {
		async function getData() {
			if(user_id && user_id !== user?._id) {
				const userData:UserData | null = await getAccountDataByID(user_id);
				setUserData(userData);
			}
			else {
				setUserData(user);	
				console.log('x', user);
			}
		}
		getData();
	}, [user, user_id]);

	// TODO - see about possibly implementing an "estimated reading time/typing time" indicator for each surah also

	function uploadPfp() {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	}

	function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.files && imageRef.current) {
			const imageFile: File = event.target.files[0];
			const formData = new FormData();
			formData.append("profile_picture", imageFile);

			axios
				.post("http://localhost:4000/api/user/upload/pfp", formData, {
					withCredentials: true
				})
				.then(response => {
					console.log(response);
					if (imageRef.current && event.target.files) {
						imageRef.current.src = window.URL.createObjectURL(
							event.target.files[0]
						);
					}
				})
				.catch(error => console.log(error));
		}
	}

	function reportAccount() {
		axios
			.post("http://localhost:4000/api/user/report", {
				user_id,
				withCredentials: true
			})
			.then(response => {
				alert(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	}

	return (
		<div className="h-screen lg:mx-20">
			<div className="w-full h-full bg-gray-200">
				<div className="flex-grow bg-slate-300 p-5 h-1/4 flex items-center justify-left">
					<div
						className={`border-2 border-black lg:w-40 lg:h-40 w-32 h-32 rounded-md flex-shrink-0 ${user?._id === userData?._id ? "hover:cursor-pointer" : ""}`}
						onClick={user?._id === userData?._id ? uploadPfp : undefined }
					>
						<input
							type="file"
							ref={fileInputRef}
							className="hidden"
							accept="image/png, image/gif, image/jpeg"
							onChange={user?._id === userData?._id ? handleImageChange : undefined}
						/>
						<img
							src={userData?.pfp || "https://pbs.twimg.com/media/FegInEPXkAAS1PE.png"}
							alt="User pfp"
							referrerPolicy="no-referrer"
							className="object-cover w-full h-full"
							ref={imageRef}
						/>
					</div>
					<div className="border-2 border-black w-full p-2 ml-5">
						<div>
							<h1 className="font-semibold text-xl">{userData?._id === user_id ? `${userData?.first_name} ${userData?.last_name}` : "Loading..."}</h1>
						</div>
						<div>Test X</div>
						{user?._id !== userData?._id && 
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
