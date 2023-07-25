const { Router } = require("express");
const leaderboardRouter = Router();

const leaderboardController = require("../controllers/leaderboard");

//gets all the leaderboard
leaderboardRouter.get("/", leaderboardController.index);

// //gets a leaderboard by its language id
leaderboardRouter.get("/:language_name", leaderboardController.show);

// //gets a leaderboard entry by user id
leaderboardRouter.get("/user/:user_id", leaderboardController.showUser);

// //patches a score for a user for an entry
leaderboardRouter.patch("/user/:user_id", leaderboardController.update);

module.exports = leaderboardRouter;
