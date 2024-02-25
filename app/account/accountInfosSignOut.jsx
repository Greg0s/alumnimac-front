import React, { useContext } from "react";
import { useRouter } from "next/navigation";
// Context
import { AuthContext } from "@/context/";

export function SignOut() {
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
}
