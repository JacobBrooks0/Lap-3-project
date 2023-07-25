const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const userRouter = require("./routers/user");
const leaderboardRouter = require("./routers/leaderboard");
const quizRouter = require("./routers/quiz");

app.get("/", (req, res) => {
  res.send({ message: "hello" });
});

app.use("/users", userRouter);
app.use("/leaderboards", leaderboardRouter);
app.use("/quizzes", quizRouter)

module.exports = app;
