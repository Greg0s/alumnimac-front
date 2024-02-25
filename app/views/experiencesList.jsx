import Link from "next/link";
import Image from "next/image";
// Utils
import { translate } from "@/utils";
// Style
import "@/styles/experiencesList.scss";

export function ExperiencesList({ experiences }) {
  return (
    <div className="experiences-list">
      {experiences &&
        experiences.map((experience) => (
          <Link key={experience.id} href={`/experience/${experience.id}`}>
            <div className="experiences-list__experience">
              <div className="experiences-list__experience__title">
                <h3>{experience.attributes.position}</h3>
                <span className="experiences-list__experience__title__right">
                  {"IMAC "}
                  {experience.attributes.author.data.attributes.graduation_year}
                  <br />
                  {translate("type", experience.attributes.type)}
                </span>
              </div>
              <div className="experiences-list__experience__content">
                <p className="experiences-list__experience__content__company">
                  {experience.attributes.company}
                </p>
                <p className="experiences-list__experience__content__location">
                  {experience.attributes.city}, {experience.attributes.country}
                </p>
              </div>
            </div>{" "}
          </Link>
        ))}
      {experiences && experiences.length === 0 && (
        <div className="experiences-list--no-results">
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
