import { User } from "../gql/generated/schema";

export const isAccessAuthorized = (
  currentUser: any,
  userToUpdate: User
): boolean => {
  if (currentUser.role === "superadmin") return true;
  if (
    currentUser.role === "admin" &&
    (userToUpdate.role === "contributor" || userToUpdate.role === "visitor")
  )
    return true;
  return false;
};
