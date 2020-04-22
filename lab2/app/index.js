const express = require("express");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

const app = express();

//--------------------------------------------

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

//--------------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) => {
  if (!error) console.log(`server started at port ${PORT}`);
  else console.log(error);
});
