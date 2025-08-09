import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setErrorMsg("");

    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );
      setMessage("Check your email for the reset code.");
      
      // بعد ما الإيميل يتبعت بنجاح، نروح على صفحة الكود
      setTimeout(() => {
        navigate("/Updatepassword");
      }, 1500);
      
    } catch  {
      setErrorMsg("Email not found or something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Forgot Password
        </h2>

        {message && <p className="text-green-600 text-center mb-2">{message}</p>}
        {errorMsg && <p className="text-red-600 text-center mb-2">{errorMsg}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Send Reset Code
        </button>
      </form>
    </div>
  );
}
