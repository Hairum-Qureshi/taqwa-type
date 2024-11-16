import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function SignIn() {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

    const { login } = useAuth();

    return (
    <>
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
            onClick={e => login(e, email, password)}
        >
            Sign In
        </button>
    </>
  )
}
