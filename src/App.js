import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { withCookies } from "react-cookie";
import { RecoilRoot } from "recoil";

import AdminLayout from "layouts/Admin/Admin.js";
import Auth from "views/Auth";

const hist = createBrowserHistory();

const App = () => {
	return (
		<Router history={hist}>
			<Switch>
				<Route
					path="/admin"
					render={(props) => (
						<RecoilRoot>
							{" "}
							<AdminLayout {...props} />{" "}
						</RecoilRoot>
					)}
				/>

				<Route path="/" render={(props) => <Auth {...props} />} />
				<Redirect from="/" to="/auth" />
			</Switch>
		</Router>
	);
};

export default withCookies(App);
