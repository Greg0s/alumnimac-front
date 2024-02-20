import Image from "next/image";
import Link from "next/link";

import { FaDiscord, FaLinkedinIn } from "react-icons/fa";
import "@/app/styles/footer.scss";

const Footer = () => {
  return (
    <footer title="Un soucis ? Une question ? Contacte moi !">
      <p>
        <span>Par </span>
        <Link target="_blank" href="https://gregoiretinn.es">
          Grégoire Tinnes
        </Link>
      </p>
      <div>
        <Link
          target="_blank"
          href="https://discordapp.com/users/151041434043023361"
        >
          <FaDiscord className="footer-icons" />
        </Link>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/gregoire-tinnes/"
        >
          <FaLinkedinIn className="footer-icons" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
