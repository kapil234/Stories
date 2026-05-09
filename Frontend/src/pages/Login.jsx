import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import SummaryApi from "../common";
function Login() {
  const navigate = useNavigate();
  const { login ,} = useContext(AuthContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= LOGIN =================
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${SummaryApi.login.url}`,
        {
          method: SummaryApi.login.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!result.success) {
        toast.error(result.message || "Login failed");
        return;
      }

      await login();

      toast.success("Login successful");

      navigate("/");

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">

      {/* Background */}
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 top-0 left-0"></div>
      <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-0 right-0"></div>

      {/* Card */}
      <div className="relative bg-white w-[400px] p-8 rounded-3xl shadow-2xl z-10">

        <h1 className="text-center text-3xl font-bold mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {/* FORM */}
        <form onSubmit={handleOnSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleOnChange}
            required
            className="w-full border border-gray-300 p-3 rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleOnChange}
            required
            className="w-full border border-gray-300 p-3 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        {/* Signup */}
        <div className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 font-medium">
            Signup
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;