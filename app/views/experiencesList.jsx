import Link from "next/link";
import Image from "next/image";
import "../styles/experiencesList.scss";
import { translateAttribute } from "../utils/functions";

export default function ExperienceList({ experiences }) {
  return (
    <div className="experiences-list">
      {experiences &&
        experiences.map((experience) => (
          <div key={experience.id} className="experience">
            <Link href={`/experience/${experience.id}`}>
              <div className="title">
                <h3>{experience.attributes.position}</h3>
                <span className="title-right">
                  {"IMAC "}
                  {experience.attributes.author.data.attributes.graduation_year}
                  <br />
                  {translateAttribute("type", experience.attributes.type)}
                </span>
              </div>
              <div className="content">
                <p className="content-company">
                  {experience.attributes.company}
                </p>
                <p className="content-location">
                  {experience.attributes.city}, {experience.attributes.country}
                </p>
              </div>
            </Link>
          </div>
        ))}
      {experiences && experiences.length === 0 && (
        <div className="no-results">
          <Image
            className="img"
            src="/cimac.png"
            alt="C de l'IMAC"
            width={175}
            height={175}
          />
          <h2>Pas de résultats :/</h2>
          <p>
            Il y a une bonne et une mauvaise nouvelle : Tu as trouvé le C de
            l'IMAC, mais il n'y a aucune expérience correspondant à ta
            recherche.
          </p>
        </div>
      )}
    </div>
  );
}
