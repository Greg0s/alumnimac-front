"use client";

import React, { useEffect, useState, useContext } from "react";
// Context
import { AuthContext } from "@/context/authContext";
// Utils
import { useRenewAccessToken } from "@/utils/";
// Components
import { AccountInfos, SignInForm, SignUpForm } from "./";
// Style
import "@/styles/account.scss";

export default function Account() {
  const { authState, setAuthState, setCurrentUser } = useContext(AuthContext);

  const [showSignUp, setShowSignUp] = useState(false);
  const toggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) useRenewAccessToken(setAuthState, setCurrentUser);
  }, []);

  return (
    <>
      {authState ? (
        <div className="account-page">
          <div>
            <AccountInfos />
          </div>{" "}
        </div>
      ) : (
        <div className="account-page">
          {showSignUp ? (
            <>
              <h1>S'inscrire</h1>
              <SignUpForm />
            </>
          ) : (
            <>
              <h1>Se connecter</h1>
              <SignInForm />
            </>
          )}
          <button className="btn btn--secondary" onClick={toggleForm}>
            {showSignUp
              ? "Déjà un compte ? Se connecter"
              : "Pas encore de compte ? S'inscrire"}
          </button>
        </div>
      )}
    </>
  );
}
