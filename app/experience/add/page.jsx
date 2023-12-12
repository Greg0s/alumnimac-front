"use client";

import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import "../../styles/experiencePage.scss";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/utils/authContext";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { addExperience } from "@/app/utils/api";
import ExperienceAddForm from "./experienceAddForm";

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
    country: "",
    city: "",
    address: "",
    paid: false,
    compensation: 0,
    domain: "",
    not_recommended: false,
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
    addExperience(values)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-container">
      <h1>Ajouter une expérience</h1>
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
