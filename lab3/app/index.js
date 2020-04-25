const express = require("express");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const loginRouter = require("./routes/login");
const mongoose = require("mongoose");
const logs = require("./middleware/logs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const myjwt = require("./middleware/jwt");

const app = express();

//--------------------------------------------
mongoose.connect(
  "mongodb://localhost:27017/blognodejs",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!error) console.log(`mongo connected server started`);
    else console.log(error);
  }
);
//--------------------------------------------

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logs.log);
app.use(cookieParser());

app.use("/users/login", loginRouter);

app.use((req, res, next) => {
  const token = req.cookies.token;
  console.log("token is: ", token);

  if (!token) {
    res.status(401).send("Unauthorized! plz login first");
    next();
  }

  try {
    jwt.verify(token, myjwt.jwtKey);
    next();
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      res.status(401).send("Unauthorized! plz login first");
      next();
    }
    res.status(401).send("Unauthorized! plz login first");
    next();
  }
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use((err, req, res, next) => {
  debugger;
  res.status(500).send(err);
});
//--------------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) => {
  if (!error) console.log(`server started at port ${PORT}`);
  else console.log(error);
});
