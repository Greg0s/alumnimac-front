"use client";

import { getExperience } from "@/app/utils/api";
import { notFound } from "next/navigation";
import "../../styles/experiencePage.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExperienceDetails({ params }) {
  const [experience, setExperience] = useState(null);
  const [experienceLoaded, setExperienceLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedExperience = await getExperience(params.id);
        setExperience(fetchedExperience);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'expérience :",
          error
        );
        notFound();
      }
    };

    fetchData();
  }, [params.id]);

  const handleEditClick = () => {
    router.push(`/experience/edit?id=${params.id}`);
  };

  if (!experience) {
    return <p>Pas d'expérience</p>;
  }

  const author = experience.attributes.author.data.attributes;

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
            <p>
              {author.first_name} {author.last_name}{" "}
            </p>
            <p>IMAC {author.graduation_year}</p>
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
      <button onClick={handleEditClick}>Modifier l'expérience</button>
    </main>
  );
}
