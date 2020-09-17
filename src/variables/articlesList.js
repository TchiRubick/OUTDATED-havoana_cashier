import axios from "axios";
import { BASE_URL } from "../config/constant"

const urlProduit = BASE_URL + "api/produit";

export const mocklist = (setListe) => {
	const instance = {
		method: "POST",
		url: urlProduit,
		withCredentials: true,
	};

	axios(instance)
		.then((response) => {
			if (response.data.success === true) {
				setListe(response.data.value);
			} else {
				setListe([]);
			}
		})
		.catch((error) => {
			console.log(error);
			setListe([]);
		});
};
