const { Router } = require("express");
const { authenticator } = require("../middleware/authenticator");
const quizController = require("../controllers/quiz");

const quizRouter = Router();

//GET route to return all quizzes
quizRouter.get("/", quizController.show);
//GET by quiz id
quizRouter.get("/:id", quizController.getQuizByQuizId);

//GET route to return all quizzes by UserID
quizRouter.get("/user/:id", quizController.showById);
//GET route to return all quizzes by language ID
quizRouter.get("/language/:languageId", quizController.showByLanguageId);
//GET route tto return all the quiz by lvl
quizRouter.get("/level/beginner", quizController.getBeginnerQuizzes);
quizRouter.get("/level/intermediate", quizController.getIntermediateQuizzes);
quizRouter.get("/level/advanced", quizController.getAdvancedQuizzes);

//POSTS a new quiz instance for a user
// quizRouter.post("/:id", quizController.createQuizInstance)
//quizRouter.patch
module.exports = quizRouter;
