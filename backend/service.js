const axios = require("axios");
const dotenv = require("dotenv");
const md5 = require("md5");

dotenv.config();
const HOST = process.env.HOST_API;
const KEY = process.env.API_KEY;

exports.authentification = async (req, res) => {
	let response = { success: false, message: "", value: null, code: "0000" };

	try {
		let instance = {
			method: "POST",
			url: HOST + "authentification",
			headers: { "X-Token": KEY },
			data: {
				societe: req.body.societe,
				login: req.body.login,
				password: md5(req.body.password),
				machine: req.body.machine,
			},
		};

		// @ts-ignore
		const result = await axios(instance);

		if (result.data.error === 0) {
			response.message = "Authentifier avec succès";
			response.value = result.data.response;
			response.success = true;
		} else {
			response.message = result.data.response;
			response.code = result.data.code;
		}
	} catch (error) {
		console.log(error);
		response.message =
			"Erreur authentification, veuillez reporter à l'administrateur du site";
	}

	res.send(response);
};

exports.sell = (req, res) => {
	let response = { success: false, message: "", value: null, code: "0000" };
	let token = req.cookies.Token;

	let instance = {
		method: "POST",
		url: HOST + "setTransacSell",
		headers: { "X-Token": KEY, Token: token },
		data: { panier: req.body.panier },
	};

	// @ts-ignore
	axios(instance)
		.then((result) => {
			console.log(result);
			response.success = true;
			res.send(response);
		})
		.catch((error) => {
			console.log(error);
			res.send(response);
		});
};

exports.produit = async (req, res) => {
	let response = { success: false, message: "", value: [], code: "0000" };
	let token = req.cookies.Token;

	let instance = {
		method: "POST",
		url: HOST + "allProduitActif",
		headers: { "X-Token": KEY, Token: token },
	};

	try {
		// @ts-ignore
		const result = await axios(instance);
		console.log(result)
		if (result.data.error === 0) {
			response.value = result.data.response;
			response.success = true;
		} else {
			response.message = result.data.response;
			response.code = result.data.code;
		}
	} catch (error) {
		console.log(error);
		response.message =
			"Erreur récuperation produit, veuillez reporter à l'administrateur du site";
	}

	res.send(response);
};
