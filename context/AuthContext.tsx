"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  _id: string;
  email: string;
  name: string;
}

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: false,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    
    const getUser = async () => {
      if (token) {
        setIsLoading(true);
        try {
          const response = await axios.post("/api/user/getUser", { token });
          console.log("User data:", response.data);
          setUser(response.data.userDetails);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
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
      console.log('Login response:', data);
      if (data.status === 200) {
        Cookies.set("token", data.token, { expires: 1 });
        window.location.href = '/dashboard'
      } else {
        toast.error(data.msg);
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
