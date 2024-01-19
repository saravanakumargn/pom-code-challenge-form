import React from "react";
import { Select, SelectProps, Typography } from "antd";
import { useAllFilms } from "../hooks/useAllFilms";
import { Control, useController } from "react-hook-form";
import { UserFormData } from "../types/User";

const { Option } = Select;
const { Text } = Typography;

type FilmChooserProps = SelectProps & {
  control: Control<UserFormData>;
  name: keyof UserFormData;
};

const FilmChooser: React.FC<FilmChooserProps> = ({
  control,
  name,
  ...rest
}) => {
  const { data: films, isLoading, error } = useAllFilms();
  const { field } = useController({
    name,
    control,
  });

  return (
    <div>
      <Text>Favorite star Wars movie</Text>
      <Select
        status={error ? "error" : undefined}
        style={{
          width: "100%",
        }}
        placeholder="Favorite star Wars movie"
        loading={isLoading}
        {...rest}
        {...field}
      >
        {films?.map(({ id, title }) => (
          <Option key={id} value={title}>
            {title}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default FilmChooser;
