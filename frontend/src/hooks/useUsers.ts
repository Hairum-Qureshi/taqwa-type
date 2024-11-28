import axios from "axios";
import { UserData } from "../interfaces";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface UserHandlers {
    allUserData: UserData[]
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    queryPage: number;
}

export default function useUsers():UserHandlers {
    const [allUserData, setAllUserData] = useState<UserData[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [queryPage, setQueryPage] = useState(Number(searchParams.get("page")) || 1);

    // useEffect(() => {

    //     async function getAllUsers() {
    //         axios.get("http://localhost:4000/api/user/all-users", {
    //             withCredentials: true
    //         }).then(response => {
    //             setAllUserData(response.data);
    //         }).catch(error => {
    //             console.log(error);
    //         });
    //     }
    
    //     getAllUsers();

    // }, []);

    useEffect(() => {
        // searchParams.get("page") || 1
        async function getAllUsers() {
            axios.get(`http://localhost:4000/api/user/all-users?page=${queryPage}`, {
                withCredentials: true
            }).then(response => {
                setAllUserData(response.data);
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
    

    return { allUserData, handleNextPage, handlePreviousPage, queryPage };
}