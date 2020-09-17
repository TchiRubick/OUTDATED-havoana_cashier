import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const mocklist = (setListe) => {
	const instance = {
		method: "POST",
		url: "https://havoana-cashier.herokuapp.com/api/produit",
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
