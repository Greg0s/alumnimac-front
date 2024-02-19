import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { getMe, signIn } from "../utils/api";

import { useContext } from "react";
import { AuthContext } from "../utils/authContext";

import { useRouter } from "next/navigation";

import "@/app/styles/form.scss";

const SignInForm = () => {
  const router = useRouter();

  const { setAuthState, setCurrentUser } = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Adresse e-mail invalide")
      .required("E-mail requis"),
    password: Yup.string().required("Mot de passe requis"),
  });

  const handleSubmit = async (values) => {
    signIn(values.email, values.password)
      .then((userCredential) => {
        setAuthState(userCredential.jwt);
        localStorage.setItem("token", userCredential.jwt);
        localStorage.setItem("userId", userCredential.user.id);
        router.push("/");
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
          <label>E-mail</label>
          <ErrorMessage
            className="form__field__error"
            name="email"
            component="div"
          />
          <Field type="email" name="email" />
        </div>
        <div className="form__field">
          <label>Mot de passe</label>{" "}
          <ErrorMessage
            className="form__field__error"
            name="password"
            component="div"
          />
          <Field type="password" name="password" />
        </div>
        <button className="btn btn--primary" type="submit">
          Se connecter
        </button>
      </Form>
    </Formik>
  );
};

export default SignInForm;
