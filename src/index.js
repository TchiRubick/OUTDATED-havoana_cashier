import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import App from "./App";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

ReactDOM.render(
	<CookiesProvider>
		<App />
	</CookiesProvider>,
	document.getElementById("root")
);
