import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Question from '../../components/Question';
import AnswerOption from '../../components/AnswerOption';
import ResultContainer from '../../components/ResultPage';
import quizData from '../../data/quizData.json';
import style from './style.module.css';

const QuizPage = ({ setSelectedLanguage }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

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
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handleRestartQuiz = async () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);

    const getLanguageId = (language) => {
      return language === 'Spanish' ? 1 : 2;
    };

    const getQuizId = (selectedQuiz) => {
      if (selectedQuiz.language === 'Spanish') {
        return selectedQuiz.id - 5;
      } else {
        return selectedQuiz.id;
      }
    };

    const language_id = getLanguageId(selectedQuiz.language);
    const quiz_id = getQuizId(selectedQuiz);

    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };


    let hasQuiz = true;
    let existingScore;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/quizzes/${language_id}/${quiz_id}`,
        config
      );

      existingScore = data;

    } catch (error) {
      hasQuiz = false;
    }

    console.log(hasQuiz);

    try {

      if (hasQuiz) {
        await axios.patch(`${import.meta.env.VITE_SERVER}/quizzes`, {
          quiz_id,
          language_id,
          beginner_score: score * 8,

        }, config
        );
        console.log('Quiz results updated successfully.');
      } else {
        await axios.post(`${import.meta.env.VITE_SERVER}/quizzes`, {
          quiz_id,
          language_id,
          beginner_score: score * 8,
          intermediate_score: 0,
          advanced_score: 0
        }, config);
        console.log('New quiz results saved successfully.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackToDashboard = async () => {
    setSelectedLanguage(selectedQuiz.language);

    const getLanguageId = (language) => {
      return language === 'Spanish' ? 1 : 2;
    };

    const getQuizId = (selectedQuiz) => {
      if (selectedQuiz.language === 'Spanish') {
        return selectedQuiz.id - 5;
      } else {
        return selectedQuiz.id;
      }
    };

    const language_id = getLanguageId(selectedQuiz.language);
    const quiz_id = getQuizId(selectedQuiz);

    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };


    let hasQuiz = true;
    let existingScore;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/quizzes/${language_id}/${quiz_id}`,
        config
      );

      existingScore = data;

    } catch (error) {
      hasQuiz = false;
    }

    console.log(hasQuiz);

    try {

      if (hasQuiz) {
        await axios.patch(`${import.meta.env.VITE_SERVER}/quizzes`, {
          quiz_id,
          language_id,
          beginner_score: score * 8,

        }, config
        );
        console.log('Quiz results updated successfully.');
      } else {
        await axios.post(`${import.meta.env.VITE_SERVER}/quizzes`, {
          quiz_id,
          language_id,
          beginner_score: score * 8,
          intermediate_score: 0,
          advanced_score: 0
        }, config);
        console.log('New quiz results saved successfully.');
      }
    } catch (error) {
      console.log(error);
    }
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
        <>
          <ResultContainer score={score} totalQuestions={selectedQuiz?.questions.length} onRestart={handleRestartQuiz} />
          <Link to="/dashboard">
            <button className={style['back-button']} onClick={handleBackToDashboard}>
              Back to Dashboard
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default QuizPage;
