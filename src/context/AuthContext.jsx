import { createContext, useEffect, useState } from "react";
import {
  loginRequest,
  registerRequest,
  getProfileRequest,
} from "../api/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (data) => {
    const res = await loginRequest(data);

    localStorage.setItem("opinanet_token", res.data.token);

    const profile = await getProfileRequest();
    setUser(profile.data);

    return res;
  };

  const register = async (data) => {
    await registerRequest(data);

    // después de registrarse, puedes redirigir a login
    return true;
  };

  const logout = () => {
    localStorage.removeItem("opinanet_token");
    setUser(null);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("opinanet_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getProfileRequest();
        setUser(res.data);
      } catch (error) {
        console.error(error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
