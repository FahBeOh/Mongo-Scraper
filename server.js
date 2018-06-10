var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
// var mongojs = require("mongojs");
// var mongoose = require("mongoose");

// var axios = require("axios");
// var cheerio = require("cheerio");

var PORT = process.env.PORT || 8080;

var app = express();

// Import routes and give the server access to them.
var routes = require("./controllers/routes.js");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(routes);

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});