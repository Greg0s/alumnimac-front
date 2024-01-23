"use client";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import ExperienceUpdateForm from "./experienceUpdateForm";
import { useRouter, notFound } from "next/navigation";
import { getExperience, updateExperience } from "@/app/utils/api";

const EditExperiencePage = ({ searchParams }) => {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedExperience = await getExperience(searchParams.id);
        setValues(fetchedExperience);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'expérience :",
          error
        );
        notFound();
      }
    };

    fetchData();
  }, [searchParams.id]);

  function setValues(experience) {
    experience = experience.attributes;

    let endDate;
    if (experience.end_date) endDate = new Date(experience.end_date);
    else endDate = "";

    setInitialValues({
      position: experience.position,
      type: experience.type,
      company: experience.company,
      startDate: new Date(experience.start_date),
      ongoing: experience.ongoing,
      endDate: endDate,
      workMode: experience.work_mode,
      abroad: experience.abroad,
      country: experience.country,
      city: experience.city,
      address: experience.address,
      paid: experience.paid,
      compensation: experience.compensation,
      domain: experience.domain,
      not_recommended: experience.not_recommended,
      description: experience.description,
    });
  }

  const validationSchema = Yup.object({
    position: Yup.string().required("Titre de l'expérience requis"),
    type: Yup.string().required("Type requis"),
    company: Yup.string().required("Entreprise requise"),
    startDate: Yup.string().required("Date de début requise"),
    ongoing: Yup.boolean(),
    endDate: Yup.date(),
    workMode: Yup.string().required("Mode de travail requis"),
    abroad: Yup.boolean(),
    country: Yup.string().required("Pays"),
    city: Yup.string().required("Ville requise"),
    address: "",
    paid: Yup.boolean().required("Statut de rémunération requis"),
    compensation: Yup.number(),
    domain: Yup.string().required("Domaine requis"),
    not_recommended: Yup.boolean(),
    description: Yup.string(),
  });

  const handleSubmit = async (values) => {
    console.log("submit", values);
    updateExperience(searchParams.id, values)
      .then(() => {
        router.push("/experience/" + searchParams.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!initialValues) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>Modifier l'expérience</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <ExperienceUpdateForm />
      </Formik>
    </div>
  );
};

export default EditExperiencePage;