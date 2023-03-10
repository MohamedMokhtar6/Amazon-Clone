import React from "react";
import ReactDOM from "react-dom/client";
import "./Css/index.css";
import "./Css/all.min.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalProvider from "./Context/GlobalState";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<GlobalProvider><App /></GlobalProvider>);
