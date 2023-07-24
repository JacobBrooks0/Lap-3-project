const db = require ("../db/connect");

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

    //GET all quizzes by ID

      static async getAllQuizzesByUserId(user_id) {
        const response = await db.query("SELECT * FROM Quizzes WHERE user_id = $1", [user_id]);
        const quizzes = response.rows.map((quizData) => new Quiz(quizData));
        return quizzes;
    
    }

    // Get all quizzes associated with a specific language ID
  static async getQuizzesByLanguageId(languageId) {
    const response = await db.query("SELECT * FROM Quizzes WHERE language_id = $1", [languageId]);
    const quizzes = response.rows.map((quizData) => new Quiz(quizData));
    return quizzes;
  }

  // Get all beginner quizzes
  static async getBeginnerQuizzes() {
    const response = await db.query("SELECT * FROM Quizzes WHERE beginner = true");
    const quizzes = response.rows.map((quizData) => new Quiz(quizData));
    return quizzes;
  }

  // Get all intermediate quizzes
  static async getIntermediateQuizzes() {
    const response = await db.query("SELECT * FROM Quizzes WHERE intermediate = true");
    const quizzes = response.rows.map((quizData) => new Quiz(quizData));
    return quizzes;
  }

  // Get all advanced quizzes
  static async getAdvancedQuizzes() {
    const response = await db.query("SELECT * FROM Quizzes WHERE advanced = true");
    const quizzes = response.rows.map((quizData) => new Quiz(quizData));
    return quizzes;
  }
}




module.exports = Quiz;