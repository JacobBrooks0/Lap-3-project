const { v4: uuidv4 } = require("uuid");

const db = require("../db/connect");

class Token {
  constructor({ token_id, user_id, token }) {
    this.token_id = token_id;
    this.user_id = user_id;
    this.token = token;
  }

  static async create(id) {
    //generate token & store it in the db
    const token = uuidv4();
    const response = await db.query(
      "INSERT INTO token (user_id, token) VALUES ($1, $2) RETURNING token_id;",
      [id, token]
    );
    const newId = response.rows[0].token_id;
    const newToken = await Token.getOneById(newId);
    return newToken;
  }
  //Gets a token from the database based on the provided id
  static async getOneById(id) {
    const response = await db.query("SELECT * FROM token WHERE token_id = $1", [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate token.");
    } else {
      return new Token(response.rows[0]);
    }
  }
  //Gets a token from the database based on the provided token
  static async getOneByToken(token) {
    const response = await db.query("SELECT * FROM token WHERE token = $1", [
      token,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate token.");
    } else {
      return new Token(response.rows[0]);
    }
  }

  //Check if the token is valid
  static async isValidAuthToken(token) {
    const response = await db.query('SELECT user_id FROM token WHERE token = $1;', [token]);
    return response.rows.length === 1;
  }

  //Get the user ID associated with the provided token
  static async getUserIdByAuthToken(token) {
    const response = await db.query('SELECT user_id FROM token WHERE token = $1;', [token]);
    return response.rows[0]?.user_id || null;
  }


  async deleteToken() {
    await db.query("DELETE FROM token WHERE token = $1", [this.token]);
    return "Token Deleted";
  }
}

module.exports = Token;
