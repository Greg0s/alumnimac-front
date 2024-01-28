import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { getMe, signIn } from "../utils/api";

import { useContext } from "react";
import { AuthContext } from "../utils/authContext";

import { useRouter } from "next/navigation";

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
    <div className="sign-in-container">
      <h1>Se connecter</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
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
          <button type="submit">Se connecter</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignInForm;
