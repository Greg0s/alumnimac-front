"use client";

import ExperienceList from "./experiencesList";
import { getExperiences } from "../utils/api";
import { Suspense } from "react";
import Search from "../components/search";

export default async function Page({ searchParams }) {
  let query = searchParams?.query || "";
  if (query) query = formatText(query);

  console.log(query);
  const currentPage = Number(searchParams?.page) || 1;

  let experiences = await getExperiences();
  let filteredExperiences;

  if (experiences) {
    filteredExperiences = experiences.filter((experience) =>
      experienceMatchesSearchTerm(experience, query)
    );
  }

  return (
    <>
      <Search />
      <Suspense fallback={<p>Loading</p>}>
        <ExperienceList experiences={filteredExperiences} />
      </Suspense>
    </>
  );
}

function experienceMatchesSearchTerm(experience, searchTerm) {
  experience = experience.attributes;
  const { position, company, city, country } = experience;
  const { first_name, last_name } = experience.author.data.attributes;
  const normalizedSearchTerm = searchTerm.toLowerCase();

  return (
    formatText(position).includes(normalizedSearchTerm) ||
    formatText(company).includes(normalizedSearchTerm) ||
    formatText(city).includes(normalizedSearchTerm) ||
    formatText(country).includes(normalizedSearchTerm) ||
    formatText(first_name).includes(normalizedSearchTerm) ||
    formatText(last_name).includes(normalizedSearchTerm)
  );
}

function formatText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
