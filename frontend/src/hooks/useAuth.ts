import axios from "axios";
import { useState } from "react";
import { AuthTools } from "../interfaces";

export default function useAuth(): AuthTools {
	const [showVerification, setShowVerification] = useState(false);

	async function googleAuth(
		email: string,
		first_name: string,
		last_name: string,
		full_name: string,
		pfp: string
	) {
		await axios
			.post(
				"http://localhost:4000/api/auth/sign-in/google",
				{
					email,
					first_name,
					last_name,
					full_name,
					pfp
				},
				{
					withCredentials: true
				}
			)
			.then(response => {
				window.location.href = `http://localhost:5173/user/${response.data._id}/account`;
			})
			.catch(error => {
				console.error(error);
			});
	}

	async function signUp(
		e: React.FormEvent,
		first_name: string,
		last_name: string,
		email: string,
		password: string
	) {
		e.preventDefault();
		if (!first_name || !last_name || !email || !password) {
			alert("Please fill in all fields");
		} else {
			const full_name = `${first_name} ${last_name}`;

			if (email.endsWith("@gmail.com")) {
				alert(
					"It looks like you're signing up with a Gmail account. Consider signing in with Google!"
				);
			} else {
				await axios
					.post(
						"http://localhost:4000/api/auth/sign-up",
						{
							first_name,
							last_name,
							full_name,
							email,
							password
						},
						{
							withCredentials: true
						}
					)
					.then(response => {
						console.log(response.data);
						if(response.data.message === "Please check your inbox for a verification code") {
							setShowVerification(true);
						} 
						else {
							window.location.href = `http://localhost:5173/user/${response.data._id}/account`;
						}
					})
					.catch(error => {
						console.log(error);
					});
			}
		}
	}

	async function login(e: React.FormEvent, email: string, password: string) {
		e.preventDefault();
		if (!email || !password) {
			alert("Please fill in all fields");
		} else {
			if (email.endsWith("@gmail.com")) {
				alert(
					"It looks like this email is tied to a Gmail account. Consider logging in through Google"
				);
			} else {
				await axios
					.post(
						"http://localhost:4000/api/auth/sign-in",
						{
							email,
							password
						},
						{
							withCredentials: true
						}
					)
					.then(response => {
						window.location.href = `http://localhost:5173/user/${response.data._id}/account`;
					})
					.catch(error => {
						console.log(error);
					});
			}
		}
	}

	async function verifyUser(digits:string) {
		if(digits) {
			await axios.post("http://localhost:4000/api/auth/verify-email", {
				code: digits
			}, {
				withCredentials: true
			}).then(response => {
				if(response.data.message == "Email verified successfully!") {
					window.location.href = `http://localhost:5173/user/${response.data.user_id}/account`;
				}
			}).catch(error => {
				console.log(error);
			})
		}
		else {
			alert("Please enter the verification code");
		}
	}

	return { googleAuth, signUp, login, showVerification, verifyUser };
}
