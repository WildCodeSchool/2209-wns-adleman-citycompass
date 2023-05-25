// FormSignIn
export function validateEmailLogin(email: string) {
    let error;
    if (!email) {
      error = "L'email est obligatoire";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error = "Adresse email invalide";
    }
    return error;
  }
  
export function validatePasswordLogin(password: string) {
    let error;
    if (!password) {
      error = "Le mot de passe est obligatoire";
    }
    return error;
  }