const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { authentification, sell, produit } = require("./backend/service");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

app.post("/api/authentification", (req, res) => {
	authentification(req, res);
});

app.post("/api/sell", (req, res) => {
	sell(req, res);
});

app.post("/api/produit", (req, res) => {
	produit(req, res);
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.port || process.env.APP_PORT;

app.listen(port);
