import useUsers from "../../hooks/useUsers";
import { UserData } from "../../interfaces";
import UserInfoContainer from "./UserInfoContainer";

// TODO - make sure to utilize e.preventPropagation for the flag button

export default function Users() {
    const { allUserData } = useUsers();

    return (
        <div className = "lg:w-1/2 w-full m-auto mt-5 p-3">
            <h1 className = "text-2xl font-semibold mb-3">All Users</h1>
            <input type="text" placeholder = "Search user by name" className = "border border-black rounded-md w-full p-1 outline-none px-3" />
            <div className = "mt-2">
                <h3>Sort By:</h3>
                <div className="flex text-sm">
                    <div className="p-1 border border-black mr-2 rounded-md flex-1 text-center hover:cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-300">
                        Words/Min (WPM)
                    </div>
                    <div className="p-1 border border-black mr-2 rounded-md flex-1 text-center hover:cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-300">
                        Accuracy
                    </div>
                    <div className="p-1 border border-black mr-2 rounded-md flex-1 text-center hover:cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-300">
                        Surahs Practiced
                    </div>
                    <div className="p-1 border border-black rounded-md flex-1 text-center hover:cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-300">
                        Date Joined
                    </div>
                </div>
            </div>
            {allUserData?.map((user:UserData) => {
                return <UserInfoContainer user_id={user._id} full_name = {`${user.first_name} ${user.last_name}`} wpm = {user.wordsPerMinute} surahsPracticed = {user.totalSurahsCompleted} accuracy = {user.accuracy} pfp = {user.pfp} />
            })}
        </div>
    )
}

