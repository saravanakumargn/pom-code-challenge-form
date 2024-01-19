import { Layout } from "antd";
import { useForm } from "react-hook-form";
import {
  UserFormFields,
  getUserFormDefaultValues,
  onUserFormSubmit,
} from "./UserFormUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../components/form/Input";
import { UserFormData } from "../types/User";

const { Header, Footer, Content } = Layout;

const styles = {
  layout: {
    height: "100vh",
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
  },
};

const schema = yup.object().shape({
  [UserFormFields.FirstName]: yup.string().trim().required('You need to enter a first name.'),
  [UserFormFields.LastName]: yup.string().trim().required('You need to enter a last name.'),
});

function UserForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: getUserFormDefaultValues(),
    resolver: yupResolver(schema),
  });

  return (
    <Layout style={styles.layout}>
      <Header>Header</Header>
      <Content style={styles.content}>
        <form onSubmit={handleSubmit(onUserFormSubmit)}>
          {Object.keys(errors).length > 0 && (
            <div style={{ color: "red" }}>
              {Object.entries(errors).map(([key, value]) => (
                <p key={key}>{value.message}</p>
              ))}
            </div>
          )}
          <Input
            control={control}
            label="First name"
            name={UserFormFields.FirstName}
          />
          <Input
            control={control}
            label="Last name"
            name={UserFormFields.LastName}
          />
          <input type="submit" />
        </form>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default UserForm;
