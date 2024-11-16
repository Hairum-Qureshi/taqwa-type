import { Link } from "react-router-dom";
import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";

export default function AuthForm() {
	const [showSignUp, setShowSignUp] = useState(true);
	const [showForgotPass, setShowForgotPass] = useState(false);

	// Updated `update` function for better readability and handling different states
	function update(isForgotPassword: boolean) {
		if (isForgotPassword) {
			setShowSignUp(false);
			setShowForgotPass(true);
		} else {
			setShowForgotPass(false);
			setShowSignUp(!showSignUp);
		}
	}

	return (
		<div className="flex items-center justify-center flex-col mt-10">
			<form className="flex items-center justify-center flex-col w-10/12" onSubmit={(e) => e.preventDefault()}>
				<div className="mb-5 text-center">
					{showSignUp && !showForgotPass ? (
						<>
							<h2 className="text-3xl text-center text-white font-semibold">
								Sign Up to Taqwa Type
							</h2>
							<p className="text-green-500 mt-3">
								Kill two birds with one stone. Start today, it's free.
							</p>
							<p className="text-cyan-400 mt-2">
								Already have an account?&nbsp;
								<Link to="/" className="underline" onClick={() => update(false)}>
									Sign in
								</Link>
							</p>
						</>
					) : !showForgotPass ? (
						<>
							<h2 className="text-3xl text-center text-white font-semibold">
								Sign In to Taqwa Type
							</h2>
							<p className="text-green-500 mt-3">Welcome back to Taqwa Type!</p>
							<p className="text-cyan-400 mt-2">
								Don't have an account?&nbsp;
								<Link to="/" className="underline" onClick={() => update(false)}>
									Create one
								</Link>
							</p>
							<p className="text-cyan-400 mt-2">
								<Link to="/" className="underline" onClick={() => update(true)}>
									Forgot Password?
								</Link>
							</p>
						</>
					) : (
						<>
							<h2 className="text-3xl text-center text-white font-semibold">
								Reset Your Password
							</h2>
							<p className="text-green-500 mt-3">
								Enter your email to receive a password reset link.
							</p>
							<p className="text-cyan-400 mt-2">
								Remembered your password?&nbsp;
								<Link to="/" className="underline" onClick={() => update(false)}>
									Sign in
								</Link>
							</p>
						</>
					)}
				</div>
				{showSignUp && !showForgotPass ? (
					<SignUp />
				) : showForgotPass ? (
					<ForgotPassword />
				) : (
					<SignIn />
				)}
			</form>
		</div>
	);
}
