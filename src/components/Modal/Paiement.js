import React from "react";
import { totalPanier, modalPaiement, panier } from "../../variables/state";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { Col, Input, Button, Modal, Row } from "reactstrap";
import { BASE_URL } from "../../config/constant"
import { useCookies  } from "react-cookie";

const urlSell = BASE_URL + "api/sell";

const Paiement = (props) => {
	const { viderPanier } 	= props;
	const notificationRef 	= React.useRef(null);
	const inputFocus 		= React.useRef(null)
	const totalG 			= useRecoilValue(totalPanier);
	const panierList 		= useRecoilValue(panier);
	const [isOpenModal, toggleModalSearch] 	= useRecoilState(modalPaiement);
	const [valueMontant, setValueMontant] 	= React.useState(0);
	const [valueRendu, setValueRendu] 		= React.useState(0);
	const [enablePay, tooglePay]			= React.useState(false);
	const [cookies, ] 						= useCookies(['Token']);

	const setFocus = () => {inputFocus.current && inputFocus.current.focus()}

	const notify = (message, type) => {
		var options = {};
		options = {
			place: "tl",
			message: (
				<div>
					<div>{message}</div>
				</div>
			),
			type: type,
			icon: "tim-icons icon-bell-55",
			autoDismiss: 7,
		};

		notificationRef.current.notificationAlert(options);
	};

	const validerPanier = () => {
		const instance = {
			method: "POST",
			url: urlSell,
			withCredentials: true,
			data: { panier: panierList, Token: cookies.Token },
		};

		axios(instance)
			.then((response) => {
				if (response.data.success === true) {
					notify("Transaction éffectuer", "info");
                    viderPanier();
					toggleModalSearch(!isOpenModal);
					setValueRendu(0);
					setValueMontant(0);
				} else {
					notify(response.data.message, "danger");
				}
			})
			.catch((error) => {
				console.log(error);
				notify("Erreur interne, contactez un responsable", "danger");
			});
	};

	const calculRendu = (amount) => {
		setValueMontant(amount);

        if (amount >= totalG) {
            setValueRendu(amount - totalG);
            tooglePay(true)
        } else {
            setValueRendu(0);
            tooglePay(false)
        }
	};

	React.useEffect(() => {
		setValueRendu("");
		setValueMontant("");
		setFocus();
	}, [isOpenModal])

	return (
		<>
			<div className="react-notification-alert-container">
				<NotificationAlert ref={notificationRef} />
			</div>
			<Modal
				modalClassName="modal-payement"
				isOpen={isOpenModal}
				toggle={() => toggleModalSearch(!isOpenModal)}
				autoFocus={false}
			>
				<div
					className="modal-header"
					style={{ backgroundColor: "#1e1e29" }}
				>
					<h1>Paiement</h1>
				</div>
				<div
					className="modal-body"
					style={{ backgroundColor: "#26283c" }}
				>
					<h2>
						Montant à payer : <b>{totalG}</b>
					</h2>
					<h2>
						Montant à rendre : <b>{valueRendu}</b>
					</h2>
					<div>
						<Row>
							<Col>
								<label>Montant payé</label>
								<Input
									type="number"
									value={valueMontant}
									onChange={(e) =>
										calculRendu(e.target.value)
                                    }
									onFocus={() => setValueMontant("")}
									innerRef={inputFocus}
									autoFocus={true}
								/>
							</Col>
							<Col>
								<Button
									color="info"
                                    onClick={() => validerPanier()}
                                    disabled={!enablePay}
								>
									Payer
								</Button>
							</Col>
						</Row>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Paiement;
