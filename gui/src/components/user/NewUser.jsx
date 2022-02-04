import Axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Message, Select } from "semantic-ui-react";
import { FormikWrapper, Headline } from "../util/AgileStyledComponents";

const roles = [
  { value: "admin", text: "ADMIN" },
  { value: "user", text: "USER" },
];

const NewUser = (props) => {
  const [submitting, isSubmitting] = useState(false);
  const [successfull, setSuccesfull] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const createUser = (values, setSubmitting) =>
    Axios.post(
      `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/createUser`,
      { ...values },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
        setSubmitting(false);
        isSubmitting(false);
        setSuccesfull(true);
      })
      .catch((err) => console.log(err));

  return (
    <div>
      <Headline>Register new user</Headline>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormikWrapper style={{ padding: "50px" }}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              isSubmitting(true);

              setTimeout(() => createUser(values, setSubmitting), 2000);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form
                style={{
                  width: "17vw",
                  margin: "5vh auto",
                  display: "flex",
                  flexDirection: "column",
                }}
                onSubmit={handleSubmit}
                size="large"
              >
                <input
                  style={{ margin: "10px 0" }}
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <input
                  style={{ margin: "10px 0" }}
                  name="firstname"
                  placeholder="Firstname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                />
                <input
                  style={{ margin: "10px 0" }}
                  name="lastname"
                  placeholder="Lastname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                />
                <input
                  style={{ margin: "10px 0" }}
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <Select
                  placeholder="Select role"
                  name="role"
                  onChange={(value) =>
                    setFieldValue("role", value.target.innerText)
                  }
                  onBlur={handleBlur}
                  options={roles}
                />
                <Button
                  type="submit"
                  color="blue"
                  style={{ marginTop: "25px" }}
                  disabled={isSubmitting}
                  loading={submitting}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </FormikWrapper>
        {successfull && (
          <Message color="green" style={{ width: "25vw", height: "10vh" }}>
            <Message.Header>Successfull</Message.Header>
            <p
              style={{ fontSize: "15px", marginTop: "10px", color: "#253858" }}
            >
              User has been successfully created! Please authorize this user.
            </p>
          </Message>
        )}
      </div>
    </div>
  );
};

export default NewUser;
