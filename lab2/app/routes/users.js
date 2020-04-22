const express = require("express");
const userModel = require("../models/users");

const router = express.Router();

// ==========================================================================

router.use((request, response, next) => {
  console.log("users routes");
  next();
});

// ==========================================================================

router.get("/", (request, response) => {
  userModel.find({}, (error, users) => {
    if (!error) response.json(users);
    else {
      console.log(error);
      response.send("could not update user --> error");
    }
  });
});

router.get("/:id", (request, response) => {
  userModel.findById(request.params.id, (error, users) => {
    if (!error) response.json(users);
    else {
      console.log(error);
      response.send("could not get user --> error");
    }
  });
});

// ==========================================================================

router.post("/", (request, response) => {
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

  new_user.save((error, user) => {
    if (!error) response.json(user);
    else {
      console.log(error);
      response.send("could not update user --> error");
    }
  });
});

// ==========================================================================

// router.patch("/:id", (request, response) => {
//   const { f, l, e, d, g, p, n } = request.body;

//   userModel.findByIdAndUpdate(
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
//     (error, user) => {
//       if (!error) response.json(user);
//       else {
//         console.log(error);
//         response.send("could not update user --> error");
//       }
//     }
//   );
// });

router.patch("/:id", (request, response) => {
  const { f, l, e, d, g, n } = request.body;

  userModel.findById(request.params.id, (error, user) => {
    if (!error) {
      if (user) {
        if (f) user.first_name = f;
        if (l) user.last_name = l;
        if (e) user.email = e;
        if (d) user.date_of_birth = d;
        if (g) user.gender = g;
        if (n) user.phone_number = n;

        user.save((error, user) => {
          if (!error) {
            response.json(user);
          } else {
            console.log(error);
            response.send("could not update user --> error");
          }
        });
      } else {
        response.send(`no user found with id: ${request.params.id}`);
      }
    } else {
      console.log(error);
      response.send("could not update user --> error");
    }
  });
});

// ==========================================================================

router.delete("/:id", (request, response) => {
  userModel.findByIdAndDelete(request.params.id, (error, user) => {
    if (!error) response.json(user);
    else {
      console.log(error);
      response.send("could not update user --> error");
    }
  });
});

module.exports = router;
