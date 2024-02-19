import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { signUp } from "../utils/api";

import "@/app/styles/form.scss";

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
    graduationYear: Yup.number().required("Année de la promo requise"),
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
      .finally(() => {
        getCurrentUserData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCurrentUserData = async () => {
    setCurrentUser(await getMe());
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="form">
        <div className="form__field">
          <label>Prénom</label>
          <ErrorMessage
            className="form__field__error"
            name="firstName"
            component="div"
          />
          <Field type="text" name="firstName" />
        </div>
        <div className="form__field">
          <label>Nom</label>
          <ErrorMessage
            className="form__field__error"
            name="lastName"
            component="div"
          />
          <Field type="text" name="lastName" />
        </div>
        <div className="form__field">
          <label>Année de la promo</label>
          <ErrorMessage
            className="form__field__error"
            name="graduationYear"
            component="div"
          />
          <Field type="number" name="graduationYear" />
        </div>
        <div className="form__field">
          <label>E-mail</label>
          <ErrorMessage
            className="form__field__error"
            name="email"
            component="div"
          />
          <Field type="email" name="email" />
        </div>
        <div className="form__field">
          <label>Mot de passe</label>
          <ErrorMessage
            className="form__field__error"
            name="password"
            component="div"
          />
          <Field type="password" name="password" />
        </div>
        <button className="btn btn--primary" type="submit">
          S'inscrire
        </button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
