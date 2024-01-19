import { UserFormData } from "../types/User";
import { Dispatch, SetStateAction } from "react";

export enum UserFormFields {
  FirstName = "firstName",
  LastName = "lastName",
  FavoriteFilm = "favoriteFilm",
}

export function getUserFormDefaultValues() {
  return {
    [UserFormFields.FirstName]: "",
    [UserFormFields.LastName]: "",
  };
}

export const onUserFormSubmit = async (
  data: UserFormData,
  setIsFormSubmitting: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setIsFormSubmitting(true);
    alert(JSON.stringify(data, null, 2));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsFormSubmitting(false);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
