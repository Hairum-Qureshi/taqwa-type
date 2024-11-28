import useAccount from "../../hooks/useAccount";
import useUsers from "../../hooks/useUsers";
import { UserData } from "../../interfaces";
import NotFound from "../NotFound";
import UserInfoContainer from "./UserInfoContainer";

// TODO - make sure to utilize e.stopPropagation for the flag button
// TODO - implement a search functionality

export default function Users() {
    const { allUserData, handleNextPage, handlePreviousPage, queryPage, maxPages, numUsers, filterWPM, filterAccuracy, filterSurahsPracticed, filterDateJoined } = useUsers();
    const { user:currentUserData } = useAccount();
    return (
        !currentUserData ? <NotFound /> : 
        <div className = "lg:w-1/2 w-full m-auto mt-5 p-3 h-screen relative">
            <h1 className = "text-2xl font-semibold mb-3">All Users</h1>
            <input type="text" placeholder = "Search user by name" className = "border border-black rounded-md w-full p-1 outline-none px-3" />
            <div className = "mt-2">
                <h3>Sort By:</h3>
                <div className="flex text-sm">
                    <div className="p-1 border border-black mr-2 rounded-md flex-1 text-center hover:cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-300" onClick = {filterWPM}>
                        Words/Min (WPM)
                    </div>
                    <div className="p-1 border border-black mr-2 rounded-md flex-1 text-center hover:cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-300" onClick = {filterAccuracy}>
                        Accuracy
                    </div>
                    <div className="p-1 border border-black mr-2 rounded-md flex-1 text-center hover:cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-300" onClick = {filterSurahsPracticed}>
                        Surahs Practiced
                    </div>
                    <div className="p-1 border border-black rounded-md flex-1 text-center hover:cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-300" onClick = {filterDateJoined}>
                        Date Joined
                    </div>
                </div>
            </div>
            {allUserData.length === 0 ? 
                <div className = "mt-10 p-2">
                    <h1 className = "text-2xl font-semibold text-center">No users found</h1>
                </div> : allUserData?.map((user:UserData) => {
                    return <UserInfoContainer user_id={user._id} full_name = {`${user.first_name} ${user.last_name}`} wpm = {user.wordsPerMinute} surahsPracticed = {user.totalSurahsCompleted} accuracy = {user.accuracy} pfp = {user.pfp} />
            })}
            {numUsers > 10 && <div className="w-full my-20 absolute bottom-0 flex justify-around">
                <div className="flex space-x-4">
                    <button className="border border-slate-500 rounded-md p-1 w-32 disabled:bg-slate-800 bg-slate-500 disabled:hover:cursor-not-allowed text-white" onClick = {handlePreviousPage} disabled = {queryPage === 1}>Previous</button>
                    <button className="border border-slate-500 rounded-md p-1 w-32 disabled:bg-slate-800 bg-slate-500 disabled:hover:cursor-not-allowed text-white" onClick = {handleNextPage} disabled = {queryPage === maxPages}>Next</button>
                </div>
            </div>}
        </div>
    )
}

