const express = require("express");
const postsModel = require("../models/posts");

const router = express.Router();

// ==========================================================================

router.use((request, response, next) => {
  console.log("posts routes");
  next();
});

// ==========================================================================

router.get("/", async (request, response) => {
  try {
    const posts = await postsModel
      .find({})
      .populate({ path: "author", select: "-password" });
    response.json(posts);
  } catch (error) {
    console.log(error);
    response.send("could not update post --> error");
  }
});

router.get("/:id", async (request, response) => {
  try {
    const post = await postsModel
      .findById(request.params.id)
      .populate({ path: "author", select: "-password" });
    response.json(post);
  } catch (error) {
    console.log(error);
    response.send("could not get post --> error");
  }
});

// ==========================================================================

router.post("/", async (request, response) => {
  const { a, d, c } = request.body;

  const new_post = new postsModel({
    author: a,
    content: c,
    date: d,
  });

  try {
    const saved_post = await new_post.save();
    response.json(saved_post);
  } catch (error) {
    console.log(error);
    response.send("could not save post --> error");
  }
});

// ==========================================================================

// router.patch("/:id", (request, response) => {
//   const { f, l, e, d, g, p, n } = request.body;

//   postsModel.findByIdAndUpdate(
//     request.params.id,
//     {
//       first_name: f,
//       last_name: l,
//       password: p,
//       date_of_birth: d,
//       gender: g,
//       email: e,
//       phone_number: n,
//     },
//     { new: true },
//     (error, post) => {
//       if (!error) response.json(post);
//       else {
//         console.log(error);
//         response.send("could not update post --> error");
//       }
//     }
//   );
// });

router.patch("/:id", async (request, response) => {
  const { c, d } = request.body;

  try {
    const post = await postsModel.findById(request.params.id);
    if (post) {
      if (c) post.content = c;
      if (d) post.date = d;

      const saved_post = await post.save();
      response.json(saved_post);
    } else {
      response.send(`no post found with id: ${request.params.id}`);
    }
  } catch (error) {
    console.log(error);
    response.send("could not update post --> error");
  }
});

// ==========================================================================

router.delete("/:id", async (request, response) => {
  try {
    const deleted_post = await postsModel.findByIdAndDelete(request.params.id);
    response.json(deleted_post);
  } catch (error) {
    console.log(error);
    response.send("could not delete post --> error");
  }
});
// ==========================================================================

module.exports = router;
