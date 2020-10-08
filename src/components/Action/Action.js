import React from "react";
import { Col, Button } from "reactstrap";
import {
	currentArticle,
	flagReinitArticle,
	panier,
	quantiteState,
	totalPanier,
	modalPaiement,
} from "../../variables/state";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isEmptyObj } from "../../variables/helper";
import NotificationAlert from "react-notification-alert";
import Paiement from "../Modal/Paiement";

const Action = () => {
	const notificationRef = React.useRef(null);

	const [allowArticleAction, toogleAlloweArticleAction] = React.useState(
		false
	);

	const [isOpenModal, toggleModalSearch] = useRecoilState(modalPaiement);
	const [quantite, setQuantite] = useRecoilState(quantiteState);
	const [totalG, setTotal] = useRecoilState(totalPanier);
	const [panierList, pushToPanier] = useRecoilState(panier);
	const [currentArticleValue, setCurrenArticleValue] = useRecoilState(
		currentArticle
	);

	const setIsReinitArticle = useSetRecoilState(flagReinitArticle);

	React.useEffect(() => {
		toogleAlloweArticleAction(!isEmptyObj(currentArticleValue));
	}, [currentArticleValue, toogleAlloweArticleAction]);

	const ajoutPanier = () => {
		let i = 0;
		let duplicate = false;
		let tmp_panier = [...panierList];
		console.log(currentArticleValue)
		if (quantite > currentArticleValue.magst_quantite) {
			notify(
				"Quantité inssufisante. Ils vous reste " +
					currentArticleValue.magst_quantite +
					" quantité en vente pour cet article",
				"danger"
			);
		} else {
			if (panierList.length > 0) {
				
				tmp_panier.find((el) => {
					if (
						el.article.prd_codebarre.trim() ===
						currentArticleValue.prd_codebarre.trim()
					) {
						duplicate = true;
						tmp_panier.splice(
							i,
							1,
							Object.assign(
								{},
								{ article: currentArticleValue },
								{ quantite: quantite === 0 ? 1 : quantite }
							)
						);

						setTotal(
							totalG +
								currentArticleValue.magst_prix *
									(quantite === 0 ? 1 : quantite) -
								el.article.magst_prix * el.quantite
						);
						return true;
					}
					i++;
					return false;
				});
			}

			if (duplicate === true) {
				pushToPanier(tmp_panier);
			} else {
				pushToPanier([
					...panierList,
					Object.assign(
						{},
						{ article: currentArticleValue },
						{ quantite: quantite === 0 ? 1 : quantite }
					),
				]);
				setTotal(
					totalG +
						currentArticleValue.magst_prix *
							(quantite === 0 ? 1 : quantite)
				);
			}

			annulerArticle();
		}
	};

	const viderPanier = () => {
		annulerArticle();
		pushToPanier([]);
		setTotal(0);
	};

	const annulerArticle = () => {
		setCurrenArticleValue({});
		setIsReinitArticle(true);
		setQuantite(0);
	};

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

	return (
		<>
			<div className="react-notification-alert-container">
				<NotificationAlert ref={notificationRef} />
			</div>
			<Paiement viderPanier={viderPanier} />
			<Col>
				<Button
					color="info"
					block
					disabled={!allowArticleAction}
					onClick={() => ajoutPanier()}
				>
					{" "}
					Ajouter l'article{" "}
				</Button>
			</Col>
			<Col>
				<Button
					color="secondary"
					block
					disabled={!allowArticleAction}
					onClick={() => annulerArticle()}
				>
					{" "}
					Annuler l'article{" "}
				</Button>
			</Col>
			<Col>
				<Button
					color="success"
					block
					onClick={() => toggleModalSearch(!isOpenModal)}
					disabled={!(panierList.length > 0)}
				>
					{" "}
					Valider le panier{" "}
				</Button>
			</Col>
			<Col>
				<Button
					color="danger"
					block
					onClick={() => viderPanier()}
					disabled={!(panierList.length > 0)}
				>
					{" "}
					Vider le panier{" "}
				</Button>
			</Col>
		</>
	);
};

export default Action;
