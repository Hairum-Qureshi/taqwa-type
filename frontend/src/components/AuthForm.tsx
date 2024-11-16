import { Link } from "react-router-dom";
import { useState } from "react";
import SignUp from "./auth-related/SignUp";
import SignIn from "./auth-related/SignIn";

export default function AuthForm() {
	const [showSignUp, setShowSignUp] = useState(true);

	function update() {
		setShowSignUp(!showSignUp);
	}

	return (
		<div className="flex items-center justify-center flex-col mt-10">
			<form className="flex items-center justify-center flex-col w-10/12" onSubmit={e => e.preventDefault()}>
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
		</div>
	);
}
