import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Updatepassword() {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

 
  async function handleSendCode(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgetPassword",
        { email }
      );

      if (data.message === "success") {
        setSuccessMsg("Reset code sent to your email.");
        setStep(2); 
      } else {
        setErrorMsg("Unable to send reset code.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong.");
    }
  }

 
  async function handleResetPassword(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        { email, resetCode, newPassword }
      );

      if (data?.token) {
        setSuccessMsg("Password updated successfully.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setErrorMsg("Invalid reset code or email.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white shadow-md p-6 rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {step === 1 ? "Enter your email" : "Reset Password"}
        </h2>

        {successMsg && <p className="text-green-600 text-center mb-2">{successMsg}</p>}
        {errorMsg && <p className="text-red-600 text-center mb-2">{errorMsg}</p>}

        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              onClick={handleSendCode}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
            >
              Send Reset Code
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Reset Code"
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
            >
              Update Password
            </button>
          </>
        )}
      </form>
    </div>
  );
}
