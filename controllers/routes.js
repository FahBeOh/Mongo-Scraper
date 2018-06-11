var express = require("express");
var router = express.Router();
var db = require("../models");



router.get("/", function(req, res) {
      res.render("index");
      db.article.find({}, function(err, found) {
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