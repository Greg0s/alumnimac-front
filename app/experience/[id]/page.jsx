"use client";

import { getExperience, getMe } from "@/app/utils/api";
import { notFound } from "next/navigation";
import "../../styles/experiencePage.scss";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/utils/authContext";

export default function ExperienceDetails({ params }) {
  const [experience, setExperience] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { authState } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedExperience = await getExperience(params.id);
        setExperience(fetchedExperience);
        if (authState) setCurrentUser(await getMe());
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

  const author = experience.attributes.author.data;
  let isAuthor;

  if (currentUser && currentUser.data.id == author.id) {
    isAuthor = true;
  }

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
              {author.attributes.first_name} {author.attributes.last_name}{" "}
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
      {isAuthor && (
        <button onClick={handleEditClick}>Modifier l'expérience</button>
      )}
    </main>
  );
}
