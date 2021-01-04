import React, { useState } from "react";
import PropTypes from "prop-types";
import Login from "./Login";
import Register from "./Register";

const RegisterLogin = (props) => {
  const [action, setAction] = useState("Login");

  const useAuthorized = () => {};

  return action === "Login" ? (
    <Login setAction={setAction} />
  ) : action === "Register" ? (
    <Register setAction={setAction} />
  ) : (
    <div />
  );
};

export default RegisterLogin;
