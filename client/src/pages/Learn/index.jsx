import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Question from '../../components/Question';
import AnswerOption from '../../components/AnswerOption';
import ResultContainer from '../../components/ResultPage';
import quizData from '../../data/quizData.json';
import style from './style.module.css';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const { quizId } = useParams();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    const quiz = quizData.quizzes.find((quiz) => quiz.id === parseInt(quizId, 10));
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
  };

  return (
    <div className={style['container']}>
      {!showResult ? (
        <>
          <Question question={selectedQuiz?.questions[currentQuestion]?.question} />
          <div>
            {selectedQuiz?.questions[currentQuestion]?.options.map((option, index) => (
              <AnswerOption
                key={index}
                option={option}
                isCorrect={option === selectedQuiz?.questions[currentQuestion]?.correctAnswer}
                isSelected={selectedOption === option}
                onClick={() => handleAnswerClick(option)}
              />
            ))}
          </div>
        </>
      ) : (
        <ResultContainer score={score} totalQuestions={selectedQuiz?.questions.length} onRestart={handleRestartQuiz} />
      )}
    </div>
  );
};

export default QuizPage;
