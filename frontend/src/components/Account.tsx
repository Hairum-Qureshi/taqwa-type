import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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

	const [hasProgress, setHasProgress] = useState(false);
	const [surahs, setSurahs] = useState<Surah[]>([]);
	const { user_id } = useParams();
	const queryClient = useQueryClient();
	const [loading, setIsLoading] = useState(true);
	const [surahToSearch, setSurahToSearch] = useState("");
	const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>(surahs);

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
						setHasProgress(true);
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
					.includes(surahToSearch.toLowerCase())
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

	return (
		<div className="h-screen lg:mx-20">
			<div className="w-full h-full bg-gray-200">
				<div className="flex-grow bg-slate-300 p-5 h-1/4 flex items-center justify-left">
					<div className="border-2 border-black lg:w-40 lg:h-40 w-32 h-32 rounded-md flex-shrink-0">
						<img
							src="https://pbs.twimg.com/media/FegInEPXkAAS1PE.png"
							alt="User pfp"
							className="object-cover rounded-md"
						/>
					</div>
					<div className="border-2 border-black w-full p-2 ml-5">
						<div>
							<h1 className="font-semibold text-xl">Hairum Qureshi</h1>
						</div>
						<div>Test X</div>
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
								placeholder="Search Surah"
								className="my-3 p-2 w-full rounded-md outline-none"
								onInput={event => setSurahToSearch(event.target.value)}
							/>
							{isLoading ? (
								<h1 className="font-semibold text-center text-lg mt-10">
									Loading Surah Data and Progress...
								</h1>
							) : (
								filteredSurahs.map((surah: Surah) => {
									return (
										<div className="w-full p-2 hover:cursor-pointer bg-white border-2 border-blue-500 rounded-md my-2">
											<div className="flex items-center" key={surah.number}>
												<div className="flex items-center justify-center w-11 h-11 text-lg font-semibold text-white bg-sky-800 mr-3 rounded-md">
													{surah.number}
												</div>
												<div className="w-full">
													<h3>
														{surah.englishName} |&nbsp;
														{surah.englishNameTranslation}
													</h3>
													<div className="border border-green-400 rounded-sm bg-green-800 p-1">
														<p className="text-white text-xs">Progress: 0%</p>
													</div>
												</div>
											</div>
										</div>
									);
								})
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// export default function Account() {
// 	return (
// 		<div>
// 			<div className="w-full min-h-56 h-auto bg-slate-800">
// 				{/* <div className="flex items-center justify-center">
// 					<div className="border-2 border-white rounded-full w-40 h-40 mt-7">
// 						<img src="" alt="" />
// 					</div>
// 				</div> */}
// 				<section className="text-white body-font">
// 					<div className="container px-5 py-14 mx-auto">
// 						<h1 className="font-semibold text-3xl text-center mb-10">
// 							Your Best Stats
// 						</h1>
// 						<div className="flex flex-wrap -m-4 text-center">
// 							<div className="p-4 sm:w-1/4 w-1/2">
// 								<h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
// 									0 WPM
// 								</h2>
// 								<p className="leading-relaxed">Best Typing Speed</p>
// 							</div>
// 							<div className="p-4 sm:w-1/4 w-1/2">
// 								<h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
// 									1.8K
// 								</h2>
// 								<p className="leading-relaxed">Subscribes</p>
// 							</div>
// 							<div className="p-4 sm:w-1/4 w-1/2">
// 								<h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
// 									35
// 								</h2>
// 								<p className="leading-relaxed">Downloads</p>
// 							</div>
// 							<div className="p-4 sm:w-1/4 w-1/2">
// 								<h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
// 									4
// 								</h2>
// 								<p className="leading-relaxed">Products</p>
// 							</div>
// 						</div>
// 					</div>
// 				</section>
// 			</div>
// 			<div className="h-screen bg-gray-100 lg:flex">
// 				<div className="lg:w-1/3 bg-red-500 lg:h-full h-1/3"></div>
// 				<div className="w-full bg-blue-500 h-full"></div>
// 			</div>
// 		</div>
// 	);
// }
