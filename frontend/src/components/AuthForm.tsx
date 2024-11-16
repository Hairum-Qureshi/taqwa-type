import { useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import SignUp from "./auth-related/SignUp";
import SignIn from "./auth-related/SignIn";

export default function AuthForm() {
	const [showSignUp, setShowSignUp] = useState(true);

	const { googleAuth } = useAuth();

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

	function update() {
		setShowSignUp(!showSignUp);
	}

	return (
		<div className="flex items-center justify-center flex-col mt-10">
			<form className="flex items-center justify-center flex-col w-10/12">
				<div className="mb-5 text-center">
					{showSignUp ? (
						<>
							<h2 className="text-3xl text-center text-white font-semibold">
								Sign Up to Taqwa Type
							</h2>
							<p className="text-green-500 mt-3">
								Kill two birds with one stone. Start today, it's free.
							</p>
							<p className="text-cyan-400 mt-2">
								Already have an account?&nbsp;
								<Link to="/" className="underline" onClick={update}>
									Sign in
								</Link>
							</p>
						</>
					) : (
						<>
							<h2 className="text-3xl text-center text-white font-semibold">
								Sign In to Taqwa Type
							</h2>
							<p className="text-green-500 mt-3">Welcome back to Taqwa Type!</p>
							<p className="text-cyan-400 mt-2">
								Don't have an account?&nbsp;
								<Link to="/" className="underline" onClick={update}>
									Create one
								</Link>
							</p>
						</>
					)}
				</div>
				{showSignUp ? (
					<SignUp />
				) : (
					<SignIn />
				)}
			</form>
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
		</div>
	);
}
