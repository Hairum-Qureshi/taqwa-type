import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { useEffect } from "react";
import { getUserInfo } from "../features/authentication/authSlice";
import useAccount from "../hooks/useAccount";

export default function Navbar() {

	const { user } = useAccount();

	return (
		<div className="w-full h-auto text-white bg-slate-800 p-2 justify-center items-center flex">
			<Link to="/" className = "mr-auto">
				<h1 className="text-xl">Taqwa Type</h1>
			</Link>
			{user && <div className = "text-xl ml-auto mr-5 hover:cursor-pointer">
				<Link to={`/user/${user._id}/account`}>
					<div className = "border border-white rounded-md p-0.5 w-10 text-center bg-slate-700">
						<FontAwesomeIcon icon={faUser} />
					</div>
				</Link>
			</div>}
		</div>
	);
}
