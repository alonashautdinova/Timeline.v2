//require env file
require("dotenv").config();

const http = require("http");
const router = require("./config/router");
const _ = require("lodash");

//express app
const express = require("express");
const app = express();
//

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//register view engine
app.set("view engine", "ejs");

//require mongoose
require("./config/mongoose");

// require router
app.use("/", router);

app.listen(3000);
