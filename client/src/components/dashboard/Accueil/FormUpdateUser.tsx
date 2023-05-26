import React from "react";
import { Formik, Field, Form } from "formik";
import { GetProfileDocument, UserUpdate, useUpdateUserMutation } from "../../../gql/generated/schema";
import { toast } from "react-hot-toast";
import { validateAvatar, validateEmail, validateFirstname, validateLastname } from "../../../utils/formValidator";
import { UserProps } from "./AccueilDashboard";

interface FormUpdateUserProps {
  setModifyUser:React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProps;
}

// form building with Formik https://formik.org/docs/guides/validation

export function FormUpdateUser({ user, setModifyUser }: FormUpdateUserProps) {
  const [updateUser] = useUpdateUserMutation({
    errorPolicy: "all",
  });

  const handleSubmit = (values: UserUpdate) => {
    updateUser({
      variables: {
        data: {
          lastname: values.lastname,
          firstname: values.firstname,
          picture: values.picture,
          email: values.email,
        },
        updateUserId: user.id,
      },
      refetchQueries: [{ query: GetProfileDocument }],
    }).then((res) => {
      if (res.errors) {
        res.errors.forEach(({ message }) => {
        toast.error(message);
        });
      }
      toast.success("Données enregistrée");
      setModifyUser(false)
    });
  };
  
  return (
    <div className="container mx-auto p-6 bg-cream flex flex-col">
      <h3 className="type-h3 text-center">Données personnelles</h3>
      <Formik
        initialValues={{
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          picture: user.picture,
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col">
            <label className="modal__input--label" htmlFor="nom">
              Nom
            </label>
            <Field
              name="lastname"
              validate={validateLastname}
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
            <button type="submit" className="button--primary mt-6">
              Enregistrer
            </button>
            <div
              className="modal__input--label text-s mt-3 text-center cursor-pointer"
              onClick={() => {
                setModifyUser(false)
              }}
            >
              Annuler
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
