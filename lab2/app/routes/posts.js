const express = require("express");
const postsModel = require("../models/posts");

const router = express.Router();

// ==========================================================================

router.use((request, response, next) => {
  console.log("posts routes");
  next();
});

// ==========================================================================

router.get("/", (request, response) => {
  postsModel.find({}, (error, posts) => {
    if (!error) response.json(posts);
    else {
      console.log(error);
      response.send("could not update post --> error");
    }
  });
});

router.get("/:id", (request, response) => {
  postsModel.findById(request.params.id, (error, posts) => {
    if (!error) response.json(posts);
    else {
      console.log(error);
      response.send("could not get post --> error");
    }
  });
});

// ==========================================================================

router.post("/", (request, response) => {
  const { a, d, c } = request.body;

  const new_post = new postsModel({
    author: a,
    content: c,
    date: d,
  });

  new_post.save((error, post) => {
    if (!error) response.json(post);
    else {
      console.log(error);
      response.send("could not save post --> error");
    }
  });
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

router.patch("/:id", (request, response) => {
  const { c, d } = request.body;

  postsModel.findById(request.params.id, (error, post) => {
    if (!error) {
      if (post) {
        if (c) post.content = c;
        if (d) post.date = d;

        post.save((error, post) => {
          if (!error) {
            response.json(post);
          } else {
            console.log(error);
            response.send("could not update post --> error");
          }
        });
      } else {
        response.send(`no post found with id: ${request.params.id}`);
      }
    } else {
      console.log(error);
      response.send("could not update post --> error");
    }
  });
});

// ==========================================================================

router.delete("/:id", (request, response) => {
  postsModel.findByIdAndDelete(request.params.id, (error, post) => {
    if (!error) response.json(post);
    else {
      console.log(error);
      response.send("could not update post --> error");
    }
  });
});
// ==========================================================================

module.exports = router
