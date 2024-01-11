"use client";

import { useEffect, useState } from "react";
import ExperienceList from "./experiencesList";
import { getExperiences } from "../utils/api";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import Search from "../components/search";

export default async function Page({ searchParams }) {
  let query = searchParams?.query || "";

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
  const normalizedSearchTerm = searchTerm.toLowerCase();

  return (
    position.toLowerCase().includes(normalizedSearchTerm) ||
    company.toLowerCase().includes(normalizedSearchTerm) ||
    city.toLowerCase().includes(normalizedSearchTerm) ||
    country.toLowerCase().includes(normalizedSearchTerm)
  );
}
