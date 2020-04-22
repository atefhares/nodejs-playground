const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
  response.send("listing all posts");
});

router.get("/:id", (request, response) => {
  response.send(`listing post of id ${request.params.id}`);
});

router.post("/", (request, response) => {
  response.send(`creating new post with data ${request.body}`);
});

router.patch("/:id", (request, response) => {
  response.send(`updating post of id ${request.params.id}`);
});

router.delete("/:id", (request, response) => {
  response.send(`deleting post of id ${request.params.id}`);
});

module.exports = router
