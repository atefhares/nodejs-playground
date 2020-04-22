const mongoose = require("mongoose");

const authorValidation = {
  type: String,
  required: true,
};

const dateValidation = {
  type: Date,
  required: true,
};

const contentValidation = {
  type: String,
  required: true,
  minlength: 1,
};

const schema = new mongoose.Schema({
  author: authorValidation,
  date: dateValidation,
  content: contentValidation,
});

const post = mongoose.model("Post", schema);

module.exports = post;
