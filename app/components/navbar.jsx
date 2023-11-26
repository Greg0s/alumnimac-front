import Link from "next/link";
import Logo from "public/logo.png";
import Image from "next/image";
import "../styles/navbar.scss";

const Navbar = () => {
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
      <Link href="/experience/add">Ajouter</Link>
    </nav>
  );
};

export default Navbar;
