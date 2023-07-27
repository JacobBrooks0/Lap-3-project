const db = require("../db/connect");

class Leaderboard {
  constructor({
    user_id,
    username,
    score_spanish,
    score_italian,
    rank,
    total,
  }) {
    this.user_id = user_id;
    this.username = username;
    this.score_spanish = score_spanish;
    this.score_italian = score_italian;
    this.rank = rank;
    this.total = score_spanish + score_italian;
  }

  static async getAllLeaderboardEntries() {
    const response = await db.query(
      "SELECT *, SUM(score_spanish + score_italian) AS Total FROM leaderboards GROUP BY user_id ORDER BY Total DESC"
    );

    if (response.rows.length === 0) {
      throw new Error("No leaderboard available");
    }

    return response.rows.map((entry) => new Leaderboard(entry));
  }

  static async getLeaderboardByUserId(id) {
    const response = await db.query(
      "SELECT * FROM Leaderboards WHERE user_id = $1;",
      [id]
    );

    if (response.rows.length === 0) {
      throw new Error("No leaderboard available");
    }

    return new Leaderboard(response.rows[0]);
  }

  static async getLeaderboardByLanguage(language_name) {
    if (language_name === "spanish") {
      const response = await db.query(
        "SELECT user_id, score_spanish FROM Leaderboards GROUP BY user_id ORDER BY score_spanish DESC;"
      );

      if (response.rows.length === 0) {
        throw new Error("No leaderboard available");
      }
      return response.rows.map((entry) => new Leaderboard(entry));
    } else if (language_name === "italian") {
      const response = await db.query(
        "SELECT user_id, score_italian FROM Leaderboards GROUP BY user_id ORDER BY score_italian DESC;"
      );

      if (response.rows.length === 0) {
        throw new Error("No leaderboard available");
      }
      return response.rows.map((entry) => new Leaderboard(entry));
    } else {
      throw new Error("No leaderboard available");
    }
  }

  async updateLeaderboardEntry(body) {
    try {
      const {
        score_spanish = this.score_spanish,
        score_italian = this.score_italian,
      } = body;

      const data = await db.query(
        "UPDATE Leaderboards SET score_spanish = $1, score_italian = $2 WHERE user_id = $3 RETURNING *",
        [
          parseInt(this.score_spanish) + parseInt(body.score_spanish),
          parseInt(this.score_italian) + parseInt(body.score_italian),
          parseInt(this.user_id),
        ]
      );

      return data.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update entry");
    }
  }

  static async updateLeaderboards(body) {
    try {
      if (body.language_id == 1) {
        await db.query(
          "UPDATE Leaderboards SET score_spanish = (SELECT (SELECT COALESCE(SUM(beginner_score), 0) FROM Quizzes WHERE language_id = $1 AND  user_id = $2) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM Quizzes WHERE language_id = $1 AND  user_id = $2) + (SELECT COALESCE(SUM(advanced_score), 0) FROM Quizzes WHERE language_id = $1 AND  user_id = $2)) WHERE user_id = $2;",
          [body.language_id, body.user_id]
        );

        await db.query(
          "UPDATE Leaderboards SET rank = CASE WHEN CAST(score_italian as INT) + CAST(score_spanish as INT) > 160 THEN 5 WHEN CAST(score_italian as INT) + CAST(score_spanish as INT)  > 120 THEN 4 WHEN CAST(score_italian as INT) + CAST(score_spanish as INT)  > 80 THEN 3 WHEN CAST(score_italian as INT) + CAST(score_spanish as INT)  > 40 THEN 2 ELSE 1 END WHERE user_id = $1",
          [body.user_id]
        );
      } else {
        await db.query(
          "UPDATE Leaderboards SET score_italian = (SELECT (SELECT COALESCE(SUM(beginner_score), 0) FROM Quizzes WHERE language_id = $1 AND  user_id = $2) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM Quizzes WHERE language_id = $1 AND  user_id = $2) + (SELECT COALESCE(SUM(advanced_score), 0) FROM Quizzes WHERE language_id = $1 AND  user_id = $2)) WHERE user_id = $2;",
          [body.language_id, body.user_id]
        );

        await db.query(
          "UPDATE Leaderboards SET rank = CASE WHEN CAST(score_italian as INT) + CAST(score_spanish as INT) > 160 THEN 5 WHEN CAST(score_italian as INT) + CAST(score_spanish as INT)  > 120 THEN 4 WHEN CAST(score_italian as INT) + CAST(score_spanish as INT)  > 80 THEN 3 WHEN CAST(score_italian as INT) + CAST(score_spanish as INT)  > 40 THEN 2 ELSE 1 END WHERE user_id = $1",
          [body.user_id]
        );
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update entry");
    }
  }
}

module.exports = Leaderboard;
