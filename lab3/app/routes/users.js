const express = require("express");
const userModel = require("../models/users");
const postModel = require("../models/posts");
const bcrypt = require("bcrypt");
const jwt = require("../middleware/jwt");

const router = express.Router();

// ==========================================================================

router.use((request, response, next) => {
  console.log("users routes");
  next();
});

// ==========================================================================

router.get("/", async (request, response) => {
  try {
    const users = await userModel.find({}).select(["-password"]);
    response.json(users);
  } catch (error) {
    console.log(error);
    response.send("could not get all user --> error");
  }
});

router.get("/:id", async (request, response) => {
  try {
    const user = await userModel
      .findById(request.params.id)
      .select(["-password"]);
    response.json(user);
  } catch (error) {
    console.log(error);
    response.send("could not get user --> error");
  }
});

router.get("/:id/posts", async (request, response) => {
  try {
    const user = await userModel
      .findById(request.params.id)
      .select(["-password"]);
    if (user) {
      const user_posts = await postModel.find({ author: user._id });
      response.json(user_posts);
    } else {
      response.send("Invalid user");
    }
  } catch (error) {
    console.log(error);
    response.send("could not get user's posts --> error");
  }
});
// ==========================================================================

router.post("/", async (request, response) => {
  const { f, l, e, d, g, p, n } = request.body;

  const new_user = new userModel({
    first_name: f,
    last_name: l,
    password: p,
    date_of_birth: d,
    gender: g,
    email: e,
    phone_number: n,
  });

  try {
    const savedUser = await new_user.save();
    response.json(savedUser);
  } catch (error) {
    console.log(error);
    response.send("could not save user --> error");
  }
});


// ==========================================================================

router.patch("/:id", async (request, response) => {
  const { f, l, e, d, g, n } = request.body;

  try {
    const user = await userModel.findById(request.params.id);
    if (user) {
      if (f) user.first_name = f;
      if (l) user.last_name = l;
      if (e) user.email = e;
      if (d) user.date_of_birth = d;
      if (g) user.gender = g;
      if (n) user.phone_number = n;

      const updated_user = await user.save();
      response.json(updated_user);
    } else {
      response.send(`no user found with id: ${request.params.id}`);
    }
  } catch (error) {
    console.log(error);
    response.send("could not update user --> error");
  }
});

// ==========================================================================

router.delete("/:id", async (request, response) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(request.params.id);
    response.json(deletedUser);
  } catch (error) {
    console.log(error);
    response.send("could not update user --> error");
  }
});

module.exports = router;
