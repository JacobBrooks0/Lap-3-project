import React, { useState } from 'react';
import Question from '../../components/Question';
import AnswerOption from '../../components/AnswerOption';
import ResultContainer from '../../components/ResultPage';
import style from './style.module.css'
import { useEffect } from 'react';

const QuizPage = () => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch('../data/quizData.json')
      .then((response) => response.json())
      .then((data) => setQuizzes(data.quizzes));
  }, []);


  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(selectedOption);
    setShowResult(false);

    setTimeout(() => {
      if (currentQuestion + 1 < quizData.length) {
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
    <div className={style["container"]}>
      {!showResult ? (
        <>
          <Question question={quizData[currentQuestion].question} />
          <div>
            {quizData[currentQuestion].options.map((option, index) => (
              <AnswerOption
                key={index}
                option={option}
                isCorrect={option === quizData[currentQuestion].correctAnswer}
                isSelected={selectedOption === option}
                onClick={() => handleAnswerClick(option)}
              />
            ))}
          </div>
        </>
      ) : (
        <ResultContainer
          score={score}
          totalQuestions={quizData.length}
          onRestart={handleRestartQuiz}
        />
      )}
    </div>
  );
};

export default QuizPage;
