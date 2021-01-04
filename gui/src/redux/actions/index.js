import React from "react";

export const saveToken = (token) => (dispatch) => {
  console.log("Saved token");

  dispatch({ type: "SAVE_TOKEN", payload: token });
};

export const login = (logged, user) => (dispatch) => {
  console.log("isLogged: ", user);

  dispatch({ type: "LOGGED_IN", payload: { logged, user } });
};
