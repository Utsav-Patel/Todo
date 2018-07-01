import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

const URL = "http://localhost:3000/addTodo";
ReactDOM.render(<App URL={URL} />, document.getElementById("root"));
