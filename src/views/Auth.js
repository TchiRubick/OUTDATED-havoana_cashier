import React from "react";
import {
	Col,
	Row,
	Card,
	Input,
	FormGroup,
	Form,
	Button,
	CardBody,
	CardHeader,
	CardFooter,
	FormText,
} from "reactstrap";

import NotificationAlert from "react-notification-alert";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { BASE_URL } from "../config/constant"

const urlAuthentification = BASE_URL + "api/authentification";

const Auth = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
	const [textSociete, setTextSociete] = React.useState("");
	const [textLogin, setTextLogin] = React.useState("");
	const [textPassword, setTextPassword] = React.useState("");
	const [checking, toogleChecking] = React.useState(false);
	const [isError, toogleIsError] = React.useState(false);
	const [authentified, setAuthentified] = React.useState(false);
	const notificationRef = React.useRef(null);

	React.useEffect(() => {
		removeCookie("Token");
		if (checking === true) {
			const instance = {
				method: "POST",
				url: urlAuthentification,
				data: {
					societe: textSociete,
					login: textLogin,
					password: textPassword,
					machine: _getKeyMachine(),
				},
			};

			axios(instance)
				.then((res) => {
					if (res.data.success === true) {
						setCookie("Token", res.data.value.TOKEN);
						setAuthentified(true);
					} else {
						notify(
							"Code erreur:" +
								res.data.code +
								", " +
								res.data.message
						);
						toogleIsError(true);
						toogleChecking(false);
					}
				})
				.catch((err) => {
					notify("Erreur lors de l'authentification : " + err);
					toogleIsError(true);
					toogleChecking(false);
				});
		}
	}, [
		checking,
		cookies,
		textLogin,
		textPassword,
		textSociete,
		isError,
		setAuthentified,
		setCookie,
		removeCookie,
	]);

	const authentification = () => {
		switch (true) {
			case textSociete.trim().length < 2:
				toogleChecking(false);
				toogleIsError(true);
				notify("Veuillez compléter correctement le champ societe");
				break;
			case textLogin.trim().length < 2:
				toogleChecking(false);
				toogleIsError(true);
				notify("Veuillez compléter correctement le champ login");
				break;
			case textPassword.trim().length < 2:
				toogleChecking(false);
				toogleIsError(true);
				notify("Veuillez compléter correctement le champ mot de passe");
				break;
			default:
				toogleChecking(true);
				break;
		}
	};

	const _getKeyMachine = () => {
		let appName = navigator.appName;
		let appCodeName = navigator.appCodeName;
		let appVersion = navigator.appVersion;
		let platform = navigator.platform;
		let cookieEnabled = navigator.cookieEnabled;
		let userAgent = navigator.userAgent;
		let javaEnabled = navigator.javaEnabled();

		let keyMachine =
			"?app=" +
			appName +
			"&code=" +
			appCodeName +
			"&version=" +
			appVersion +
			"&platform=" +
			platform +
			"&ena=" +
			cookieEnabled +
			"&agent=" +
			userAgent +
			"&java=" +
			javaEnabled;

		return keyMachine;
	};

	const notify = (message) => {
		var options = {};
		options = {
			place: "tl",
			message: (
				<div>
					<div>{message}</div>
				</div>
			),
			type: "danger",
			icon: "tim-icons icon-bell-55",
			autoDismiss: 7,
		};

		notificationRef.current.notificationAlert(options);
	};

	if (authentified === true) {
		return <Redirect to="/admin/vente" />;
	}

	return (
		<>
			<div className="content mt-5">
				<div className="react-notification-alert-container">
					<NotificationAlert ref={notificationRef} />
				</div>
				<Row>
					<Col></Col>
					<Col md="4">
						<Card>
							<CardHeader className="text-center">
								<h5 className="title">
									CASHIER HAVOANA AUTHENTIFICATION
								</h5>
							</CardHeader>
							<CardBody>
								<Form>
									<Row>
										<Col></Col>
										<Col md="8">
											<FormGroup>
												<label>Societe (Company)</label>
												<Input
													placeholder="HAVOANA"
													type="text"
													value={textSociete}
													onChange={(e) =>
														setTextSociete(
															e.target.value
														)
													}
												/>
											</FormGroup>
										</Col>
										<Col></Col>
									</Row>
									<Row>
										<Col></Col>
										<Col md="8">
											<FormGroup>
												<label>Login</label>
												<Input
													placeholder="RAKOTO"
													type="text"
													value={textLogin}
													onChange={(e) =>
														setTextLogin(
															e.target.value
														)
													}
												/>
											</FormGroup>
										</Col>
										<Col></Col>
									</Row>
									<Row>
										<Col></Col>
										<Col md="8">
											<FormGroup>
												<label>Mot de passe</label>
												<Input
													placeholder="*************"
													type="password"
													value={textPassword}
													onChange={(e) =>
														setTextPassword(
															e.target.value
														)
													}
												/>
											</FormGroup>
										</Col>
										<Col></Col>
									</Row>
								</Form>
							</CardBody>
							<CardFooter className="text-center">
								<Button
									className="btn-fill"
									color="primary"
									type="submit"
									disabled={checking}
									onClick={authentification}
								>
									<i className="tim-icons icon-send" />{" "}
									S'authentifier
								</Button>
								<FormText color="muted">
									Votre appareil doit être autorisé pour
									pouvoir s'authentifier.
								</FormText>
							</CardFooter>
						</Card>
					</Col>
					<Col></Col>
				</Row>
			</div>
		</>
	);
};

export default Auth;
