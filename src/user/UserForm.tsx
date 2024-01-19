import { Button, Col, Layout, Row, Space, Typography } from "antd";
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
import FilmChooser from "../components/FilmChooser";
import { useCallback, useState } from "react";

const { Footer, Content } = Layout;

const { Title, Text } = Typography;

const styles = {
  layout: {
    height: "100vh",
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
    backgroundColor: "#FFFFFF",
  },
};

const schema = yup.object().shape({
  [UserFormFields.FirstName]: yup
    .string()
    .trim()
    .required("You need to enter a first name."),
  [UserFormFields.LastName]: yup
    .string()
    .trim()
    .required("You need to enter a last name."),
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

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const onSubmit = useCallback(async (data: UserFormData) => {
    const result = await onUserFormSubmit(data, setIsFormSubmitting);
    console.log(result);
    setIsFormSubmitted(result);
  }, []);

  const onFormSubmit = useCallback(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  return (
    <Layout style={styles.layout}>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          paddingLeft: 16,
        }}
      >
        <Title
          level={4}
          style={{
            color: "#194054",
          }}
        >
          My form
        </Title>
      </div>
      <Content style={styles.content}>
        {isFormSubmitted ? (
          <div
            style={{
              color: "#194053",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Thanks for submitting the form!
          </div>
        ) : (
          <>
            {Object.keys(errors).length > 0 && (
              <Space
                direction="vertical"
                style={{
                  margin: 16,
                }}
              >
                {Object.entries(errors).map(([key, value]) => (
                  <Text type="danger" key={key}>
                    {value.message}
                  </Text>
                ))}
              </Space>
            )}
            <Row gutter={[0, 16]}>
              <Col xs={24} md={12} className="row-padding">
                <Input
                  control={control}
                  label="First name"
                  name={UserFormFields.FirstName}
                />
              </Col>
              <Col xs={24} md={12} className="row-padding">
                <Input
                  control={control}
                  label="Last name"
                  name={UserFormFields.LastName}
                />
              </Col>
              <Col xs={24} md={12} className="row-padding">
                <FilmChooser
                  control={control}
                  name={UserFormFields.FavoriteFilm}
                />
              </Col>
            </Row>
          </>
        )}
      </Content>
      <Footer
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        {!isFormSubmitted && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="primary"
              loading={isFormSubmitting}
              onClick={onFormSubmit}
            >
              Submit
            </Button>
          </div>
        )}
      </Footer>
    </Layout>
  );
}

export default UserForm;
