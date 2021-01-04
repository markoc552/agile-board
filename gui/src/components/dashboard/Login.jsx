import React from "react";
import PropTypes from "prop-types";
import {
  RegisterLoginWrapper,
  WelcomeWidgetHello,
} from "../util/AgileStyledComponents";
import { Button, Checkbox, Form, Image, Message } from "semantic-ui-react";
import { Formik, Field, ErrorMessage } from "formik";

const Login = (props) => {
  return (
    <RegisterLoginWrapper>
      <Image
        src={require("../../assets/images/agile-logo.png")}
        size="mini"
        avatar
        style={{ width: "5vw", height: "10vh", margin: "5vh auto" }}
      />
      <WelcomeWidgetHello
        style={{ margin: "0 auto", fontSize: "25px", color: "black" }}
      >
        Login
      </WelcomeWidgetHello>
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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
            <Button.Group
              size="large"
              style={{ width: "12vw", margin: "10px auto" }}
            >
              <Button color="orange" onClick={() => props.setAction("Register")}>Register</Button>
              <Button.Or />
              <Button type="submit" color="instagram" disabled={isSubmitting}>
                Login
              </Button>
            </Button.Group>
          </Form>
        )}
      </Formik>
    </RegisterLoginWrapper>
  );
};

export default Login;
