import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

    const { signUp } = useAuth();

    return (
    <>
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
    </>
  )
}
