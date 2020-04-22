const express = require("express");

const router = express.Router();


router.get("/", (request, response) => {
  response.send("listing all users");
});

router.get("/:id", (request, response) => {
  response.send(`listing user of id ${request.params.id}`);
});

router.post("/", (request, response) => {
  response.send(`creating new user with data ${request.body}`);
});

router.patch("/:id", (request, response) => {
  response.send(`updating user of id ${request.params.id}`);
});

router.delete("/:id", (request, response) => {
  response.send(`deleting user of id ${request.params.id}`);
});


module.exports = router
