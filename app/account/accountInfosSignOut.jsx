import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useContext } from "react";
import { AuthContext } from "../utils/authContext";

const SignOut = () => {
  const router = useRouter();

  const { setAuthState, setCurrentUser } = useContext(AuthContext);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setAuthState(null);
    setCurrentUser(null);

    router.push("/account");
  };

  return (
    <button
      className="btn btn--primary btn--primary--warning"
      onClick={signOut}
    >
      Se déconnecter
    </button>
  );
};

export default SignOut;
