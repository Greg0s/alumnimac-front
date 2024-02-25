import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
// Form dependencies
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// API
import { getMe, signIn } from "@/utils";
// Context
import { AuthContext } from "@/context";
// Utils
import { translate } from "@/utils/functions";
// Style
import "@/styles/form.scss";

export function SignInForm() {
  const router = useRouter();

  const { setAuthState, setCurrentUser } = useContext(AuthContext);

  const [serverError, setServerError] = useState(null);

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
      .then(async (userCredential) => {
        if (userCredential) {
          setAuthState(userCredential.jwt);
          localStorage.setItem("token", userCredential.jwt);
          localStorage.setItem("userId", userCredential.user.id);
          setCurrentUser(await getMe());
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setServerError(
          error || "Une erreur s'est produite lors de l'inscription."
        );
      });
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

        {serverError && (
          <div className="form__error">{translate("error", serverError)}</div>
        )}

        <button className="btn btn--primary" type="submit">
          Se connecter
        </button>
      </Form>
    </Formik>
  );
}

export default SignInForm;
