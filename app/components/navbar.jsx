"use client";

import "../styles/navbar.scss";

import Link from "next/link";
import Logo from "public/logo.png";
import Image from "next/image";

import { useContext } from "react";
import { AuthContext } from "../utils/authContext";

const Navbar = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  return (
    <>
      <nav>
        <Link className="logo" href="/">
          <Image
            src={Logo}
            alt="logo"
            width={45}
            quality={100}
            placeholder="blur" // blur version on load
          />
          <span className="logo-text">AlumnIMAC</span>
        </Link>
        <Link href="/account">{authState ? "Mon Compte" : "Se connecter"}</Link>
      </nav>
    </>
  );
};

export default Navbar;
