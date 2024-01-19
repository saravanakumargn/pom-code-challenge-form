import { FC, memo } from "react";
import { Control, useController } from "react-hook-form";
import { Input as AntInput, InputProps, Typography } from "antd";
import { UserFormData } from "../../types/User";

const { Text } = Typography;

type Props = InputProps & {
  control: Control<UserFormData>;
  name: keyof UserFormData;
  label?: string;
};

export const Input: FC<Props> = memo(
  ({ control, name, label = null, ...rest }) => {
    const { field } = useController({
      name,
      control,
    });

    return (
      <div>
        {label && (
          <span>
            <Text>{label}</Text>
            <span style={{ color: "#EF0008", marginLeft: 4 }}>*</span>
          </span>
        )}
        <AntInput {...rest} {...field} />
      </div>
    );
  }
);
