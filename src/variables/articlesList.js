import axios from "axios";
import { BASE_URL } from "../config/constant"

const urlProduit = BASE_URL + "api/produit";

const instance = {
	method: "POST",
	url: urlProduit,
	withCredentials: true,
};

const mockList = (setter) => {
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
