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
