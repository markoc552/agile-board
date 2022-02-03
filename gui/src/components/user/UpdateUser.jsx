import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Divider, Form } from "semantic-ui-react";
import { FormikWrapper, Headline } from "../util/AgileStyledComponents";

const NewUser = (props) => {
  const [submitting, isSubmitting] = useState(false);

  return (
    <div>
      <Headline>Register new user</Headline>
      <FormikWrapper style={{ paddingLeft: "55px" }}>
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

            setSubmitting(false);
            isSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
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
              <Button
                type="submit"
                color="instagram"
                style={{ marginTop: "25px" }}
                disabled={isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </FormikWrapper>
      <Divider style={{ marginLeft: "7vw", height: "35vh" }} vertical>
        And
      </Divider>
    </div>
  );
};

export default NewUser;
