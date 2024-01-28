"use client";

import { createContext, useState } from "react";

export const AuthContext = createContext("");

export default function AuthProvider({ children }) {
  const [authState, setAuthState] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
