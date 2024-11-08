import axios from "axios";
import { UserData } from "../interfaces";

interface AccountHandlers {
    getAccountDataByID: (user_id:string) => Promise<UserData | null>;
}   

export default function useAccount():AccountHandlers {

    async function getAccountDataByID(user_id:string):Promise<UserData | null> {
        let userData:UserData | null = null;

        await axios.get(`http://localhost:4000/api/user/${user_id}`, {
            withCredentials: true
        }).then(response => {
            userData = response.data;
        }).catch(error => {
            console.log(error);
            return null;
        });
           
        return userData;
    }

    return { getAccountDataByID };
}