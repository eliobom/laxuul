import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample admin user for demo purposes
const adminUser: User = {
  id: "admin-001",
  email: "admin@hotellaxuli.com",
  name: "Administrador",
  role: "admin",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage (simulating persistent login)
    const storedUser = localStorage.getItem("hotelUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo, only allow login with the admin credentials
      if (email === "admin@hotellaxuli.com" && password === "admin123") {
        setUser(adminUser);
        localStorage.setItem("hotelUser", JSON.stringify(adminUser));
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hotelUser");
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};