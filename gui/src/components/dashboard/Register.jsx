import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Button, Form, Image } from "semantic-ui-react";
import { login, saveToken } from "../../redux/actions";
import {
  RegisterLoginWrapper,
  WelcomeWidgetHello,
} from "../util/AgileStyledComponents";
import { createAccount } from "../util/endpoints";

const Register = (props) => {
  const [submitting, isSubmitting] = useState(false);

  const { addToast } = useToasts();

  const authenticate = async (values, setSubmitting) => {
    try {
      await createAccount(values, "USER");

      const credentials = {
        username: `${values.username}`,
        password: `${values.password}`,
      };

      const adminToken = await axios.post(
        `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/jwt/authenticate`,
        credentials
      );

      const centralToken = await axios.post(
        `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/jwt/authenticate`,
        credentials
      );

      return { adminToken, centralToken };
    } catch (e) {
      addToast("User already exists!", {
        appearance: "error",
      });
      setSubmitting(false);
      isSubmitting(false);
    }
  };

  return (
    <RegisterLoginWrapper
      style={{
        height: "65vh",
        marginTop: props.accountModal !== undefined && "0vh",
        boxShadow: props.accountModal !== undefined && "none",
      }}
    >
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

              let { adminToken, centralToken } = await authenticate(
                values,
                setSubmitting
              );

              props.saveToken(adminToken.data.token, centralToken.data.token);
              props.login(true, values);

              addToast("Registration successfull!", {
                appearance: "success",
              });

              setSubmitting(false);
              isSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
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
                <Button.Group size="mini" style={{ margin: "0px auto" }}>
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
