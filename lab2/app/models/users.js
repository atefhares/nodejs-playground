const mongoose = require("mongoose");

const nameValidation = {
  type: String,
  required: true,
  maxlength: 10,
  minlength: 3,
};

const passwordValidation = {
  type: String,
  required: true,
  minlength: 8,
};

const dateValidation = {
  type: Date,
  required: true,
};

const genderValidation = {
  type: String,
  required: true,
  enum: ["f", "m"],
};

const emailValidation = {
  type: String,
  required: true,
  match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  unique: true,
  index: true,
};

const phoneValidation = {
  type: String,
  required: true,
  unique: true,
  maxlength: 11,
  minlength: 11,
};

const schema = new mongoose.Schema({
  first_name: nameValidation,
  last_name: nameValidation,
  password: passwordValidation,
  date_of_birth: dateValidation,
  gender: genderValidation,
  email: emailValidation,
  phone_number: phoneValidation,
});

// instance method
schema.methods.getFullName = function getFullName() {
  return this.first_name + " " + this.last_name;
};

// static method
schema.statics.getUsersByGender = function getUsersByGender(gender, callback) {
  this.find({ gender: gender }, callback);
};

const user = mongoose.model("User", schema);

module.exports = user;
