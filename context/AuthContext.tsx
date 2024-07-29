"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
// import jwt_decode from "jwt-decode";

interface AuthContextProps {
  user: any;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const getUser = async () => {
      if (token) {
        setIsLoading(true);
        try {
          const response = await axios.post("/api/user/getUser", {
            token: token,
          });
          setUser(response.data.userDetails);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    getUser();
  }, []);

  const login = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        console.log(response)
        Cookies.set("token", data.token, { expires: 1 });
        console.log('here2')
        // const decodedToken = jwt_decode(data.token);
        // setUser(decodedToken);
        router.push("/dashboard");
        return data;
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
