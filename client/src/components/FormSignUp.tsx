import React from "react";
import { Formik, Field, Form, FieldAttributes } from "formik";
import { UserInput, useCreateUserMutation } from "../gql/generated/schema";
import { toast } from "react-hot-toast";
import {
  validateAvatar,
  validateEmail,
  validateFirstname,
  validateLastname,
  validatePassword,
} from "../utils/formValidator";

interface FormSignUpProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormSignUp({ isLogin, setIsLogin }: FormSignUpProps) {
  const [createUser] = useCreateUserMutation({
    errorPolicy: "all",
  });

  const handleSignUp = (values: UserInput) => {
    createUser({
      variables: {
        data: {
          lastname: values.lastname,
          firstname: values.firstname,
          picture: values.picture,
          email: values.email,
          password: values.password,
        },
      },
    }).then((res) => {
      if (res.errors) {
        res.errors.forEach(({ message }) => {
          if (message === "User email already found in database") {
            toast.error("L'email existe déjà");
          } else {
            toast.error(message);
          }
        });
      } else if (res.errors === undefined) {
        toast.success("Inscription completée");
        setIsLogin(!isLogin);
      }
    });
  };

  return (
    <div>
      <h4 className="text-center">Créer un compte</h4>
      <Formik
        initialValues={{
          lastname: "",
          firstname: "",
          picture: "",
          email: "",
          password: "",
        }}
        onSubmit={(values) => handleSignUp(values)}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col">
            <label className="modal__input--label" htmlFor="nom">
              Nom
            </label>
            <Field
              data-test-id="lastname"
              name="lastname"
              validate={validateLastname}
              placeholder="Nom"
              className={`modal__input shadow shadow-green mb-4 ${
                errors.lastname && touched.lastname
                  ? "border-red"
                  : "border-current"
              }`}
            ></Field>
            {errors.lastname && touched.lastname && (
              <div className="text-red">{errors.lastname}</div>
            )}
            <label className="modal__input--label" htmlFor="prenom">
              Prénom
            </label>
            <Field
              data-test-id="firstname"
              name="firstname"
              validate={validateFirstname}
              placeholder="Prénom"
              className={`modal__input shadow shadow-green mb-4 ${
                errors.firstname && touched.firstname
                  ? "border-red"
                  : "border-current"
              }`}
            ></Field>
            {errors.firstname && touched.firstname && (
              <div className="text-red">{errors.firstname}</div>
            )}
            <label className="modal__input--label" htmlFor="picture">
              Avatar
            </label>
            <Field
              data-test-id="picture"
              name="picture"
              validate={validateAvatar}
              placeholder="https://mon-avatar.net"
              className={`modal__input shadow shadow-green mb-4 ${
                errors.picture && touched.picture
                  ? "border-red"
                  : "border-current"
              }`}
            ></Field>
            {errors.picture && touched.picture && (
              <div className="text-red">{errors.picture}</div>
            )}
            <label className="modal__input--label" htmlFor="email">
              Email
            </label>
            <Field
              data-test-id="email"
              name="email"
              validate={validateEmail}
              placeholder="monmail@email.fr"
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
            <Field
              data-test-id="password"
              name="password"
              validate={validatePassword}
            >
              {({
                field,
                form: { touched, errors },
                meta,
              }: FieldAttributes<any>) => (
                <>
                  <input
                    data-test-id="password"
                    type="password"
                    placeholder="Mot de passe"
                    {...field}
                    className={`modal__input shadow shadow-green mb-4 ${
                      errors.password && touched.password
                        ? "border-red"
                        : "border-current"
                    }`}
                  />
                  {touched.password && errors.password && (
                    <div className="text-red">{meta.error}</div>
                  )}
                </>
              )}
            </Field>
            <div
              className="modal__input--label text-xs text-center cursor-pointer"
              onClick={() => {
                setIsLogin(!isLogin);
              }}
            >
              Se connecter
            </div>
            <button type="submit" data-test-id="register" className="button--primary mt-6">
              Enregistrer
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormSignUp;
