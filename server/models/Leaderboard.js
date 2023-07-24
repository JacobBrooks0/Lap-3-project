const db = require("../db/connect");

class Leaderboard {
  constructor({ user_id, score_spanish, score_italian }) {
    this.user_id = user_id;
    this.score_spanish = score_spanish;
    this.score_italian = score_italian;
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

    if (response.rows.length != 1) {
      throw new Error("No leaderboard available");
    }

    return new Leaderboard(response.rows[0]);
  }

  static async getLeaderboardByLanguage(language_name) {
    console.log(language_name);
    if (language_name === "spanish") {
      const response = await db.query(
        "SELECT user_id, score_spanish FROM Leaderboards GROUP BY user_id ORDER BY score_spanish DESC;"
      );
      console.log(response.rows);
      if (response.rows.length === 0) {
        throw new Error("No leaderboard available");
      }
      return response.rows.map((entry) => new Leaderboard(entry));
    } else if (language_name === "italian") {
      const response = await db.query(
        "SELECT user_id, score_italian FROM Leaderboards GROUP BY user_id ORDER BY score_italian DESC;"
      );
      console.log(response.rows);
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
}

module.exports = Leaderboard;
