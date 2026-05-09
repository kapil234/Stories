import { createContext, useEffect, useState } from "react";
import SummaryApi from "../common";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= FETCH USER =================
  const fetchUser = async () => {
    try {
      const response = await fetch(
        SummaryApi.User.url,
        {
          method: SummaryApi.User.method,
          credentials: "include",
        }
      );

      const data = await response.json();

      // 🔥 FIX: always trust success flag
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }

    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOGIN =================
  const login = async () => {
    await fetchUser(); // always sync from backend
  };

  // ================= LOGOUT =================
  const logout = async () => {
    try {
      await fetch(SummaryApi.logout.url ,{
        method: SummaryApi.logout.method,
        credentials: "include",
      });

      // 🔥 IMPORTANT: clear frontend state
      setUser(null);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;