"use client";

import { getExperience, getMe } from "@/app/utils/api";
import { notFound } from "next/navigation";
import "../../styles/experiencePage.scss";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/utils/authContext";
import { changeDateFormat, translateAttribute } from "@/app/utils/functions";
import Link from "next/link";
import {
  HiArrowNarrowLeft,
  HiBriefcase,
  HiLocationMarker,
  HiUser,
  HiClock,
} from "react-icons/hi";

export default function ExperienceDetails({ params }) {
  const [experience, setExperience] = useState(null);
  const { currentUser } = useContext(AuthContext);

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

  const author = experience.attributes.author.data;
  let isAuthor;

  if (currentUser && currentUser.id == author.id) {
    isAuthor = true;
  }
  return (
    <div className="experience-page">
      <Link className="back-arrow" href={"/"}>
        <HiArrowNarrowLeft />
      </Link>
      <div className="title">
        <h1>{experience.attributes.position}</h1>
        <p className="company">{experience.attributes.company}</p>
      </div>
      <div className="cards">
        <div className="block block-1">
          <HiBriefcase className="block-icon" />
          <p>{translateAttribute("type", experience.attributes.type)}</p>
          <p>{translateAttribute("mode", experience.attributes.work_mode)}</p>
          <p>
            {translateAttribute("paid", experience.attributes.paid)}{" "}
            {experience.attributes.paid &&
              experience.attributes.compensation && (
                <span>
                  {experience.attributes.compensation}
                  {"€/mois"}
                </span>
              )}
          </p>
          <p>{translateAttribute("domain", experience.attributes.domain)}</p>
        </div>
        <div className="block-2">
          <div className="block location">
            <HiLocationMarker className="block-icon" />
            <p>
              {experience.attributes.city}, {experience.attributes.country}
            </p>
            {experience.attributes.address && (
              <p>{experience.attributes.address}</p>
            )}
          </div>
          <div className="block name">
            <HiUser className="block-icon" />
            <p>
              {author.attributes.first_name} {author.attributes.last_name}{" "}
            </p>
            <p>IMAC {author.attributes.graduation_year}</p>
          </div>
          <div className="block dates">
            <HiClock className="block-icon" />

            <p>
              {changeDateFormat(experience.attributes.start_date)} {" - "}
              {experience.attributes.end_date ? (
                <span>
                  {changeDateFormat(experience.attributes.end_date)} {"("}
                  {experience.attributes.duration} {"mois)"}
                </span>
              ) : (
                <span>Aujourd'hui (En cours)</span>
              )}
            </p>
          </div>
        </div>
      </div>
      <p className="description">{experience.attributes.description}</p>
      {isAuthor && (
        <button className="btn btn--primary" onClick={handleEditClick}>
          Modifier l'expérience
        </button>
      )}
    </div>
  );
}
