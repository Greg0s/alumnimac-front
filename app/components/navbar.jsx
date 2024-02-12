"use client";

import "../styles/navbar.scss";

import Link from "next/link";
import Logo from "public/logo.png";
import Image from "next/image";

import { useContext, useEffect } from "react";
import { AuthContext } from "../utils/authContext";
import useRenewAccessToken from "../utils/useRenewAccessToken";

const Navbar = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  const token = localStorage.getItem("token");
  if (token) useRenewAccessToken(authState, setAuthState);

  return (
    <>
      <nav>
        <Link className="logo " href="/">
          <Image
            src={Logo}
            alt="logo"
            width={45}
            quality={100}
            placeholder="blur" // blur version on load
          />
          <span className="logo-text link">AlumnIMAC</span>
        </Link>
        <Link className="link" href="/account">
          {authState ? "Mon Compte" : "Se connecter"}
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
