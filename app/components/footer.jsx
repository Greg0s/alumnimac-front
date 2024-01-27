import Image from "next/image";
import Link from "next/link";

import LinkedInSvg from "../assets/svg/linkedIn";
import DiscordSvg from "../assets/svg/discord";

import "@/app/styles/footer.scss";

const Footer = () => {
  return (
    <footer>
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
          <DiscordSvg size={14} />
        </Link>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/gregoire-tinnes/"
        >
          <LinkedInSvg size={14} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
