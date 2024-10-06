import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

export default function AuthForm() {
	const login = useGoogleLogin({
		onSuccess: tokenResponse => console.log(tokenResponse)
	});
	return (
		<div className="flex items-center justify-center flex-col mt-10">
			<form className="flex items-center justify-center flex-col w-10/12">
				<div className="mb-5 text-center">
					<h2 className="text-3xl text-center text-white font-semibold">
						Sign Up to Taqwa Type
					</h2>
					<p className="text-green-500 mt-3">
						Kill two birds with one stone. Start today. It's free.
					</p>
					<p className="text-cyan-400 mt-2">
						Don't have an account? No problem.&nbsp;
						<Link to="/" className="underline">
							Create one
						</Link>
						.
					</p>
				</div>
				<div className="flex flex-row w-full mb-5 items-center justify-center">
					<input
						type="text"
						placeholder="First Name"
						className="w-full mr-2 p-2 text-md outline-none rounded-sm"
					/>
					<input
						type="text"
						placeholder="Last Name"
						className="w-full ml-2 p-2 text-md outline-none rounded-sm"
					/>
				</div>
				<input
					type="email"
					placeholder="Email"
					className="w-full mb-5 mt-5 p-2 text-md outline-none rounded-sm"
				/>
				<input
					type="password"
					placeholder="Password"
					className="w-full p-2 mt-5 text-md outline-none rounded-sm"
				/>
				<button className="bg-green-600 font-semibold text-white text-lg mt-10 py-2 p-2 w-full mb-10 rounded-sm">
					Sign Up
				</button>
			</form>
			<div className="flex items-center justify-center">
				<span className="border-t border-gray-300 w-32"></span>
				<p className="text-white font-semibold mx-4">OR</p>
				<span className="border-t border-gray-300 w-32"></span>
			</div>
			<button
				onClick={() => login()}
				className="mt-10 bg-white text-black py-2 p-2 w-1/2 rounded-md"
			>
				Sign in with Google
			</button>
		</div>
	);
}
