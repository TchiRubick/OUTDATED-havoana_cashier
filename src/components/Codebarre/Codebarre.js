import React from "react";
import {
	InputGroup,
	InputGroupAddon,
	Input,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
} from "reactstrap";

import List from "../../components/Article/Liste";
import {
	currentArticle,
	listeArticles,
	flagReinitArticle,
	quantiteState,
	panier,
	totalPanier,
} from "../../variables/state";
import { isEmptyObj } from "../../variables/helper";
import { useRecoilState, useRecoilValue } from "recoil";
import BarcodeReader from "react-barcode-reader";
import NotificationAlert from "react-notification-alert";

const Codebarre = () => {
	const notificationRef = React.useRef(null);

	const [valueCodebarre, setValueCodebarre] = React.useState("");

	const [panierList, pushToPanier] = useRecoilState(panier);
	const [quantite, setQuantite] = useRecoilState(quantiteState);
	const [totalG, setTotal] = useRecoilState(totalPanier);
	const [currentArticleValue, setCurrentArticleValue] = useRecoilState(
		currentArticle
	);
	const [isReinitArticle, setIsReinitArticle] = useRecoilState(
		flagReinitArticle
	);

	const listArticle = useRecoilValue(listeArticles);

	React.useEffect(() => {
		if (!isEmptyObj(currentArticleValue)) {
			setValueCodebarre(currentArticleValue.prd_codebarre);
		} else if (isReinitArticle === true) {
			setValueCodebarre("");
			setIsReinitArticle(false);
			setQuantite(0);
		}
	}, [currentArticleValue, isReinitArticle, setIsReinitArticle, setQuantite]);

	const isInList = (value) => {
		if (Number.isNaN(parseInt(value)) === false) {
			listArticle.find((el) => {
				if (
					el.prd_codebarre.trim().toLowerCase() ===
					value.replace(/^\s+/g, "").toLowerCase()
				) {
					if (value === valueCodebarre) {
						setQuantite(quantite + 1);
					} else {
						if (valueCodebarre !== "") {
							ajoutPanier();
						}

						setCurrentArticleValue(el);
						setValueCodebarre(el.prd_codebarre);
						setQuantite(1);
					}

					return true;
				}

				return false;
			});

			setValueCodebarre(value);
		} else {
			notify(
				"Veuillez vérifier la configuration de votre scanne s'il vous plait !",
				"danger"
			);
		}
	};

	const ajoutPanier = () => {
		let i = 0;
		let duplicate = false;
		let tmp_panier = [...panierList];

		if (quantite > currentArticleValue.prd_quantite) {
			notify(
				"Quantité inssufisante. Ils vous reste " +
					currentArticleValue.prd_quantite +
					" quantité en vente pour cet article",
				"danger"
			);

			return false;
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
								currentArticleValue.prd_prixvente *
									(quantite === 0 ? 1 : quantite) -
								el.article.prd_prixvente * el.quantite
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
						currentArticleValue.prd_prixvente *
							(quantite === 0 ? 1 : quantite)
				);
			}
		}
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
			<InputGroup size="lg">
				<InputGroupAddon addonType="prepend">
					Codebarre:&nbsp;
				</InputGroupAddon>
				<BarcodeReader onScan={(e) => isInList(e)} />
				<Input type="text" value={valueCodebarre} readOnly={true} />
				<UncontrolledDropdown className="m-2">
					<DropdownToggle
						caret
						data-toggle="dropdown"
						onClick={(e) => e.preventDefault()}
					>
						Liste Produit
					</DropdownToggle>
					<DropdownMenu
						tag="ul"
						style={{ maxHeight: 400, overflow: "auto", width: 350 }}
					>
						<List />
					</DropdownMenu>
				</UncontrolledDropdown>
			</InputGroup>
		</>
	);
};

export default Codebarre;
