const db = require("../db/connect");

class Quiz {
    constructor({ quiz_instance, quiz_id, user_id, language_id, beginner, intermediate, advanced }) {
      this.quiz_instance = quiz_instance;
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

      static async getAllQuizzesByUserId(user_id) {
        const response = await db.query("SELECT * FROM Quizzes WHERE user_id = $1", [user_id]);
        const quizzes = response.rows.map((quizData) => new Quiz(quizData));
        return quizzes;
    
    }

    static asnyc createQuizEntry(data) {
      const {quiz_id, user_id, beginner_score, intermediate_score, advanced_score, language_id} = data

    }







}

module.exports = Quiz;