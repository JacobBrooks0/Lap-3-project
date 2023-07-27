const { Router } = require("express");
const leaderboardRouter = Router();
const isAuthenticated = require("../middleware/authenticator");

const leaderboardController = require("../controllers/leaderboard");

//gets all the leaderboard
leaderboardRouter.get("/", leaderboardController.index);

//waterfall effect so all routes below this use authentication 
leaderboardRouter.use(isAuthenticated);
//gets a users leaderboard entry
leaderboardRouter.get("/user", leaderboardController.showUser);
//updates a users leaderboard entry
leaderboardRouter.patch("/user", leaderboardController.update);
//!must place routes with params below the ones without
//gets a leaderboard by its language id
leaderboardRouter.get("/:language_name", leaderboardController.show);


module.exports = leaderboardRouter;
