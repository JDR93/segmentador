"use client";

import { createContext, useContext, useState } from "react";

interface LoginContextType {
  token: string | null;
  connectionCode: string | null;
  setLoginData: (data: { token: string, connectionCode: string }) => void;
  clearLoginData: () => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [connectionCode, setConnectionCode] = useState<string | null>(null);

  const setLoginData = ({ token, connectionCode }: { token: string; connectionCode: string }) => {
    setToken(token);
    setConnectionCode(connectionCode);
  };

  const clearLoginData = () => {
    setToken(null);
    setConnectionCode(null);
  };

  return (
    <LoginContext.Provider value={{ token, connectionCode, setLoginData, clearLoginData }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) throw new Error("useLogin debe usarse dentro de <LoginProvider>");
  return context;
};
