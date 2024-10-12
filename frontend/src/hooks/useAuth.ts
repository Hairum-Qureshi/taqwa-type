import axios from "axios";

interface AuthTools {
	googleAuth: (
		email: string,
		first_name: string,
		last_name: string,
		full_name: string,
		pfp: string
	) => void;
	signUp: (
		e: React.FormEvent,
		first_name: string,
		last_name: string,
		email: string,
		password: string
	) => void;
}

export default function useAuth(): AuthTools {
	function googleAuth(
		email: string,
		first_name: string,
		last_name: string,
		full_name: string,
		pfp: string
	) {
		axios
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
				console.log(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}

	function signUp(
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
				axios
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
					})
					.catch(error => {
						console.log(error);
					});
			}
		}
	}

	return { googleAuth, signUp };
}
