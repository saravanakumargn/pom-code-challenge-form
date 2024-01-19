import { SubmitHandler } from "react-hook-form";
import { UserFormData } from "../types/User";

export enum UserFormFields {
  FirstName = "firstName",
  LastName = "lastName",
}

export function getUserFormDefaultValues() {
  return {
    [UserFormFields.FirstName]: "",
    [UserFormFields.LastName]: "",
  };
}

export const onUserFormSubmit: SubmitHandler<UserFormData> = (
  data: UserFormData
) => {
  console.log(data);
};
