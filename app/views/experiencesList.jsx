import Link from "next/link";
import { getExperiences } from "../utils/api";

export default async function ExperienceList() {
  let experiences = await getExperiences();

  return (
    <>
      {experiences &&
        experiences.map((experience) => (
          <div key={experience.id} className="card my-5">
            <Link href={`/experience/${experience.id}`}>
              <h3>{experience.attributes.exp_title}</h3>
              <p>{experience.attributes.exp_company}</p>
            </Link>
          </div>
        ))}
      {experiences && experiences.length === 0 && (
        // image : C de l'imac tombé par terre genre un vestige antique
        <p className="text-center">
          Il y a une bonne et une mauvaise nouvelle : Tu as trouvé le C de
          l'IMAC, mais il n'y a aucune expériences d'étudiants à afficher pour
          l'instant...
        </p>
      )}
    </>
  );
}
