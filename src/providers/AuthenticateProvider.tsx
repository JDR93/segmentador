"use client";

import { AuthenticateContext } from "@/contexts/authenticateContext";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { useLogin } from "@/contexts/loginContext";

export type AuthenticateContextType = {
  certified: boolean;
  setCertified: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthenticateProvider = ({ children }: { children: ReactNode }) => {
  const [certified, setCertified] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setLoginData } = useLogin();

  const certify = async () => {
    try {
      const res = await axios.post("/api/certificate");

      console.log("Certification made:", res.data.message);

      console.log("setear token y coneion en provider",res.data.token, res.data.connectionCode);

      // Guardar el token y el connectionCode en el contexto
      setLoginData({
        token: res.data.token,
        connectionCode: res.data.connectionCode,
      });

      setCertified(true);
    } catch (err: any) {
      console.warn("Certification failed:", err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Starting certification...");
    certify(); // Ya no verificamos sesión, solo certificamos directo
  }, []);

  return (
    <AuthenticateContext.Provider value={{ certified, setCertified }}>
      {!loading && children}
    </AuthenticateContext.Provider>
  );
};

