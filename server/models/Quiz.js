const db = require("../db/connect");

class Quiz {
  constructor({
    quiz_instance,
    quiz_id,
    user_id,
    language_id,
    beginner_score,
    intermediate_score,
    advanced_score,
  }) {
    this.quiz_instance = quiz_instance;
    this.quiz_id = quiz_id;
    this.user_id = user_id;
    this.language_id = language_id;
    this.beginner_score = beginner_score;
    this.intermediate_score = intermediate_score;
    this.advanced_score = advanced_score;
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
  static async getQuizByQuizId(quiz_id) {
    try {
      const response = await db.query(
        "SELECT * FROM Quizzes WHERE quiz_id = $1",
        [quiz_id]
      );
      if (response.rows.length === 0) {
        return null; // Return null if no quiz is found with the provided quiz_id
      }
      const quizzes = response.rows.map((instance) => new Quiz(instance));
      return quizzes; // Create a new Quiz instance from the retrieved quiz data
    } catch (error) {
      throw new Error("Failed to fetch the quiz from the database.");
    }
  }

  static async getAllQuizzesByUserId(user_id) {
    const response = await db.query(
      "SELECT * FROM Quizzes WHERE user_id = $1",
      [user_id]
    );
    const quizzes = response.rows.map((quizData) => new Quiz(quizData));
    return quizzes;
  }

  // Get all quizzes associated with a specific language ID
  static async getQuizzesByLanguageId(languageId) {
    const response = await db.query(
      "SELECT * FROM Quizzes WHERE language_id = $1",
      [languageId]
    );
    const quizzes = response.rows.map((quizData) => new Quiz(quizData));
    return quizzes;
  }

  // Get all beginner quizzes
  static async getBeginnerQuizzes() {
    const response = await db.query(
      "SELECT quiz_instance, quiz_id, user_id, beginner_score, language_id FROM Quizzes"
    );
    const quizzes = response.rows.map((quizData) => new Quiz(quizData));
    return quizzes;
  }

  // Get all intermediate quizzes
  static async getIntermediateQuizzes() {
    const response = await db.query(
      "SELECT quiz_instance, quiz_id, user_id, intermediate_score, language_id FROM Quizzes"
    );
    const quizzes = response.rows.map((quizData) => new Quiz(quizData));
    return quizzes;
  }

  // Get all advanced quizzes
  static async getAdvancedQuizzes() {
    const response = await db.query(
      "SELECT quiz_instance, quiz_id, user_id, advanced_score, language_id FROM Quizzes"
    );
    const quizzes = response.rows.map((quizData) => new Quiz(quizData));
    return quizzes;
  }

  static async getAllInfoForOneUser(id, language_id, quiz_id) {
    const response = await db.query(
      "SELECT * FROM Quizzes WHERE user_id = $1 AND quiz_id = $2 AND language_id = $3;",
      [id, quiz_id, language_id]
    );

    if (response.rows.length != 1) {
      throw new Error("No Entry available for this user");
    }

    const quiz = response.rows[0];
    return quiz;
  }

  static async createQuiz(data) {
    const {
      quiz_id,
      user_id,
      beginner_score,
      intermediate_score,
      advanced_score,
      language_id,
    } = data;

    const response = await db.query(
      "INSERT INTO Quizzes(quiz_id, user_id, beginner_score, intermediate_score, advanced_score, language_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        quiz_id,
        user_id,
        beginner_score,
        intermediate_score,
        advanced_score,
        language_id,
      ]
    );

    if (response.rows.length != 1) {
      throw new Error("Unable to add quiz");
    }

    //get quiz by quiz id where language id = language from above
    const newQuiz = response.rows[0];
    const newEntry = await Quiz.getAllInfoForOneUser(
      user_id,
      language_id,
      quiz_id
    );

    return new Quiz(newEntry);
  }
}

module.exports = Quiz;
