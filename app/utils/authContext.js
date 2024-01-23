"use client";

import { createContext, useEffect, useState } from "react";
import { getMe } from "./api";
import useRenewAccessToken from "./useRenewAccessToken";

export const AuthContext = createContext("");

export default function AuthProvider({ children }) {
  const [authState, setAuthState] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  const token = localStorage.getItem("token");

  if (token) useRenewAccessToken(authState, setAuthState);

  useEffect(() => {
    const fetchData = async () => {
      if (authState) setCurrentUser(await getMe());
    };

    fetchData();
  }, [authState]);

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
