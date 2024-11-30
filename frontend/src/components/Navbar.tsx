import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useAccount from "../hooks/useAccount";
import { faArrowRightFromBracket, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../features/authentication/authSlice";
import { useDispatch } from "react-redux";

export default function Navbar() {

	const { user } = useAccount();

	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout()); 
	};

	return (
		<div className="w-full h-auto text-white bg-slate-800 p-2 justify-center items-center flex">
			<Link to="/" className = "mr-auto">
				<h1 className="text-xl">Taqwa Type</h1>
			</Link>
			{user && <div className = "text-xl ml-auto hover:cursor-pointer flex">
				<Link to = "/users">
					<div className = "rounded-md p-0.5 w-10 text-center mr-2" title = "View all users">
						<FontAwesomeIcon icon={faUsers} />
					</div>
				</Link>
				<Link to={`/user/${user._id}/account`}>
					<div className = "rounded-md p-0.5 w-10 text-center mr-2" title = "Visit profile">
						<FontAwesomeIcon icon={faUser} />
					</div>
				</Link>
				<Link to = "/" onClick = {handleLogout}>
					<div className = "rounded-md p-0.5 w-10 text-center mr-1" title = "Logout">
						<FontAwesomeIcon icon={faArrowRightFromBracket} />
					</div>
				</Link>
			</div>}
		</div>
	);
}
