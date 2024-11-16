import { FormEvent, useRef, useState, KeyboardEvent, ClipboardEvent } from "react";
import useAuth from "../../hooks/useAuth";

export default function Verification() {
    const [digits, setDigits] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]); // Array of refs for each input
    const { verifyUser } = useAuth();

    // Handle arrow key navigation and input changes
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1].focus();
        } 
        else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1].focus();
        } 
        else if (e.key === "Backspace" && !digits[index] && index > 0) {
            // If backspace is pressed and input is empty, move to the previous input
            inputRefs.current[index - 1].focus();
        }
    };

    const updateInput = (e: FormEvent<HTMLInputElement>, index: number) => {
        const { value } = e.currentTarget;
        if (value.match(/^\d?$/)) { // Ensure only a single digit is entered
            const newDigits = [...digits];
            newDigits[index] = value;
            setDigits(newDigits);

            // Move focus to the next input if the current one is filled
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        const pastedData = e.clipboardData.getData("text");
        if (pastedData.match(/^\d{6}$/)) { // Check if the pasted data is exactly 6 digits
            setDigits(pastedData.split(""));
            inputRefs.current[5].focus();
        }
        e.preventDefault();
    };

    return (
        <div className="p-2 mb-4 text-white flex flex-col items-center justify-center">
            <form className="flex flex-col items-center">
                <label htmlFor="otp" className="text-center my-6">
                    Please enter the 6-digit verification code you received in your email
                </label>
                <div className="flex items-center justify-center">
                    {digits.map((digit, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                ref={(el) => (inputRefs.current[index] = el!)} // Assign ref to each input
                                type="text"
                                maxLength={1}
                                className={`w-12 h-12 p-2 rounded-md text-center outline-none focus:ring-1 focus:ring-sky-400 text-xl bg-sky-900`}
                                value={digit}
                                onChange={(e) => updateInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                            />
                            {index !== 5 && (
                                <div className="border-white border-t-2 w-6 mx-2"></div>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    className="bg-green-600 font-semibold text-white text-lg my-20 py-2 p-2 w-full mb-3 rounded-sm"
                onClick = {e => {
                    verifyUser(digits.join("")); 
                    e.preventDefault()
                }}>
                    Verify Account
                </button>
            </form>
        </div>
    );
}
