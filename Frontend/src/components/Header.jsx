import React, { useContext } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Home,
  Bookmark,
  LogOut,
  LogIn,
  UserPlus,
  Newspaper,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

import { toast } from "react-toastify";

function Header() {

  const {
    user,
    logout,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  // ================= LOGOUT =================

  const handleLogout = async () => {

    try {

      await logout();

      toast.success(
        "Logout successful"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error(
        "Logout failed"
      );
    }
  };

  return (

    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md border-b z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">

            <Newspaper
              className="text-white"
              size={22}
            />

          </div>

          <div>

            <h1 className="text-lg sm:text-2xl font-bold text-gray-800 leading-none">
              Stories
            </h1>

            <p className="text-xs text-gray-500">
              Hacker News Feed
            </p>

          </div>

        </Link>

        {/* ================= NAVIGATION ================= */}

        <div className="flex items-center gap-3">

          {/* HOME */}

          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
          >

            <Home size={18} />

            <span className="hidden sm:block">
              Home
            </span>

          </Link>

          {user ? (

            <>
              {/* BOOKMARKS */}

              <Link
                to="/bookmarks"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition shadow-sm"
              >

                <Bookmark size={18} />

                <span className="hidden sm:block">
                  Bookmarks
                </span>

              </Link>

              {/* USER */}

              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium shadow-sm">

                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                  {user?.name?.charAt(0)?.toUpperCase()}

                </div>

                <span>
                  {user?.name}
                </span>

              </div>

              {/* LOGOUT */}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition shadow-sm"
              >

                <LogOut size={18} />

                <span className="hidden sm:block">
                  Logout
                </span>

              </button>
            </>

          ) : (

            <>
              {/* LOGIN */}

              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white transition shadow-sm"
              >

                <LogIn size={18} />

                <span className="hidden sm:block">
                  Login
                </span>

              </Link>

              {/* REGISTER */}

              <Link
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition shadow-sm"
              >

                <UserPlus size={18} />

                <span className="hidden sm:block">
                  Register
                </span>

              </Link>
            </>
          )}

        </div>
      </div>
    </header>
  );
}

export default Header;