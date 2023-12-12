import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useContext } from "react";
import { AuthContext } from "../utils/authContext";

const SignOut = () => {
  const router = useRouter();

  const { authState, setAuthState } = useContext(AuthContext);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setAuthState(null);
    router.push("/account");
  };

  return <button onClick={signOut}>Se déconnecter</button>;
};

export default SignOut;
