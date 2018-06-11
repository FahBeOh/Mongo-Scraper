var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ExampleSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // `string` must be of type String. We "trim" it to remove any trailing white space
  // `string` is a required field, and a custom error message is thrown if it is not supplied
  headline: {
    type: String,
    trim: true,
    unique: true,
    required: "String is Required"
  },
  summary: {
    type: String,
    trim: true,
    required: "String is Required"
  },
  url: {
    type: String,
    trim: true,
    required: "String is Required"
  },
  notes: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  saved: {
  type: Boolean,
  default: false
},
});

// This creates our model from the above schema, using mongoose's model method
var article = mongoose.model("article", ArticleSchema);

// Export the Example model
module.exports = article;
