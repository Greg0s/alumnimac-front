import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { signUp } from "../utils/api";

const SignUpForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    graduationYear: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Prénom requis"),
    lastName: Yup.string().required("Nom requis"),
    graduationYear: Yup.number().required("Année de promo requise"),
    email: Yup.string()
      .email("Adresse e-mail invalide")
      .required("E-mail requis"),
    password: Yup.string().required("Mot de passe requis"),
  });

  const handleSubmit = async (values) => {
    signUp(
      values.firstName,
      values.lastName,
      values.graduationYear,
      values.email,
      values.password
    )
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-up-container">
      <h1>S'inscrire</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>Prénom</label>
            <Field type="text" name="firstName" />
            <ErrorMessage name="firstName" component="div" />
          </div>
          <div>
            <label>Nom</label>
            <Field type="text" name="lastName" />
            <ErrorMessage name="lastName" component="div" />
          </div>
          <div>
            <label>Année de la promo</label>
            <Field type="number" name="graduationYear" />
            <ErrorMessage name="graduationYear" component="div" />
          </div>
          <div>
            <label>E-mail</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>Mot de passe</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">S'inscrire</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpForm;
