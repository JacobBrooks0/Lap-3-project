import React, { useContext } from "react";
import { Link } from "react-router-dom";
import quizData from "../../data/quizData.json";
import style from "./style.module.css";
import { LanguageButton } from "../../components";
import LanguageContext from "../../contexts/Language";

export default function Dashboard() {
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);

  const filteredQuiz = quizData.quizzes.filter(
    (quiz) => quiz.language === selectedLanguage
  );

  return (
    <div className={`page ${style["outer-container"]}`}>
      <main className={style["inner-container"]}>
        <div className={style["lang-select"]}>
          <h1>Select A Language</h1>
          <LanguageButton />
        </div>
        <div className={style["learn-quiz"]}>
          <h2>Practice your skills</h2>
          <div className={style["button-container"]}>
            {filteredQuiz.map((quiz) => (
              <Link
                key={quiz.id}
                to={`/practice/${quiz.id}`}
                className={style["quiz-button"]}
              >
                {quiz.name}
              </Link>
            ))}
          </div>
          <h2>Test your knowledge</h2>
          <div className={style["button-container"]}>
            {filteredQuiz.map((quiz) => (
              <Link
                key={quiz.id}
                to={`/learn/${quiz.id}`}
                className={style["quiz-button"]}
              >
                {quiz.name}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
