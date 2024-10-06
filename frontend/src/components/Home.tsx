import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Home() {
	// <div className="h-screen flex">
	// 	<div className="bg-slate-200 w-full md:h-1/2"></div>
	// 	<div className="lg:w-3/4 lg:h-screen md:w-full md:h-3/4 bg-blue-950"></div>
	// </div>
	return (
		<div className="h-screen flex">
			<div className="bg-white w-full p-4">
				<div className="flex items-center justify-center mt-24">
					{/* <h1 className="text-5xl font-semibold">
						Interested in reading the Quran but only know English? <br /> <br />
						Interested in improving your typing speed through practice? <br />
						<br />
						Why not do both? Practice while reading something you love
					</h1> */}
				</div>
			</div>
			<div className="bg-sky-500 w-3/4">
				<div className="h-full flex items-center justify-center text-white">
					<div>
						<h1 className="text-2xl font-semibold">Sign Up Today!</h1>
						<GoogleLogin
							onSuccess={credentialResponse => {
								console.log(jwtDecode(credentialResponse.credential!));
							}}
							onError={() => {
								console.log("Login Failed");
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
