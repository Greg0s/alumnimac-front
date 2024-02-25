"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
// Form dependencies
import { Formik } from "formik";
import * as Yup from "yup";
// Context
import { AuthContext } from "@/context/authContext";
// API
import { addExperience } from "@/utils";
// Components
import { ExperienceAddForm } from "./";
// Style
import "@/styles/experienceAddEdit.scss";

export default function ExperienceAdd() {
  const router = useRouter();
  const { authState } = useContext(AuthContext);

  if (!authState) router.push("/");

  const initialValues = {
    position: "",
    type: "",
    company: "",
    startDate: "",
    ongoing: false,
    endDate: "",
    workMode: "",
    abroad: false,
    country: "",
    city: "",
    address: "",
    paid: false,
    compensation: "",
    domain: "",
    notRecommended: false,
    description: "",
  };

  const validationSchema = Yup.object({
    position: Yup.string().required("Titre de l'expérience requis"),
    type: Yup.string().required("Type requis"),
    company: Yup.string().required("Entreprise requise"),
    startDate: Yup.string().required("Date de début requise"),
    ongoing: Yup.boolean(),
    endDate: Yup.date(),
    workMode: Yup.string().required("Mode de travail requis"),
    abroad: Yup.boolean(),
    country: Yup.string().required("Pays requis"),
    city: Yup.string().required("Ville requise"),
    address: "",
    paid: Yup.boolean().required("Statut de rémunération requis"),
    compensation: Yup.number(),
    domain: Yup.string().required("Domaine requis"),
    notRecommended: Yup.boolean(),
    description: Yup.string(),
  });

  const handleSubmit = async (values) => {
    // to avoid timezone problems
    values.startDate.setHours(12, 0, 0, 0);
    values.endDate.setHours(12, 0, 0, 0);

    addExperience(values)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="add-experience">
      <div className="add-experience__header">
        <h1>Ajouter une expérience</h1>
        <p>* champs obligatoires</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <ExperienceAddForm />
      </Formik>
    </div>
  );
}
