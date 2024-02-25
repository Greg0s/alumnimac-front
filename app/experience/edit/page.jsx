"use client";

import { useEffect, useState } from "react";
import { useRouter, notFound } from "next/navigation";
// Form dependencies
import * as Yup from "yup";
import { Formik } from "formik";
// API
import { getExperience, updateExperience } from "@/utils/";
// Components
import { ExperienceAddEditForm } from "@/components";
// Style
import "@/styles/experienceAddEdit.scss";

export default function EditExperiencePage({ searchParams }) {
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

    let compensation = experience.compensation;
    if (experience.compensation == -1) compensation = "";

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
      compensation: compensation,
      domain: experience.domain,
      notRecommended: experience.notRecommended,
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
    notRecommended: Yup.boolean(),
    description: Yup.string(),
  });

  const handleSubmit = async (values) => {
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
    <div className="edit-experience">
      <div className="edit-experience__header">
        <h1>Modifier l'expérience</h1>
        <p>* champs obligatoires</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <ExperienceAddEditForm />
      </Formik>
      <button
        onClick={() => {
          router.push("/experience/" + searchParams.id);
        }}
        className="btn btn--secondary"
      >
        Annuler
      </button>
    </div>
  );
}
