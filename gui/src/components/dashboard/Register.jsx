import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  RegisterLoginWrapper,
  WelcomeWidgetHello,
} from "../util/AgileStyledComponents";
import { Button, Checkbox, Form, Image, Message } from "semantic-ui-react";
import { Formik, Field, ErrorMessage } from "formik";
import { createAccount, getToken } from "../util/endpoints";
import { connect } from "react-redux";
import { saveToken, login } from "../../redux/actions";
import Spinner from 'react-bootstrap/Spinner'

const Register = (props) => {
  const [submitting, isSubmitting] = useState(false);

  return (
    <RegisterLoginWrapper style={{ height: "62vh" }}>
      {submitting === true ? (
        <div style={{ margin: "auto auto" }}>
          <Spinner animation="border" size="lg" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Image
            src={require("../../assets/images/agile-logo.png")}
            size="mini"
            avatar
            style={{ width: "5vw", height: "10vh", margin: "5vh auto" }}
          />
          <WelcomeWidgetHello
            style={{ margin: "0 auto", fontSize: "25px", color: "black" }}
          >
            Register
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
            onSubmit={async (values, { setSubmitting }) => {

              isSubmitting(true);

              const user = await createAccount(values, "USER");

              const credentials = {
                username: `${values.username}`,
                password: `${values.password}`,
              };

              const result = await getToken(credentials);

              props.saveToken(result.data.token);
              props.login(true, values);

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
                <Button.Group
                  size="large"
                  style={{ width: "12vw", margin: "10px auto" }}
                >
                  <Button
                    color="orange"
                    onClick={() => props.setAction("Login")}
                  >
                    Back
                  </Button>
                  <Button.Or />
                  <Button
                    type="submit"
                    color="instagram"
                    disabled={isSubmitting}
                  >
                    Register
                  </Button>
                </Button.Group>
              </Form>
            )}
          </Formik>
        </>
      )}
    </RegisterLoginWrapper>
  );
};

export default connect(null, { saveToken, login })(Register);
