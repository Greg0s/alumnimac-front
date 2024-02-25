"use client";

import { useContext, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
// API
import { getExperience } from "@/utils/";
// Context
import { AuthContext } from "@/context/authContext";
// Utils
import { changeDateFormat, translate } from "@/utils/functions";
// Icons
import {
  HiArrowNarrowLeft,
  HiBriefcase,
  HiLocationMarker,
  HiUser,
  HiClock,
} from "react-icons/hi";
// Style
import "@/styles/experiencePage.scss";

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
      <Link className="experience-page__back-arrow" href={"/"}>
        <HiArrowNarrowLeft />
      </Link>
      <div>
        <h1>
          {experience.attributes.position}{" "}
          {experience.attributes.not_recommended && (
            <span title="Labelisée La Baleine">🐳</span>
          )}
        </h1>
        <p className="experience-page__company">
          {experience.attributes.company}
        </p>
      </div>
      <div className="experience-page__cards">
        <div className="block block-1">
          <HiBriefcase className="block-icon" />
          <p>{translate("type", experience.attributes.type)}</p>
          <p>{translate("mode", experience.attributes.work_mode)}</p>
          <p>
            {translate("paid", experience.attributes.paid)}{" "}
            {experience.attributes.paid &&
              experience.attributes.compensation != -1 && (
                <span>
                  {experience.attributes.compensation}
                  {"€/mois"}
                </span>
              )}
          </p>
          <p>{translate("domain", experience.attributes.domain)}</p>
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
