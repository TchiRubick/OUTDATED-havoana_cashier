import axios from "axios";
import { BASE_URL } from "../config/constant"

const urlProduit = BASE_URL + "api/produit";

const mockList = (setter, head) => {
	const instance = {
		withCredentials: true,
		method: "POST",
		url: urlProduit
	};

	axios(instance)
		.then((response) => {
			if (response.data.success === true) {
				setter(response.data.value);
			}
		})
		.catch((error) => {
			console.log(error.message);
			setter([]);
		});
}

export default mockList;
