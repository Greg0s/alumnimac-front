"use client";

import React from "react";

import SignInForm from "../components/signInForm";
import SignUpForm from "../components/signUpForm";
import AccountInfos from "../components/accountInfos";

import { useContext } from "react";
import { AuthContext } from "../utils/authContext";
import useRenewAccessToken from "../utils/useRenewAccessToken";

export default function Account() {
  const { authState, setAuthState, setCurrentUser } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  if (token) useRenewAccessToken(authState, setAuthState, setCurrentUser);
  return (
    <>
      {authState ? (
        <div>
          <AccountInfos />
        </div>
      ) : (
        <div>
          <SignUpForm />
          <SignInForm />
        </div>
      )}
    </>
  );
}
