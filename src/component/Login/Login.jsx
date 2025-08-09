import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg(""); // reset error

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        {
          email,
          password,
        }
      );

      localStorage.setItem("userToken", data.token);
      alert("Login successful!");
      navigate("/"); // يرجّعه للصفحة الرئيسية
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Login failed. Please try again.");
      }
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-md p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>

        {errorMsg && (
          <p className="text-red-500 text-sm mb-3 text-center">{errorMsg}</p>
        )}

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-lime-600 hover:bg-lime-700 text-white py-2 rounded-md transition"
        >
          Login
        </button>

        {/* رابط نسيت كلمة المرور */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Forgot password?{" "}
          <Link to="/forgetpassword" className="text-lime-600 hover:underline">
            Reset here
          </Link>
        </p>
      </form>
    </div>
  );
}
