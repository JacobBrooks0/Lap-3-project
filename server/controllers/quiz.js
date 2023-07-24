const Quiz = require("../models/Quiz");

async function getAllQuizzes(req, res) {
  try {
    const quizzes = await Quiz.getAllQuizzes();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quizzes." });
  }
}

// Other functions for other routes
module.exports = {
  getAllQuizzes,

};