import { getExperience } from "@/app/utils/api";
import { notFound } from "next/navigation";
import "../../styles/experiencePage.scss";

export default async function ExperienceDetails({ params }) {
  const experience = await getExperience(params.id);

  if (!experience) notFound();

  return (
    <main className="experience-page">
      <div className="card">
        <h3>{experience.attributes.position}</h3>
        <p>{experience.attributes.description}</p>
      </div>
    </main>
  );
}
