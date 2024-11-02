import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
export default function Account() {
	type Surah = {
		number: number;
		name: string;
		englishName: string;
		englishNameTranslation: string;
		numberOfAyahs: number;
		revelationType: string;
	};

	type SurahResponse = {
		data: Surah[];
	};

	// TODO - will need to implement logic disabling the cursor from appearing on hover and allowing the user to redirect if they click on the surah buttons if they're on somebody else's profile.

	// TODO - if you're on your own profile, instead of it saying "surahs to practice", change it to "surahs [username] is practicing"

	// TODO - see about possibly implementing an "estimated reading time/typing time" indicator for each surah also

	// TODO - disable onclick if the user is hovering over another user's pfp on another person's account

	// TODO - hide the report button if the user is on their own profile

	const [hasProgress, setHasProgress] = useState(false);
	const [surahs, setSurahs] = useState<Surah[]>([]);
	const { user_id } = useParams();
	const queryClient = useQueryClient();
	const [loading, setIsLoading] = useState(true);
	const [surahToSearch, setSurahToSearch] = useState("");
	const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>(surahs);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);

	const { isLoading } = useQuery({
		queryKey: ["surahs"],
		queryFn: async () => {
			const response = await axios.get("https://api.alquran.cloud/v1/surah");
			return response.data;
		}
	});

	function getCachedSurahs(): Surah[] {
		const cachedData: SurahResponse | undefined = queryClient.getQueryData([
			"surahs"
		]);

		if (cachedData) {
			const { data } = cachedData;
			return data;
		}

		return [];
	}

	useEffect(() => {
		if (user_id) {
			axios
				.get(`http://localhost:4000/api/user/${user_id}/progress`, {
					withCredentials: true
				})
				.then(response => {
					if (response.data !== "No progress found") {
						// setHasProgress(true);
					} else {
						const surahs: Surah[] = getCachedSurahs();
						if (isLoading) {
							setIsLoading(true);
						} else {
							if (surahs.length > 0) {
								setSurahs(surahs);
							}
						}
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	}, [isLoading]);

	const filtered_surahs = useMemo(() => {
		if (isLoading || surahs.length === 0) return surahs;
		return surahs.filter((surah: Surah) => {
			return (
				surah.englishName.toLowerCase().includes(surahToSearch.toLowerCase()) ||
				surah.englishNameTranslation
					.toLowerCase()
					.includes(surahToSearch.toLowerCase()) ||
				surah.number === Number(surahToSearch)
			);
		});
	}, [surahs, surahToSearch, isLoading]);

	useEffect(() => {
		if (surahToSearch) {
			setFilteredSurahs(filtered_surahs);
		} else {
			const cachedSurahs: Surah[] = getCachedSurahs();
			if (cachedSurahs.length > 0) {
				setFilteredSurahs(cachedSurahs);
			} else {
				setFilteredSurahs(surahs); // fallback to original surahs if cache is empty
			}
		}
	}, [surahToSearch, surahs]);

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
						className="border-2 border-black lg:w-40 lg:h-40 w-32 h-32 rounded-md flex-shrink-0 hover:cursor-pointer"
						onClick={uploadPfp}
					>
						<input
							type="file"
							ref={fileInputRef}
							className="hidden"
							accept="image/png, image/gif, image/jpeg"
							onChange={handleImageChange}
						/>
						<img
							src="https://pbs.twimg.com/media/FegInEPXkAAS1PE.png"
							alt="User pfp"
							className="object-cover w-full h-full"
							ref={imageRef}
						/>
					</div>
					<div className="border-2 border-black w-full p-2 ml-5">
						<div>
							<h1 className="font-semibold text-xl">Hairum Qureshi</h1>
						</div>
						<div>Test X</div>
						<div>
							<button onClick={reportAccount}>
								Report Inappropriate Profile Picture
							</button>
						</div>
					</div>
				</div>
				<div className="bg-slate-300 h-full p-2 w-full lg:flex">
					<div className="bg-gray-400 p-2 h-full w-full">
						<h1>Left</h1>
					</div>
					<div className="bg-gray-200 p-2 h-full w-full">
						<div className="w-full h-full p-1 overflow-y-auto">
							<h1 className="text-center text-xl">Surahs To Practice:</h1>
							<input
								type="text"
								placeholder="Search Surah or Enter Chapter Number"
								className="my-3 p-2 w-full rounded-md outline-none"
								onInput={event =>
									setSurahToSearch((event.target as HTMLInputElement).value)
								}
							/>
							{isLoading ? (
								<h1 className="font-semibold text-center text-lg mt-10">
									Loading Surah Data and Progress...
								</h1>
							) : filteredSurahs.length > 0 ? (
								filteredSurahs.map((surah: Surah) => {
									return (
										<div className="w-full p-2 hover:cursor-pointer bg-white border-2 border-blue-500 rounded-md my-2">
											<Link to = {`/practice/surah/${surah.number}`}>
											<div className="flex items-center" key={surah.number}>
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
											
											</Link>
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
				</div>
			</div>
		</div>
	);
}
