const { Router } = require("express");
const isAuthenticated = require("../middleware/authenticator");
const quizController = require("../controllers/quiz");

const quizRouter = Router();

//GET route to return all quizzes
quizRouter.get("/", isAuthenticated, quizController.show);


//GET route to return all quizzes by UserID
quizRouter.get("/user", isAuthenticated, quizController.showById);

//GET route to return all quizzes by language ID
quizRouter.get(
  "/language/:languageId",
  isAuthenticated,
  quizController.showByLanguageId
);
//GET route to return all the quiz by lvl
quizRouter.get(
  "/level/beginner",
  isAuthenticated,
  quizController.getBeginnerQuizzes
);
quizRouter.get(
  "/level/intermediate",
  isAuthenticated,
  quizController.getIntermediateQuizzes
);
quizRouter.get(
  "/level/advanced",
  isAuthenticated,
  quizController.getAdvancedQuizzes
);

//GET route for all information about a quiz user and language
quizRouter.get(
  "/:language_id/:quiz_id",
  isAuthenticated,
  quizController.getAllInfo
);

//POSTS a new quiz instance for a user
quizRouter.post("/", isAuthenticated, quizController.createQuizInstance);

//quizRouter.patch
quizRouter.patch("/", isAuthenticated, quizController.updateQuizInstance);

//!must place routes with params below the ones without
//GET by quiz id
quizRouter.get("/:id", isAuthenticated, quizController.getQuizByQuizId);

module.exports = quizRouter;
