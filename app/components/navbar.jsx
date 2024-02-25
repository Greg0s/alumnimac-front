"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// Assets
import Logo from "public/logo.png";
// Context
import { AuthContext } from "@/context/authContext";
// Utils
import { useRenewAccessToken } from "@/utils/";
// Style
import "@/styles/navbar.scss";

export function Navbar() {
  const { authState, setAuthState, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) useRenewAccessToken(setAuthState, setCurrentUser);
  }, []);

  return (
    <>
      <nav>
        <Link className="logo" href="/">
          <Image src={Logo} alt="logo" width={45} quality={100} />
          <span className="logo-text link">AlumnIMAC</span>
        </Link>
        <Link className="link" href="/account">
          {authState ? "Mon Compte" : "Se connecter"}
        </Link>
      </nav>
    </>
  );
}
