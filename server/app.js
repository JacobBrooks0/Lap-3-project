const express = require("express");
const cors = require("cors");

const logRoutes = require("./middleware/logger");
const userRouter = require("./routers/user");
const leaderboardRouter = require("./routers/leaderboard");
const quizRouter = require("./routers/quiz");


const app = express();
app.use(cors());
app.use(express.json());
app.use(logRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Cosmoglots API" });
});

app.use("/users", userRouter);
app.use("/leaderboards", leaderboardRouter);
app.use("/quizzes", quizRouter)

module.exports = app;
