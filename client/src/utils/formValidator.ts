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

export function validatePicture(picture: string) {
  let error;
  if (!picture) {
    error = "L'image est obligatoire";
  } else if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(picture)) {
    error = "L'image doit être une URL";
  }
  return error;
}

export function validateDescription(description: string) {
  let error;
  if (!description) {
    error = "La description est obligatoire";
  } else if (description.length < 10) {
    error = "La description doit faire au moins 10 caractères";
  }
  return error;
}

export function validateLatitude(latitude: string) {
  let error;
  if (!latitude) {
    error = "La latitude est obligatoire";
  } else if (!/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/.test(latitude)) {
    error = "La donnée doit être une latitude";
  }
  return error;
}

export function validateLongitude(longitude: string) {
  let error;
  if (!longitude) {
    error = "La longitude est obligatoire";
  } else if (
    !/^[-+]?([1-9]?\d(\.\d+)?|1[0-7]\d(\.\d+)?|180(\.0+)?)$/.test(longitude)
  ) {
    error = "La donnée doit être une longitude";
  }
  return error;
}
