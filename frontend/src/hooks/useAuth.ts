import axios from "axios";

interface AuthTools {
	googleAuth: (
		email: string,
		first_name: string,
		last_name: string,
		full_name: string,
		pfp: string
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
		try {
			axios.post("http://localhost:4000/api/auth/sign-in/google", {
				email,
				first_name,
				last_name,
				full_name,
				pfp
			});
		} catch (error) {
			console.log("There was an error", error);
		}
	}

	return { googleAuth };
}
