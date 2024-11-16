import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Verification from "./Verification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

    const { signUp, googleAuth, showVerification } = useAuth();

    const login = useGoogleLogin({
		onSuccess: async response => {
			try {
				const res = await axios.get(
					"https://www.googleapis.com/oauth2/v3/userinfo",
					{
						headers: {
							Authorization: `Bearer ${response.access_token}`
						}
					}
				);
				const { email, family_name, given_name, name, picture } = res.data;
				googleAuth(email, given_name, family_name, name, picture);
			} catch (error) {
				console.log(error);
			}
		}
	});

    return (
    !showVerification ? <>
        <div className="flex flex-row w-full mb-5 items-center justify-center">
            <input
                type="text"
                placeholder="First Name"
                className="w-full mr-2 p-2 text-md outline-none rounded-sm"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Last Name"
                className="w-full ml-2 p-2 text-md outline-none rounded-sm"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
            />
        </div>
        <input
            type="email"
            placeholder="Email"
            className="w-full mb-5 mt-5 p-2 text-md outline-none rounded-sm"
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mt-5 text-md outline-none rounded-sm"
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
        <button
            className="bg-green-600 font-semibold text-white text-lg mt-10 py-2 p-2 w-full mb-10 rounded-sm"
            onClick={e => signUp(e, firstName, lastName, email, password)}
        >
            Sign Up
        </button>
        <div className="flex items-center justify-center">
				<span className="border-t border-gray-300 w-60"></span>
				<p className="text-white font-semibold mx-4">OR</p>
				<span className="border-t border-gray-300 w-60"></span>
			</div>
			<button
				onClick={login}
				className="mt-10 bg-sky-800 text-white border-2 border-sky-400 hover:bg-sky-700 hover:border-sky-300 active:bg-sky-500 active:border-sky-200 py-2 p-2 w-1/2 rounded-md flex items-center justify-left"
			>
				<span className="text-2xl mr-2">
					<FontAwesomeIcon icon={faGoogle} />
				</span>
				<span className="flex justify-center w-full text-lg">
					Sign in with Google
				</span>
			</button>
    </> : <Verification />
  )
}
