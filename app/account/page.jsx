"use client";

import React, { useEffect, useState } from "react";

import "@/app/styles/account.scss";

import SignInForm from "./accountSignInForm";
import SignUpForm from "./accountSignUpForm";
import AccountInfos from "./accountInfos";

import { useContext } from "react";
import { AuthContext } from "../utils/authContext";
import useRenewAccessToken from "../utils/useRenewAccessToken";

export default function Account() {
  const { authState, setAuthState, setCurrentUser } = useContext(AuthContext);

  const [showSignUp, setShowSignUp] = useState(false);
  const toggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) useRenewAccessToken(authState, setAuthState, setCurrentUser);
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
