import axios from "axios";
import { UserData, UserHandlers } from "../interfaces";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useUsers():UserHandlers {
    const [allUserData, setAllUserData] = useState<UserData[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [queryPage, setQueryPage] = useState(Number(searchParams.get("page")) || 1);
    const [maxPages, setMaxPages] = useState(1);
    const [numUsers, setNumUsers] = useState(0);

    useEffect(() => {
        async function getAllUsers() {
            axios.get(`http://localhost:4000/api/user/all-users?page=${queryPage}`, {
                withCredentials: true
            }).then(response => {
                setAllUserData(response.data.users);
                setMaxPages(response.data.pageCount);
                setNumUsers(response.data.numUsers);
            }).catch(error => {
                console.log(error);
            });
        }
    
        getAllUsers();
    }, []);

    function handleNextPage() {
        const page = (Number(searchParams.get("page")) || 1) + 1;
        window.location.href = `/users?page=${page}`;
    }

    function handlePreviousPage() {
        const page = ((Number(searchParams.get("page")) || 1) - 1) <= 0 ? 1 : (Number(searchParams.get("page")) || 1) - 1;
        window.location.href = `/users?page=${page}`;
    }
    
    function filterWPM() {
        if (numUsers < 10) {
            window.location.href = `/users?filter=wpm`;
        }
        else {
            window.location.href = `/users?page=${queryPage}&filter=wpm`;        
        }
    }

    function filterAccuracy() {
        if (numUsers < 10) {
            window.location.href = `/users?filter=accuracy`;
        }
        else {
            window.location.href = `/users?page=${queryPage}&filter=accuracy`;
        }
    }

    function filterSurahsPracticed() {
        if (numUsers < 10) {
            window.location.href = `/users?filter=surahs-practiced`;
        }
        else {
            window.location.href = `/users?page=${queryPage}&filter=surahs-practiced`;
        }
    }

    function filterDateJoined() {
        if (numUsers < 10) {
            window.location.href = `/users?filter=date-joined`;
        }
        else {
            window.location.href = `/users?page=${queryPage}&filter=date-joined`;
        }
    }

    return { allUserData, handleNextPage, handlePreviousPage, queryPage, maxPages, numUsers, filterWPM, filterAccuracy, filterSurahsPracticed, filterDateJoined };
}