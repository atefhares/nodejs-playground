const express = require("express");
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("../middleware/jwt");

const router = express.Router();

router.post("/", async (request, response) => {
  const { e, p } = request.body;

  try {
    const user = await userModel.findOne({ email: e });
    console.log(user.password);

    const isSamePassword = await bcrypt.compare(p, user.password);

    if (isSamePassword) {
      token = jwt.getNewJWT(user.email);
      response.cookie("token", token, { maxAge: jwt.jwtExpirySeconds * 1000 });
      response.send("LoggedIn");
    } else {
      response.send("invalid credentials");
    }
    if (user) {
    } else {
      response.send("invalid credentials");
    }
  } catch (error) {
    console.log(error);
    response.send("could not login --> error");
  }
});


module.exports = router;
