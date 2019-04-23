import * as ReactDom from "react-dom";
import * as React from "react";
import { MainComponent } from "./MainComponent"

const appContainer = document.getElementById("app");
ReactDom.render(React.createElement(MainComponent), appContainer);
