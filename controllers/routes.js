var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var databaseUrl = "scrapedArticles";
var collections = ["articles"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

router.get("/", function(req, res) {
      res.render("index");
      db.articles.find({}, function(err, found) {
        // Log any errors if the server encounters one
        if (err) {
          console.log(err);
        }
        // Otherwise, send the result of this query to the browser
        else {
          console.log(found);
        }
      });
  });

  module.exports = router;