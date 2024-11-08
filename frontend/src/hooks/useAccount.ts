import axios from "axios";
import { AccountHandlers, Surah, SurahResponse, UserData } from "../interfaces";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useAccount(): AccountHandlers {
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>(surahs);
    const [surahToSearch, setSurahToSearch] = useState("");
    const [isProgressLoading, setIsProgressLoading] = useState(false);
    const queryClient = useQueryClient();
    const { user_id } = useParams();

    async function getAccountDataByID(user_id: string): Promise<UserData | null> {
        let userData: UserData | null = null;

        await axios
            .get(`http://localhost:4000/api/user/${user_id}`, {
                withCredentials: true
            })
            .then(response => {
                userData = response.data;
            })
            .catch(error => {
                console.log(error);
                return null;
            });

        return userData;
    }

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

    useEffect(() => {
        if (surahToSearch) {
            setFilteredSurahs(filtered_surahs);
        } else {
            const cachedSurahs: Surah[] = getCachedSurahs();
            setFilteredSurahs(cachedSurahs.length > 0 ? cachedSurahs : surahs);
        }
    }, [surahToSearch, surahs]);

    return {
        getAccountDataByID,
        searchSurah,
        filteredSurahs,
        isLoadingSurahs,
        isProgressLoading
    };
}
