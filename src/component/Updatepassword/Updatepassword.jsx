import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    resetCode: ""
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        formData
      );

      if (data?.token) {
        setSuccessMsg("Password updated successfully.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setErrorMsg("Invalid reset code or email.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Reset Password
        </h2>

        {successMsg && (
          <p className="text-green-600 text-center mb-2">{successMsg}</p>
        )}
        {errorMsg && (
          <p className="text-red-600 text-center mb-2">{errorMsg}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-md mb-3"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="resetCode"
          placeholder="Reset Code"
          className="w-full p-2 border border-gray-300 rounded-md mb-3"
          value={formData.resetCode}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
