import axios from "axios";
import { UserData, UserHandlers } from "../interfaces";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useUsers():UserHandlers {
    const [allUserData, setAllUserData] = useState<UserData[]>([]);
    const [searchParams] = useSearchParams();
    const [queryPage] = useState(Number(searchParams.get("page")) || 1);
    const [maxPages, setMaxPages] = useState(1);
    const [numUsers, setNumUsers] = useState(0);
    const [filterType, setFilterType] = useState(searchParams.get("filter") || "default");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function getAllUsers() {
            axios.get(`http://localhost:4000/api/user/all-users?page=${queryPage}&filter=${filterType}`, {
                withCredentials: true
            }).then(response => {
                setAllUserData(response.data.users);
                setMaxPages(response.data.pageCount);
                setNumUsers(response.data.numUsers);
                setLoading(false);
            }).catch(error => {
                console.log(error);
                setLoading(false);
            });
        }
    
        getAllUsers();
    }, []);

    // TODO - need to detect when the /users route has no search params (i.e. when you click on the link to the users page after having a search param in the URL)

    function handleNextPage() {
        const page = (Number(searchParams.get("page")) || 1) + 1;
        window.location.href = `/users?page=${page}`;
    }

    function handlePreviousPage() {
        const page = ((Number(searchParams.get("page")) || 1) - 1) <= 0 ? 1 : (Number(searchParams.get("page")) || 1) - 1;
        window.location.href = `/users?page=${page}`;
    }
    
    function filterWPM() {
        setLoading(true);

        if (numUsers < 10) {
            window.location.href = `/users?filter=wpm`;
        }
        else {
            window.location.href = `/users?page=${queryPage}&filter=wpm`;        
        }

        setFilterType("wpm");
    }

    function filterAccuracy() {
        setLoading(true);

        if (numUsers < 10) {
            window.location.href = `/users?filter=accuracy`;
        }
        else {
            window.location.href = `/users?page=${queryPage}&filter=accuracy`;
        }

        setFilterType("accuracy");
    }

    function filterSurahsPracticed() {
        setLoading(true);

        if (numUsers < 10) {
            window.location.href = `/users?filter=surahs-practiced`;
        }
        else {
            window.location.href = `/users?page=${queryPage}&filter=surahs-practiced`;
        }

        setFilterType("surahs-practiced");
    }

    function filterDateJoined() {
        setLoading(true);

        if (numUsers < 10) {
            window.location.href = `/users?filter=date-joined`;
        }
        else {
            window.location.href = `/users?page=${queryPage}&filter=date-joined`;
        }

        setFilterType("date-joined");
    }
    

    return { allUserData, handleNextPage, handlePreviousPage, queryPage, maxPages, numUsers, filterWPM, filterAccuracy, filterSurahsPracticed, filterDateJoined, loading };
}