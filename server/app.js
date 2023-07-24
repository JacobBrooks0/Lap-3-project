const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const userRouter = require("./routers/user");

app.get("/", (req, res) => {
  res.send({ message: "hello" });
});

app.use("/users", userRouter);

module.exports = app;
