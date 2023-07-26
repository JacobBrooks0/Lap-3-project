const db = require("../db/connect");

class User {
  constructor({ user_id, username, email, password }) {
    this.user_id = user_id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
  //implement all the details that are not null from the table

  //gets users by ID
  static async getOneById(id) {
    const response = await db.query("SELECT * FROM Users WHERE user_id = $1", [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  //gets user by username
  static async getOneByUsername(username) {
    const response = await db.query("SELECT * FROM Users WHERE username = $1", [
      username,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  //new user in the db
  static async create(data) {
    const { username, email, password } = data;

    let response = await db.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id;",
      [username, email, password]
    );

    const newId = response.rows[0].user_id;

    let leaderboardsResponse = await db.query(
      "INSERT INTO Leaderboards (user_id) VALUES ($1) RETURNING user_id;",
      [newId]
    );

    if (response.rows.length != 1) {
      throw new Error("Unable to add new user.");
    } else {
      const newUser = await User.getOneById(newId);
      return newUser;
    }
  }

  async deleteUser() {
    // firstly have to delete foreign key constraints
    const quizResponse = await db.query(
      "DELETE FROM Quizzes WHERE user_id = $1 RETURNING *;",
      [this.user_id]
    );

    const leaderboardsResponse = await db.query(
      "DELETE FROM Leaderboards WHERE user_id = $1 RETURNING *;",
      [this.user_id]
    );

    const tokenResponse = await db.query(
      "DELETE FROM token WHERE user_id = $1 RETURNING *",
      [this.user_id]
    );

    const response = await db.query(
      "DELETE FROM Users WHERE user_id = $1 RETURNING *;",
      [this.user_id]
    );

    if (tokenResponse.rows.length === 0) {
      throw new Error("Unable to delete user. User not found.");
    }

    if (response.rows.length === 0) {
      throw new Error("Unable to delete user. User not found.");
    }

    return new User(response.rows[0]);
  }
}

//update method

module.exports = User;
