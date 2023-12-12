"use client";

import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import "../../styles/experiencePage.scss";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/utils/authContext";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ExperienceAddForm = () => {
  const router = useRouter();
  const { authState } = useContext(AuthContext);

  const formikContext = useFormikContext();
  const { values } = formikContext;

  if (!authState) router.push("/");

  console.log(authState);

  return (
    <Form>
      {/* POSITION */}
      <div className="field">
        <label>Poste occupé</label>
        <Field
          type="text"
          name="position"
          placeholder="Ex : Développeur web front end"
        />
        <ErrorMessage name="position" component="div" />
      </div>
      {/* COMPANY */}
      <div className="field">
        <label>Entreprise</label>
        <Field type="text" name="company" placeholder="Ex : Ubisoft" />
        <ErrorMessage name="company" component="div" />
      </div>
      {/* TYPE */}
      <div className="field">
        <label>Type</label>
        <Field as="select" name="type">
          <option value="">Choisir un type</option>

          <option value="internship">Stage</option>
          <option value="job">Emploi</option>
          <option value="other">Autre</option>
        </Field>
        <ErrorMessage name="type" component="div" />
      </div>
      {/* START DATE */}
      <div className="field">
        <label>Date de début</label>
        <Field name="startDate">
          {({ field, form }) => (
            <DatePicker
              id="datePicker"
              selected={field.value}
              onChange={(date) => form.setFieldValue("startDate", date)}
              dateFormat="dd/MM/yyyy"
            />
          )}
        </Field>
        <ErrorMessage name="startDate" component="div" />
      </div>
      {/* ONGOING? */}
      <div className="field">
        <label>
          <Field type="checkbox" name="ongoing" />
          Cette expérience n'est pas finie et je ne connais pas la date de fin
        </label>
      </div>
      {/* END DATE */}
      <div className="field">
        <label>Date de fin</label>
        <Field name="endDate">
          {({ field, form }) => (
            <DatePicker
              id="datePicker"
              selected={field.value}
              onChange={(date) => form.setFieldValue("endDate", date)}
              dateFormat="dd/MM/yyyy"
              disabled={form.values.ongoing}
            />
          )}
        </Field>
        <ErrorMessage name="endDate" component="div" />
      </div>
      {/* WORK MODE */}
      <div className="field">
        <label>Mode de travail</label>
        <Field as="select" name="workMode">
          <option value="">Choisir un mode</option>
          <option value="on_site">Présentiel</option>
          <option value="remote">Distantiel</option>
          <option value="hybrid">Hybride</option>
        </Field>
        <ErrorMessage name="workMode" component="div" />
      </div>
      {/* COUNTRY */}
      <div className="field">
        <label>Pays</label>
        <Field type="text" name="country" placeholder="Ex : France" />
        <ErrorMessage name="country" component="div" />
      </div>
      {/* CITY */}
      <div className="field">
        <label>Ville</label>
        <Field type="text" name="city" placeholder="Ex : Champs-sur-Marne" />
        <ErrorMessage name="city" component="div" />
      </div>
      {/* ADDRESS */}
      <div className="field">
        <label>Adresse</label>
        <Field type="text" name="address" placeholder="Ex : 5 Bd Descartes" />
        <ErrorMessage name="address" component="div" />
      </div>
      {/* PAID? */}
      <div className="field">
        <label>
          <Field type="checkbox" name="paid" />
          Cette expérience {values.ongoing ? "est " : "était "}
          rémunérée
        </label>
      </div>
      {/* COMPENSATION */}
      {values.paid && (
        <div className="field">
          <label>Rémunération (€/mois)</label>

          <Field
            type="number"
            name="compensation"
            placeholder="Ex : 600"
            // disabled={values.paid}
          />

          <ErrorMessage name="compensation" component="div" />
        </div>
      )}
      {/* DOMAIN */}
      <div className="field">
        <label>Domaine</label>
        <Field as="select" name="domain">
          <option value="">Choisir un domaine</option>
          <option value="on_site">Audiovisuel</option>
          <option value="remote">Gestion de projet</option>
          <option value="hybrid">Programmation</option>
          <option value="hybrid">Dev web / mobile</option>
          <option value="other">Autre</option>
        </Field>
        <ErrorMessage name="domain" component="div" />
      </div>
      {/* RECOMMENDED? */}
      <div className="field">
        <label>
          <Field type="checkbox" name="not_recommended" />
          Je ne recommande pas cette expérience
        </label>
      </div>
      {/* DESCRIPTION */}
      <div className="field">
        <label>Description</label>
        <Field type="text" name="description" />
        <ErrorMessage name="description" component="div" />
      </div>
      <button type="submit">Valider</button>
    </Form>
  );
};

export default ExperienceAddForm;
