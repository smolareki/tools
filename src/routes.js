const express = require("express");
const routes = express.Router();

const Commerce = require("./controller/apiCommerce");

routes.get("/", (request, response) => response.json({"message": "System is up!"}));


routes.post("/layer", Commerce.Layer);



module.exports = routes;