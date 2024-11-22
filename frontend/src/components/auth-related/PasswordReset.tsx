import { useState } from "react"
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";

export default function PasswordReset() {
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");

  const { resetPassword } = useAuth();
  const { token } = useParams();

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <div className="mt-40 lg:rounded-md lg:w-1/2 w-full p-3 bg-sky-950 text-white">
        <h3 className = "text-3xl">Reset Your Password</h3>
        <div>
          <form className="flex flex-col pb-3">
            <div className="flex flex-col mt-3">
              <label className="text-sm mb-2">Enter your new password:</label>
              <input type="password" className="border border-black text-black outline-none rounded-md p-2" placeholder="Enter your new password" value = {password} onChange = {e => setPassword(e.target.value)} />
            </div>
            <div className="flex flex-col mt-3 sm:w-full">
              <label className="text-sm mb-2">Re-enter your new password:</label>
              <input type="password" className="border border-black text-black outline-none rounded-md p-2" placeholder="Re-enter your new password" value = {passwordRetype} onChange = {e => setPasswordRetype(e.target.value)} />
            </div>
            <div className = "mt-6 text-center">
              <button className = "w-1/2 bg-sky-700 border border-sky-400 rounded-md p-2" onClick = {e => {
                e.preventDefault();
                resetPassword(password, passwordRetype, token!)
              }}>Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>  
  )
}
