const express = require("express");
const routes = express.Router();

const Commerce = require("./controller/apiCommerce");

routes.get("/", (request, response) => response.json({"message": "System is up!"}));


routes.post("/getproduct", Commerce.GetProduct);



module.exports = routes;