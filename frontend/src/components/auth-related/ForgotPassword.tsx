import { useState } from "react"
import useAuth from "../../hooks/useAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useAuth();

  return (
      <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-5 mt-5 p-2 text-md outline-none rounded-sm"
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        <button
            className="bg-green-600 font-semibold text-white text-lg mt-5 py-2 p-2 w-full mb-10 rounded-sm" onClick = {() => forgotPassword(email)}
        >
            Send Password Reset Email
        </button>
      </div>
  )
}
