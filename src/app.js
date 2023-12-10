// hal hazirda sehifem varsa ve react elave etmek isteyiremse babeli script kimi add edirem
// var template = React.createElement("h1", null, "hello react app");
import React from "react";
import ReactDom from "react-dom/client";
import App from "./components/App";
import "./css/main.scss";

var root = ReactDom.createRoot(document.getElementById("root"));

root.render(<App />);
