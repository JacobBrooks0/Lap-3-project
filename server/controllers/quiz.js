const Quiz = require("../models/Quiz");
const User = require("../models/User");
const Leaderboard = require("../models/Leaderboard");

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
    console.log(quizzes);
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

async function getAllInfo(req, res) {
  const id = req.user.user_id;
  try {
    const { language_id, quiz_id } = req.params;
    const quizInfo = await Quiz.getAllInfoForOneUser(id, language_id, quiz_id);
    res.status(200).json(quizInfo);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function createQuizInstance(req, res) {
  try {
    const data = req.body;
    const newEntry = await Quiz.createQuiz(data);
    const updateLeaderboard = await Leaderboard.updateLeaderboards(newEntry);
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quizzes." });
  }
}

async function updateQuizInstance(req, res) {
  try {
    const userId = req.params.user_id;
    const data = req.body;
    const newEntry = await Quiz.getAllInfoForOneUser(
      userId,
      data.language_id,
      data.quiz_id
    );
    const instanceToUpdate = await newEntry.updateQuizInstance(data);
    const updateLeaderboard = await Leaderboard.updateLeaderboards(
      instanceToUpdate
    );
    res.status(201).json(instanceToUpdate);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quizzes." });
  }
}

module.exports = {
  show,
  showById,
  getQuizByQuizId,
  showByLanguageId,
  getBeginnerQuizzes,
  getIntermediateQuizzes,
  getAdvancedQuizzes,
  getAllInfo,
  createQuizInstance,
  updateQuizInstance,
};
