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

const Login = (props) => {
  const [submitting, isSubmitting] = useState(false);

  const { addToast } = useToasts();

  const login = (
    adminToken,
    centralToken,
    username,
    setSubmitting,
    isSubmitting
  ) =>
    axios
      .get(`${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/getUserInfo`, {
        headers: {
          Authorization: `Bearer ${adminToken.data.token}`,
        },
        params: {
          username: username,
        },
      })
      .then((res) => {
        props.saveToken(adminToken.data.token, centralToken.data.token);
        props.login(true, res.data);
        addToast("Login successfull!", {
          appearance: "success",
        });

        setSubmitting(false);
        isSubmitting(false);
      });

  const authenticate = async (values, setSubmitting, isSubmitting) => {
    try {
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
      addToast("Username/Password incorrect!", {
        appearance: "error",
      });
      setSubmitting(false);
      isSubmitting(false);
    }
  };

  return (
    <RegisterLoginWrapper
      style={{
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
            Login
          </WelcomeWidgetHello>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              isSubmitting(true);

              let { adminToken, centralToken } = await authenticate(
                values,
                setSubmitting,
                isSubmitting
              );

              login(
                adminToken,
                centralToken,
                values.username,
                setSubmitting,
                isSubmitting
              );
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
                <Button.Group size="mini" style={{ margin: "10px auto" }}>
                  <Button
                    color="orange"
                    onClick={() => props.setAction("Register")}
                  >
                    Register
                  </Button>
                  <Button.Or />
                  <Button
                    type="submit"
                    color="instagram"
                    disabled={isSubmitting}
                  >
                    Login
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

export default connect(null, { login, saveToken })(Login);
