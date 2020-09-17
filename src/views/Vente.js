import React from "react";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Row, Col } from "reactstrap";

import Quantity from "../components/Quantity/Quantity";
import Codebarre from "../components/Codebarre/Codebarre";
import Action from "../components/Action/Action";
import Recap from "../components/Article/Recap";
import Ticket from "../components/Table/Ticket";

const Vente = () => {

	const [cookies] = useCookies(["Token"]);

	if (!cookies.Token) return <Redirect to="/" />;

	return (
		<>
			<div className="content">
				<Row>
					<Col xs="3">
						<Row className="text-center">
							<Quantity />
						</Row>
						<Row className="text-center">
							<Action />
						</Row>
					</Col>
					<Col xs="6" className="text-left">
						<Row>
							<Col>
								<Codebarre />
							</Col>
						</Row>
						<Row>
							<Col>
								<Ticket />
							</Col>
						</Row>
					</Col>
					<Col xs="3">
						<Row className="text-left">
							<Recap />
						</Row>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default Vente;
