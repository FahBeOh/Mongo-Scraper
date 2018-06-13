var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

router.get("/", function (req, res) {
  db.article.find({}, function (error, data) {
    var art = {
      art: data
    };
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.render("index", art);
    }
  })
});

router.get("/scrape", function (req, res) {
  // First, we grab the body of the html with request
  axios.get("https://www.nytimes.com/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article").each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      if (result.headline = $(this).children("h2").children("a").text().includes("Trump")) {

        result.headline = $(this).children("h2").children("a").text();
        result.summary = $(this).children("p.summary").text();
        result.url = $(this).children("h2").children("a").attr("href");
      };
      // // Create a new Article using the `result` object built from scraping
      db.article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          // console.log(dbArticle);
        })
      // .catch(function(err) {
      //   // If an error occurred, send it to the client
      //   return res.json(err);
      // });
    })
      .done(
        db.article.find({}, function (error, data) {
          var art = {
            art: data
          };
          // Log any errors
          if (error) {
            console.log(error);
          }
          // Or send the doc to the browser as a json object
          else {
            res.render("index", art);
          }
        })
      )

    // If we were able to successfully scrape and save an Article, send a message to the client
    // res.send("Scrape Complete");
  });
});

// router.get("/articles", function(req, res) {
//   // Grab every doc in the Articles array
//   db.article.find({}, function(error, data) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     }
//     // Or send the doc to the browser as a json object
//     else {
//       res.json(data);
//     }
//   });
// });
module.exports = router;