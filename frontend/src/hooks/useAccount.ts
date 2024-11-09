import axios from "axios";
import { AccountHandlers, Surah, SurahResponse, UserData } from "../interfaces";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../features/authentication/authSlice";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";

export default function useAccount(): AccountHandlers {
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>(surahs);
    const [surahToSearch, setSurahToSearch] = useState("");
    const [isProgressLoading, setIsProgressLoading] = useState(false);
    const [userData, setUserData] = useState<UserData | null>();
    const queryClient = useQueryClient();
    const { user_id } = useParams();

    const { user } = useSelector((state:RootState) => state.auth); 

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getUserInfo());
	}, [dispatch]);

    async function getAccountDataByID() {
        try {
            const response = await axios.get(`http://localhost:4000/api/user/${user_id}`, {
                withCredentials: true
            });
            setUserData(response.data);
        } catch (error) {
            console.log(error);
            setUserData(null); 
        }
    }

    useEffect(() => {
        // When the user ID in the profile URL changes, it will refetch the updated user profile data and render it on the page (so you don't have to refetch the page to see the changes)
        async function refetchUserData() {
            if (user_id) {
                getAccountDataByID();       
            }
        }
        refetchUserData();
    }, [user_id]);

    const { isLoading: isLoadingSurahs } = useQuery({
        queryKey: ["surahs"],
        queryFn: async () => {
            const response = await axios.get("https://api.alquran.cloud/v1/surah");
            return response.data;
        },
    });

    function searchSurah(surah: string) {
        setSurahToSearch(surah);
    }

    const filtered_surahs: Surah[] = useMemo(() => {
        if (isLoadingSurahs || surahs.length === 0) return surahs;
        return surahs.filter((surah: Surah) => {
            return (
                surah.englishName.toLowerCase().includes(surahToSearch.toLowerCase()) ||
                surah.englishNameTranslation.toLowerCase().includes(surahToSearch.toLowerCase()) ||
                surah.number === Number(surahToSearch)
            );
        });
    }, [surahs, surahToSearch, isLoadingSurahs]);

    function getCachedSurahs(): Surah[] {
        const cachedData: SurahResponse | undefined = queryClient.getQueryData([
            "surahs"
        ]);
        return cachedData ? cachedData.data : [];
    }

    useEffect(() => {
        if (user_id) {
            setIsProgressLoading(true);
            axios
                .get(`http://localhost:4000/api/user/${user_id}/progress`, {
                    withCredentials: true
                })
                .then(() => {
                    const cachedSurahs: Surah[] = getCachedSurahs();
                     setSurahs(cachedSurahs);
                })
                .finally(() => {
                    setIsProgressLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setIsProgressLoading(false);
                });
        }
    }, [user_id]);

	function uploadPfp(fileInputRef:React.RefObject<HTMLInputElement>) {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	}

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>, imageRef:React.RefObject<HTMLImageElement | null>) {
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

    useEffect(() => {
        if (surahToSearch) {
            setFilteredSurahs(filtered_surahs);
        } else {
            const cachedSurahs: Surah[] = getCachedSurahs();
            setFilteredSurahs(cachedSurahs.length > 0 ? cachedSurahs : surahs);
        }
    }, [surahToSearch, surahs]);

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

    return {
        getAccountDataByID,
        searchSurah,
        filteredSurahs,
        isLoadingSurahs,
        isProgressLoading,
        handleImageChange,
        uploadPfp,
        reportAccount,
        user,
        userData
    };
}
