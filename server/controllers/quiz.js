const Quiz = require("../models/Quiz");
const User = require("../models/User");

async function show(req, res) {
  try {
    const quizzes = await Quiz.getAllQuizzes();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quizzes." });
  }
}

async function showById(req, res) {
    try {
      const user_id = req.params.id;
      const quizzes = await Quiz.getAllQuizzesByUserId(user_id);
      res.status(200).json(quizzes);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

async function create(req, res) {
  try {
    const data = req.body;
    const checker = await User.getOneById(data.user_id)
    // do check to determine if the user exists
    const newEntry = await Quiz.createQuizEntry(data)
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quizzes." });
  }
}

// Other functions for other routes
module.exports = {
  show, showById, create
};