const mongoose = require("mongoose");
const userModel = require("../models/users");

const authorValidation = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
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

schema.pre("save", function (next) {
  userModel.findById(this.author, function (err, user) {
    if (err || !user) {
      next(new Error("Author is not valid!"));
    } else {
      next();
    }
  });
});

const post = mongoose.model("Post", schema);

module.exports = post;
