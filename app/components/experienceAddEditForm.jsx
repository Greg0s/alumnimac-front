"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
// Form dependencies
import { Form, Field, ErrorMessage, useFormikContext } from "formik";
// Datepicker dependencies
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Context
import { AuthContext } from "@/context/authContext";
// Utils
import { descrPlaceholder } from "@/utils/functions";
// Style
import "@/styles/form.scss";

export function ExperienceAddEditForm() {
  const router = useRouter();
  const { authState } = useContext(AuthContext);

  const formikContext = useFormikContext();
  const { values } = formikContext;

  if (!authState) router.push("/");

  return (
    <Form className="form">
      {/* POSITION */}
      <div className="form__field">
        <label>Poste occupé *</label>
        <ErrorMessage
          className="form__field__error"
          name="position"
          component="div"
        />
        <Field
          type="text"
          name="position"
          placeholder="Ex : Développeur web front end"
        />
      </div>
      {/* COMPANY */}
      <div className="form__field">
        <label>Entreprise *</label>
        <ErrorMessage
          className="form__field__error"
          name="company"
          component="div"
        />
        <Field type="text" name="company" placeholder="Ex : Ubisoft" />
      </div>
      {/* TYPE */}
      <div className="form__field form__field--select">
        <label>Type *</label>
        <ErrorMessage
          className="form__field__error"
          name="type"
          component="div"
        />
        <Field as="select" name="type">
          <option value="">Choisir un type</option>

          <option value="internship">Stage</option>
          <option value="job">Emploi</option>
          <option value="other">Autre</option>
        </Field>
      </div>
      {/* START DATE */}
      <div className="form__field">
        <label>Date de début *</label>
        <ErrorMessage
          className="form__field__error"
          name="startDate"
          component="div"
        />
        <Field name="startDate">
          {({ field, form }) => (
            <DatePicker
              wrapperClassName="date-picker"
              id="datePicker"
              selected={field.value}
              onChange={(date) =>
                form.setFieldValue("startDate", new Date(date))
              }
              dateFormat="dd/MM/yyyy"
              placeholderText="Ex : 06/06/2023"
            />
          )}
        </Field>
      </div>
      {/* END DATE */}
      {!values.ongoing && (
        <div className="form__field">
          <label>Date de fin</label>
          <ErrorMessage
            className="form__field__error"
            name="endDate"
            component="div"
          />

          <Field name="endDate">
            {({ field, form }) => (
              <DatePicker
                wrapperClassName="date-picker"
                id="datePicker"
                selected={field.value}
                onChange={(date) => form.setFieldValue("endDate", date)}
                dateFormat="dd/MM/yyyy"
                disabled={form.values.ongoing}
                placeholderText="Ex : 11/08/2023"
              />
            )}
          </Field>
        </div>
      )}
      {/* ONGOING? */}
      <div className="form__field form__field--checkbox">
        <Field type="checkbox" name="ongoing" />
        <label>
          Cette expérience n'est pas finie et je ne connais pas la date de fin
        </label>
      </div>
      {/* WORK MODE */}
      <div className="form__field">
        <label>Mode de travail *</label>
        <ErrorMessage
          className="form__field__error"
          name="workMode"
          component="div"
        />
        <Field as="select" name="workMode">
          <option value="">Choisir un mode</option>
          <option value="on_site">Présentiel</option>
          <option value="remote">Distanciel</option>
          <option value="hybrid">Hybride</option>
        </Field>
      </div>
      {/* ABROAD? */}
      <div className="form__field form__field--checkbox">
        <Field type="checkbox" name="abroad" />
        <label>
          Cette expérience {values.ongoing ? "est " : "était "}à l'étranger
        </label>
      </div>
      {/* COUNTRY */}
      <div className="form__field">
        <label>Pays *</label>
        <ErrorMessage
          className="form__field__error"
          name="country"
          component="div"
        />
        <Field type="text" name="country" placeholder="Ex : France" />
      </div>
      {/* CITY */}
      <div className="form__field">
        <label>Ville *</label>
        <ErrorMessage
          className="form__field__error"
          name="city"
          component="div"
        />
        <Field type="text" name="city" placeholder="Ex : Champs-sur-Marne" />
      </div>
      {/* ADDRESS */}
      <div className="form__field">
        <label>Adresse</label>
        <ErrorMessage
          className="form__field__error"
          name="address"
          component="div"
        />
        <Field type="text" name="address" placeholder="Ex : 5 Bd Descartes" />
      </div>
      {/* PAID? */}
      <div className="form__field form__field--checkbox">
        <Field type="checkbox" name="paid" />
        <label>
          Cette expérience {values.ongoing ? "est " : "était "}
          rémunérée
        </label>
      </div>
      {/* COMPENSATION */}
      {values.paid && (
        <div className="form__field">
          <label>Rémunération (€/mois)</label>
          <ErrorMessage
            className="form__field__error"
            name="compensation"
            component="div"
          />
          <Field type="number" name="compensation" placeholder="Ex : 600" />
        </div>
      )}
      {/* DOMAIN */}
      <div className="form__field">
        <label>Domaine *</label>
        <ErrorMessage
          className="form__field__error"
          name="domain"
          component="div"
        />
        <Field as="select" name="domain">
          <option value="">Choisir un domaine</option>
          <option value="audiovisual">Audiovisuel</option>
          <option value="graphic-design">Graphisme</option>
          <option value="project-management">Gestion de projet</option>
          <option value="programming">Programmation</option>
          <option value="web-dev">Dev web / mobile</option>
          <option value="other">Autre</option>
        </Field>
      </div>
      {/* RECOMMENDED? */}
      <div className="form__field form__field--checkbox">
        <Field type="checkbox" name="notRecommended" />{" "}
        <label>Je ne recommande pas cette expérience</label>
        <ErrorMessage
          className="form__field__error"
          name="description"
          component="div"
        />
      </div>
      {/* DESCRIPTION */}
      <div className="form__field form__field--textarea">
        <label>Description</label>
        <Field
          as="textarea"
          name="description"
          placeholder={descrPlaceholder}
        />
      </div>
      <button className="btn btn--primary" type="submit">
        Valider
      </button>
    </Form>
  );
}
