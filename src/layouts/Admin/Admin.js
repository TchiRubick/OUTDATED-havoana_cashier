/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import logo from "assets/img/logo-big-white.png";

var ps;

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			backgroundColor: "green",
			sidebarOpened:
				document.documentElement.className.indexOf("nav-open") !== -1,
		};
	}

	componentDidMount() {
		if (navigator.platform.indexOf("Win") > -1) {
			document.documentElement.className += " perfect-scrollbar-on";
			document.documentElement.classList.remove("perfect-scrollbar-off");
			ps = new PerfectScrollbar(this.refs.mainPanel, {
				suppressScrollX: true,
			});
			let tables = document.querySelectorAll(".table-responsive");
			for (let i = 0; i < tables.length; i++) {
				ps = new PerfectScrollbar(tables[i]);
			}
		}
	}

	componentWillUnmount() {
		if (navigator.platform.indexOf("Win") > -1) {
			ps.destroy();
			document.documentElement.className += " perfect-scrollbar-off";
			document.documentElement.classList.remove("perfect-scrollbar-on");
		}
	}

	componentDidUpdate(e) {
		if (e.history.action === "PUSH") {
			if (navigator.platform.indexOf("Win") > -1) {
				let tables = document.querySelectorAll(".table-responsive");
				for (let i = 0; i < tables.length; i++) {
					ps = new PerfectScrollbar(tables[i]);
				}
			}
			document.documentElement.scrollTop = 0;
			document.scrollingElement.scrollTop = 0;
			this.refs.mainPanel.scrollTop = 0;
		}
	}
	// this function opens and closes the sidebar on small devices
	toggleSidebar = () => {
		document.documentElement.classList.toggle("nav-open");
		this.setState({ sidebarOpened: !this.state.sidebarOpened });
	};

	getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === "/admin") {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
					/>
				);
			} else {
				return null;
			}
		});
	};

	handleBgClick = (color) => {
		this.setState({ backgroundColor: color });
	};

	getBrandText = (path) => {
		for (let i = 0; i < routes.length; i++) {
			if (
				this.props.location.pathname.indexOf(
					routes[i].layout + routes[i].path
				) !== -1
			) {
				return routes[i].name;
			}
		}
		return "Brand";
	};

	render() {
		return (
			<>
				<div>
					<Sidebar
						{...this.props}
						routes={routes}
						bgColor={this.state.backgroundColor}
						logo={{
							outterLink: "",
							text: "CASHIER HAVOANA",
							imgSrc: logo,
						}}
						toggleSidebar={this.toggleSidebar}
					/>
					<div
						className="main-panel"
						ref="mainPanel"
						data={this.state.backgroundColor}
					>
						<Switch>
							{this.getRoutes(routes)}
							<Redirect from="*" to="/auth" />
						</Switch>
						{this.props.location.pathname.indexOf("maps") !==
						-1 ? null : (
							<Footer fluid />
						)}
					</div>
				</div>
			</>
		);
	}
}

export default Admin;
