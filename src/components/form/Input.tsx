import { FC, memo } from "react";
import { Control, useController } from "react-hook-form";
import { Input as AntInput, InputProps } from "antd";
import { UserFormData } from "../../types/User";

type Props = InputProps & {
  control: Control<UserFormData>;
  name: keyof UserFormData;
  label: string;
};

export const Input: FC<Props> = memo(({ control, name, ...rest }) => {
  const { field } = useController({
    name,
    control,
  });

  return <AntInput {...rest} {...field} />;
});
