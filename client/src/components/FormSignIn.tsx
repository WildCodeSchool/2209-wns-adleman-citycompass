import React from "react";
import { Formik, Field, Form, FieldAttributes } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useGetProfileQuery, useLoginMutation } from "../gql/generated/schema";
import { UserLogin } from "../gql/generated/schema";
import { validateEmailLogin, validatePasswordLogin } from "../utils/validation";

interface FormSignInProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormSignUp({ isLogin, setIsLogin }: FormSignInProps) {
  const navigate = useNavigate();

  const [logInUser] = useLoginMutation();

  const { client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const handleSignIn = (values: UserLogin) => {
    logInUser({
      variables: { data: { email: values.email, password: values.password } },
    })
      .then(client.resetStore)
      .then((res) => {
        if (res !== null) {
          const userId = res[0].data.profile.id;
          toast.success("Connexion réussie");
          navigate(`/dashboard/${userId}`);
        }
      })
      .catch(() => toast.error("Données de connexion invalides"));
  };

  return (
    <div>
      <h4 className="text-center">Me connecter</h4>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => handleSignIn(values)}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col">
            <label className="modal__input--label" htmlFor="email">
              Email
            </label>
            <Field
              name="email"
              validate={validateEmailLogin}
              placeholder="email"
              className={`modal__input shadow shadow-green mb-4 ${
                errors.email && touched.email ? "border-red" : "border-current"
              }`}
            ></Field>
            {errors.email && touched.email && (
              <div className="text-red">{errors.email}</div>
            )}
            <label className="modal__input--label" htmlFor="password">
              Password
            </label>
            <Field name="password" validate={validatePasswordLogin}>
              {({
                field,
                form: { touched, errors },
                meta,
              }: FieldAttributes<any>) => (
                <>
                  <input
                    type="password"
                    placeholder="password"
                    {...field}
                    className={`modal__input shadow shadow-green mb-4 ${
                      errors.password && touched.password
                        ? "border-red"
                        : "border-current"
                    }`}
                  />
                  {touched && errors && (
                    <div className="text-red">{meta.error}</div>
                  )}
                </>
              )}
            </Field>
            <button
              className="modal__input--label text-xs"
              onClick={(e) => {
                setIsLogin(!isLogin);
              }}
            >
              Créer un compte
            </button>
            <button type="submit" className="button--primary mt-6">
              Enregistrer
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormSignUp;
