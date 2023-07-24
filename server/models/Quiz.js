const db = require("../db/connect");

class Quiz {
    constructor({ quiz_id, user_id, language_id, beginner, intermediate, advanced }) {
      this.quiz_id = quiz_id;
      this.user_id = user_id;
      this.language_id = language_id;
      this.beginner = beginner;
      this.intermediate = intermediate;
      this.advanced = advanced;
    }

    static async getAllQuizzes() {
        try {
          const response = await db.query("SELECT * FROM Quizzes");
          return response.rows;
        } catch (error) {
          throw new Error("Failed to fetch quizzes from the database.");
        }
      }









}

module.exports = Quiz;