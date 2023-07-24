const { Router } = require("express");
const { authenticator } = require("../middleware/authenticator");
const quizController = require("../controllers/quiz");

const quizRouter = Router()

//GET route to return all quizzes 
quizRouter.get("/", authenticator, quizController.show);
//GET by quiz id
quizRouter.get("/:id", authenticator, quizController.getQuizByQuizId);

//GET route to return all quizzes by UserID
quizRouter.get("/user/:id", authenticator, quizController.showById);
//GET route to return all quizzes by language ID
quizRouter.get("/language/:languageId", authenticator, quizController.showByLanguageId);
//GET route tto return all the quiz by lvl
quizRouter.get("/beginner", authenticator, quizController.getBeginnerQuizzes);
quizRouter.get("/intermediate", authenticator, quizController.getIntermediateQuizzes);
quizRouter.get("/advanced", authenticator, quizController.getAdvancedQuizzes);


//POSTS a new quiz instance for a user 
quizRouter.post("/:id", authenticator, quizController.createQuizInstance)
//quizRouter.patch
module.exports = quizRouter;
