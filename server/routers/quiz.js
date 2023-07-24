const { Router } = require("express");
const { authenticator } = require("../middleware/authenticator");
const quizController = require("../controllers/quizController");
//controllers
const {
    authenticator
  } = require("../middleware/authenticator");

const quizRouter = Router()

//GET route to return all quizzes 
quizRouter.get("/", authenticator, quizController.getAllQuizzes);
//GET route to return all quizzes by UserID
quizRouter.get("/:id", authenticator, quizController.getQuizById);
//GET route to return all quizzes by language ID
quizRouter.get("/language/:languageId", authenticator, quizController.getQuizByLanguageId);
//GET route tto return all the quiz by lvl
quizRouter.get("/beginner", authenticator, quizController.getBeginnerQuizzes);
quizRouter.get("/intermediate", authenticator, quizController.getIntermediateQuizzes);
quizRouter.get("/advanced", authenticator, quizController.getAdvancedQuizzes);

module.exports = quizRouter;
