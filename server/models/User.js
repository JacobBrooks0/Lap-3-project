const db = require("../db/connect");

class User {
  constructor({ user_id, username, email, password,creation_date, last_login, streak }) {
    this.user_id = user_id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.creationDate = creation_date;
    this.last_login = last_login;
    this.streak = streak;
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

  async updateUser() {
    const time = new Date();

    //calculcation of day length
    let timer = time - this.last_login < 24 * 3600000 ? this.last_login : time;
    let streak;
    if (time - this.last_login < 24 * 3600000) {
      streak = this.streak;
    } else if (time - this.last_login < 48 * 3600000) {
      streak = this.streak + 1;
    } else {
      streak = 0;
    }

    const response = await db.query(
      "UPDATE Users SET last_login = $1, streak = $2 WHERE user_id = $3 RETURNING *;",
      [timer, streak, this.user_id]
    );

    if (response.rows.length != 1) {
      throw new Error("Unable to add new user.");
    } else {
      const newUser = await User.getOneById(this.user_id);
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
