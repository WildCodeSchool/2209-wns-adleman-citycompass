// Categories validations

export function validateName(name: string) {
  let error;
  if (!name) {
    error = "Le nom est obligatoire";
  } else if (name.length < 2) {
    error = "Le nom doit avoir au moins 2 caractères";
  } else if (name.trim() === "") {
    error = "Le nom est invalide";
  }
  return error;
}

export function validatePicto(picto: string) {
  let error;
  if (!picto) {
    error = "Le pictogramme est obligatoire";
  } else if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(picto)) {
    error = "Le pictogramme doit être une URL";
  }
  return error;
}

// FormSignUp
export function validateLastname(lastname: string) {
  let error;
  if (!lastname) {
    error = "Le nom est obligatoire";
  } else if (lastname.length < 2) {
    error = "Le nom doit avoir au moins 2 caractères";
  } else if (lastname.length > 50) {
    error = "Le nom doit avoir moins de 50 caractères";
  } else if (lastname.trim() === "") {
    error = "Le nom est invalide";
  }
  return error;
}

export function validateFirstname(firstname: string) {
  let error;
  if (!firstname) {
    error = "Le prénom est obligatoire";
  } else if (firstname.length < 2) {
    error = "Le prénom doit avoir au moins 2 caractères";
  } else if (firstname.length > 50) {
    error = "Le prénom doit avoir moins de 50 caractères";
  } else if (firstname.trim() === "") {
    error = "Le prénom est invalide";
  }
  return error;
}

export function validateAvatar(picture: string) {
  let error;
  if (!picture) {
    error = "L'avatar est obligatoire";
  } else if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(picture)) {
    error = "L'avatar doit être une URL";
  }
  return error;
}

export function validateEmail(email: string) {
  let error;
  if (!email) {
    error = "L'email est obligatoire";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    error = "Adresse email invalide";
  }
  return error;
}

export function validatePassword(password: string) {
  let error;
  if (!password) {
    error = "Le mot de passe est obligatoire";
  } else if (password.length < 8) {
    error = "Le mot de passe doit avoir au moins 8 caractères";
  } else if (password.length > 255) {
    error = "Le mot de passe doit avoir moins de 255 caractères";
  }
  return error;
}

// FormSignIn

// validate email is the same that for FormSignUp

export function validatePasswordLogin(password: string) {
  let error;
  if (!password) {
    error = "Le mot de passe est obligatoire";
  }
  return error;
}

