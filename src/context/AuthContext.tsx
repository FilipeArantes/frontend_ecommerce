import React, { createContext, useState, ReactNode } from "react";
import { useRouter } from "next/router";

interface AuthContextType {
  token: string | null;
  login: (token: string, email: string, idUser: string, nome: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  const login = (token: string, email: string, idUser: string, nome:string) => {
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("idUser", idUser);
    window.localStorage.setItem("nomeUser", nome);
    setToken(token);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("idUser");
    window.localStorage.removeItem("nomeUser");
    router.push("/login");
    setToken(null);
  };

  const authContextValue: AuthContextType = {
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
