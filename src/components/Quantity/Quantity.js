import React from "react";
import { Row, Col, Card, CardTitle, Button, Input } from "reactstrap";

import { quantiteState } from "../../variables/state";
import { useRecoilState } from "recoil";

const Quantity = () => {
	const [quantite, setQuantite] = useRecoilState(quantiteState);

	return (
		<Card body>
			<CardTitle>Additioneur de quantite</CardTitle>
			<Row>
				<Input
					type="number"
					value={quantite}
					min="0"
					onChange={(e) => setQuantite(parseFloat(e.target.value))}
					onFocus={() => setQuantite("")}
				/>
			</Row>
			<Row>
				<Col xs="4">
					<Button
						color="info"
						bssize="sm"
						size="sm"
						block
						onClick={() => setQuantite(quantite + 1)}
					>
						1
					</Button>
				</Col>
				<Col xs="4">
					<Button
						color="info"
						bssize="sm"
						size="sm"
						block
						onClick={() => setQuantite(quantite + 2)}
					>
						2
					</Button>
				</Col>
				<Col xs="4">
					<Button
						color="info"
						bssize="sm"
						size="sm"
						block
						onClick={() => setQuantite(quantite + 3)}
					>
						3
					</Button>
				</Col>
			</Row>
			<Row>
				<Col xs="4">
					<Button
						color="info"
						bssize="sm"
						size="sm"
						block
						onClick={() => setQuantite(quantite + 4)}
					>
						4
					</Button>
				</Col>
				<Col xs="4">
					<Button
						color="info"
						bssize="sm"
						size="sm"
						block
						onClick={() => setQuantite(quantite + 5)}
					>
						5
					</Button>
				</Col>
				<Col xs="4">
					<Button
						color="info"
						bssize="sm"
						size="sm"
						block
						onClick={() => setQuantite(quantite + 6)}
					>
						6
					</Button>
				</Col>
			</Row>
			<Row>
				<Col xs="4">
					<Button
						color="info"
						bssize="sm"
						size="sm"
						block
						onClick={() => setQuantite(quantite + 7)}
					>
						7
					</Button>
				</Col>
				<Col xs="4">
					<Button
						color="info"
						bssize="sm"
						size="sm"
						block
						onClick={() => setQuantite(quantite + 8)}
					>
						8
					</Button>
				</Col>
				<Col xs="4">
					<Button
						color="info"
						bssize="sm"
						size="sm"
						block
						onClick={() => setQuantite(quantite + 9)}
					>
						9
					</Button>
				</Col>
			</Row>
			<Row>
				<Col xs="8">
					<Button
						color="danger"
						bssize="sm"
						size="sm"
						block
						onClick={() => setQuantite(0)}
					>
						reset
					</Button>
				</Col>
				<Col xs="4">
					<Button
						color="info"
						bssize="sm"
						size="sm"
						block
						onClick={() => setQuantite(quantite + 10)}
					>
						10
					</Button>
				</Col>
			</Row>
		</Card>
	);
};

export default Quantity;
