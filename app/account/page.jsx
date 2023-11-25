"use client";

import React from "react";

import SignInForm from "../components/signInForm";
import SignUpForm from "../components/signUpForm";
import ManageAccount from "../components/manageAccount";

import { useContext } from "react";
import { AuthContext } from "../utils/authContext";
import useRenewAccessToken from "../utils/useRenewAccessToken";

export default function Account() {
  const { authState, setAuthState } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  if (token) useRenewAccessToken(authState, setAuthState);
  return (
    <>
      {authState ? (
        <div>
          <ManageAccount />
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
