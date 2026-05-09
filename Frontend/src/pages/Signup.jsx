import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {

    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:8081/api/signup",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (result.success) {

        toast.success("Signup successful");

        setData({
          name: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } else {

        toast.error(result.message);
      }

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-100 overflow-hidden relative px-4">

      {/* Background */}
      <div className="absolute w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-30 top-0 left-0"></div>

      <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-30 bottom-0 right-0"></div>

      {/* Card */}
      <div className="relative bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl w-full max-w-md p-8 z-10">

        {/* Heading */}
        <div className="text-center mb-7">

          <h1 className="text-4xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Signup to continue
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>

            <div className="flex items-center mt-2 border border-gray-300 rounded-xl px-3 focus-within:border-purple-500 bg-white">

              <User
                size={18}
                className="text-gray-400"
              />

              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-3 outline-none rounded-xl"
                required
              />

            </div>
          </div>

          {/* Email */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <div className="flex items-center mt-2 border border-gray-300 rounded-xl px-3 focus-within:border-purple-500 bg-white">

              <Mail
                size={18}
                className="text-gray-400"
              />

              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 outline-none rounded-xl"
                required
              />

            </div>
          </div>

          {/* Password */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="flex items-center mt-2 border border-gray-300 rounded-xl px-3 focus-within:border-purple-500 bg-white">

              <Lock
                size={18}
                className="text-gray-400"
              />

              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 outline-none rounded-xl"
                required
              />

            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition duration-300 shadow-lg"
          >
            Signup
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-6">

          <div className="flex-1 h-px bg-gray-300"></div>

          <span className="px-4 text-sm text-gray-500">
            OR
          </span>

          <div className="flex-1 h-px bg-gray-300"></div>

        </div>

        {/* Google Button */}
        <button
          className="w-full border border-gray-300 bg-white py-3 rounded-xl font-medium hover:bg-gray-50 transition"
        >
          Continue with Google
        </button>

        {/* Login */}
        <div className="text-sm text-center text-gray-500 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Signup;