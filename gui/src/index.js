import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "./App";
import thunk from "redux-thunk";

// const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(<App />, document.getElementById("root"));
