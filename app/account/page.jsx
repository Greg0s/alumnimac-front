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
    <div className="account-page">
      {authState ? (
        <div>
          <AccountInfos />
        </div>
      ) : (
        <div>
          {showSignUp ? <SignUpForm /> : <SignInForm />}
          <button className="btn btn--secondary" onClick={toggleForm}>
            {showSignUp
              ? "Déjà un compte ? Se connecter"
              : "Pas encore de compte ? S'inscrire"}
          </button>
        </div>
      )}
    </div>
  );
}
