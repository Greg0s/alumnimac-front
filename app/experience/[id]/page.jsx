import { getExperience } from "@/app/utils/api";
import { notFound } from "next/navigation";
import "../../styles/experiencePage.scss";

export default async function ExperienceDetails({ params }) {
  const experience = await getExperience(params.id);

  if (!experience) notFound();

  return (
    <main className="experience-page">
      <div className="title">
        <h1>{experience.attributes.position}</h1>
        <p className="company">{experience.attributes.company}</p>
      </div>
      <div className="cards">
        <div className="block-1">
          <p>{experience.attributes.type}</p>
          <p>{experience.attributes.domain}</p>
        </div>
        <div className="block-2">
          <div className="location">
            <p>
              {experience.attributes.city}, {experience.attributes.country}
            </p>
            {experience.attributes.address && (
              <p>{experience.attributes.address}</p>
            )}
          </div>
          <div className="name">
            <p>Prénom Nom</p>
            <p>IMAC XXX</p>
          </div>
          <div className="dates">
            <p>{experience.attributes.start_date}</p>
            {experience.attributes.end_date ? (
              <p>{experience.attributes.end_date}</p>
            ) : (
              <p>En cours</p>
            )}
          </div>
        </div>
      </div>
      <p className="description">{experience.attributes.description}</p>
    </main>
  );
}
