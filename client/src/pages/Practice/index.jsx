import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Question from "../../components/Question";
import AnswerOption from "../../components/AnswerOption";
import ResultContainer from "../../components/ResultPage";
import quizData from "../../data/quizData.json";
import style from "./style.module.css";

const Practice = ({ setSelectedLanguage }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const { quizId } = useParams();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    const parsedQuizId = parseInt(quizId, 10);
    const quiz = quizData.quizzes.find((quiz) => quiz.id === parsedQuizId);
    setSelectedQuiz(quiz);
  }, [quizId]);

  const handleAnswerClick = (selectedOption) => {
    const currentQuiz = selectedQuiz.questions[currentQuestion];

    if (selectedOption === currentQuiz.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(selectedOption);
    setShowResult(false);

    setTimeout(() => {
      if (currentQuestion + 1 < selectedQuiz.questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setShowHint(false);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setShowHint(false);
  };

  const handleBackToDashboard = () => {
    setSelectedLanguage(selectedQuiz.language);
  };

  const handleHintClick = () => {
    setShowHint(true);
  };

  return (
    <div className={`page ${style["outer-container"]}`}>
      <main className={style["container"]}>
        {!showResult ? (
          <>
            <Question
              question={selectedQuiz?.questions[currentQuestion]?.question}
            />
            <div className={style["answer-options"]}>
              {selectedQuiz?.questions[currentQuestion]?.options.map(
                (option, index) => (
                  <AnswerOption
                    key={index}
                    option={option}
                    isCorrect={
                      option ===
                      selectedQuiz?.questions[currentQuestion]?.correctAnswer
                    }
                    isSelected={selectedOption === option}
                    onClick={() => handleAnswerClick(option)}
                  />
                )
              )}
            </div>
            {showHint && selectedQuiz?.questions[currentQuestion]?.hint && (
              <div className={style["hint-container"]}>
                <p className={style["hint"]}>
                  Hint: {selectedQuiz.questions[currentQuestion].hint}
                </p>
              </div>
            )}
            {selectedOption &&
              selectedQuiz?.questions[currentQuestion]?.explanation && (
                <div className={style["explanation-container"]}>
                  <p className={style["explanation"]}>
                    Explanation:{" "}
                    {selectedQuiz.questions[currentQuestion].explanation}
                  </p>
                </div>
              )}
            {!selectedOption && !showHint && (
              <div className={style["show-hint-container"]}>
                <button
                  className={style["show-hint-button"]}
                  onClick={handleHintClick}
                >
                  Show Hint
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <ResultContainer
              score={score}
              totalQuestions={selectedQuiz?.questions.length}
              onRestart={handleRestartQuiz}
            />
            <Link to="/dashboard">
              <button
                className={style["back-button"]}
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </button>
            </Link>
          </>
        )}
      </main>
    </div>
  );
};

export default Practice;
