const Leaderboard = require("../models/Leaderboard");

async function index(req, res) {
  try {
    const result = await Leaderboard.getAllLeaderboardEntries();
    res.status(200).send(result);
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const languageName = req.params.language_name;
    const result = await Leaderboard.getLeaderboardByLanguage(
      languageName.toLowerCase()
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function showUser(req, res) {
  try {
    const id = req.user.user_id;
    const result = await Leaderboard.getLeaderboardByUserId(id);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function update(req, res) {
  const id = req.user.user_id;
  const userInput = req.body;
  try {
    const entryToUpdate = await Leaderboard.getLeaderboardByUserId(id);
    const result = await entryToUpdate.updateLeaderboardEntry(userInput);
    res.status(201).send(`Successfully updated user ${result.user_id}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  index,
  show,
  showUser,
  update,
};
