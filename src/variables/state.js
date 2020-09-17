import { atom } from "recoil";

export const quantiteState = atom({
	key: "quantiteState",
	default: 0,
});

export const listeArticles = atom({
	key: "listeArticles",
	default: [],
});

export const currentArticle = atom({
	key: "currentArticle",
	default: {},
});

export const flagReinitArticle = atom({
	key: "flagReinitArticle",
	default: false,
});

export const panier = atom({
	key: "panier",
	default: [],
});

export const totalPanier = atom({
	key: "totalPanier",
	default: 0,
});

export const modalPaiement = atom({
	key: "modalPaiement",
	default: false,
});
