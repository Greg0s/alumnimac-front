"use client";

import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import "@/app/styles/experiencePage.scss";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/utils/authContext";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { addExperience } from "@/app/utils/api";
import ExperienceAddForm from "./experienceAddForm";
import "@/app/styles/experienceAddEdit.scss";

const ExperienceAdd = () => {
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
};

export default ExperienceAdd;
