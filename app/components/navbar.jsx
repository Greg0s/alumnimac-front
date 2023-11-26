"use client";

import Link from "next/link";
import Logo from "public/logo.png";
import Image from "next/image";
import "../styles/navbar.scss";

import { AuthContext } from "../utils/authContext";
import { useContext } from "react";

const Navbar = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  return (
    <nav>
      <Link href="/">
        <Image
          src={Logo}
          alt="logo"
          width={45}
          quality={100}
          placeholder="blur" // blur version on load
        />
      </Link>
      <Link href="/account">Compte</Link>
      {authState && <Link href="/experience/add">Ajouter</Link>}
    </nav>
  );
};

export default Navbar;
