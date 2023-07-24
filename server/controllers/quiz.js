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
async function getQuizByQuizId(req, res) {
  try {
    const quiz_id = req.params.id;
    const quiz = await Quiz.getQuizByQuizId(quiz_id);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found." });
    }
    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch the quiz." });
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

// Get all quizzes by language ID
async function showByLanguageId(req, res) {
  try {
    const languageId = req.params.languageId;
    const quizzes = await Quiz.getQuizzesByLanguageId(languageId);
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// Get all beginner quizzes
async function getBeginnerQuizzes(req, res) {
  try {
    const quizzes = await Quiz.getBeginnerQuizzes();
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// Get all intermediate quizzes
async function getIntermediateQuizzes(req, res) {
  try {
    const quizzes = await Quiz.getIntermediateQuizzes();
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// Get all advanced quizzes
async function getAdvancedQuizzes(req, res) {
  try {
    const quizzes = await Quiz.getAdvancedQuizzes();
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}
module.exports = {
  show, showById, getQuizByQuizId, create,
  showByLanguageId,
  getBeginnerQuizzes,
  getIntermediateQuizzes,
  getAdvancedQuizzes,
};