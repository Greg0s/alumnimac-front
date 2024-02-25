"use client";

import React, { useState } from "react";
// Components
import { ExperiencesList } from "./";
import { Search, Filters, AddButton } from "@/components/";
// Style
import "app/styles/homePage.scss";

export function HomePage({ searchParams, experiences }) {
  const [filters, setFilters] = useState("");

  let query = searchParams?.query || "";
  if (query) query = formatText(query);

  let filteredExperiences;

  const filterExperiences = (experience) => {
    const { work_mode, domain, type, paid, abroad } = experience.attributes;
    const {
      filterType,
      filterDomain,
      filterPaid,
      filterAbroad,
      filterWorkMode,
    } = filters;

    return (
      (filterType == type || filterType == "all") &&
      (filterDomain == domain || filterDomain == "all") &&
      (filterPaid == paid.toString() || filterPaid == "all") &&
      (filterAbroad == abroad.toString() || filterAbroad == "all") &&
      (filterWorkMode == work_mode || filterWorkMode == "all")
    );
  };

  if (experiences) {
    filteredExperiences = experiences.filter(
      (experience) =>
        experienceMatchesSearchTerm(experience, query) &&
        filterExperiences(experience)
    );
  }

  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  return (
    <div className="home">
      <h1>Toutes les expériences</h1>
      <div className="home__search">
        <Search />
        <Filters onFiltersChange={handleFiltersChange} />
      </div>
      <ExperiencesList experiences={filteredExperiences} />
      <AddButton />
    </div>
  );
}

function experienceMatchesSearchTerm(experience, searchTerm) {
  experience = experience.attributes;
  const { position, company, city, country, description } = experience;
  const { first_name, last_name } = experience.author.data.attributes;
  const normalizedSearchTerm = searchTerm.toLowerCase();

  return (
    formatText(position).includes(normalizedSearchTerm) ||
    formatText(company).includes(normalizedSearchTerm) ||
    formatText(city).includes(normalizedSearchTerm) ||
    formatText(country).includes(normalizedSearchTerm) ||
    formatText(first_name).includes(normalizedSearchTerm) ||
    formatText(last_name).includes(normalizedSearchTerm) ||
    formatText(description).includes(normalizedSearchTerm)
  );
}

function formatText(text) {
  if (text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }
  return "";
}
