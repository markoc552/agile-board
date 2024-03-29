import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const RegisterLogin = (props) => {
  const [action, setAction] = useState("Login");

  return action === "Login" ? (
    <Login accountModal={props.accountModal} setAction={setAction} />
  ) : action === "Register" ? (
    <Register accountModal={props.accountModal} setAction={setAction} />
  ) : (
    <div />
  );
};

export default RegisterLogin;
