import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setErrorMsg("");
  }

  function validate() {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    else if (formData.name.length < 3) errs.name = "Name must be at least 3 characters";

    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!formData.email.includes("@")) errs.email = "Email is invalid";

    if (!formData.password) errs.password = "Password is required";
    else if (formData.password.length < 6)
      errs.password = "Password must be at least 6 characters";

    if (!formData.rePassword) errs.rePassword = "Confirm password is required";
    else if (formData.password !== formData.rePassword)
      errs.rePassword = "Passwords do not match";

    if (!formData.phone.trim()) errs.phone = "Phone is required";
    else if (!/^(20)?01[1250][0-9]{8}$/.test(formData.phone))
      errs.phone = "Phone is invalid";

    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setErrors({});
      setErrorMsg("");
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        formData
      );
      if (data.message === "success") {
        alert("Registration successful, please login.");
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong. Try again.");
      }
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Register
        </h2>

        {errorMsg && (
          <p className="text-red-500 text-sm mb-3 text-center">{errorMsg}</p>
        )}

        <label className="block mb-1 font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Your name"
        />
        {errors.name && <p className="text-red-600 text-sm mb-2">{errors.name}</p>}

        <label className="block mb-1 font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Your email"
        />
        {errors.email && <p className="text-red-600 text-sm mb-2">{errors.email}</p>}

        <label className="block mb-1 font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mb-2">{errors.password}</p>
        )}

        <label className="block mb-1 font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          name="rePassword"
          value={formData.rePassword}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Confirm your password"
        />
        {errors.rePassword && (
          <p className="text-red-600 text-sm mb-2">{errors.rePassword}</p>
        )}

        <label className="block mb-1 font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Your phone number"
        />
        {errors.phone && <p className="text-red-600 text-sm mb-2">{errors.phone}</p>}

        <button
          type="submit"
          className="w-full bg-lime-600 hover:bg-lime-700 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
