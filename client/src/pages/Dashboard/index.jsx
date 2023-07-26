import React from "react";
import { Link } from 'react-router-dom';

import style from "./style.module.css";

export default function Dashboard() {
  const quizzes = [
    { id: 1, name: "Nouns" },
    { id: 2, name: "Basic Grammar" },
    { id: 3, name: "Food" },
    { id: 4, name: "Information" },
    { id: 5, name: "Bookings" },
  ];

  return (
    <div className={style["container"]}>

      <h2>Practice Rounds</h2>

      <div className={style["button-container"]}>
        {quizzes.map(quiz => (
          <Link key={quiz.id} to={`/practice/${quiz.id}`} className={style["practice-button"]}>
            {quiz.name}
          </Link>
        ))}
      </div>

      <h2>Test your knowledge</h2>

      <div className={style["card-container"]}>
        {quizzes.map(quiz => (
          <Link key={quiz.id} to={`/learn/${quiz.id}`} className={style["quiz-card"]}>
            {quiz.name}
          </Link>
        ))}
      </div>
    </div>
  );


  // const handlePracticeClick = (selectedOption) => {

  //   setSelectedOption(selectedOption);

  // }
  // return (
  //   <>
  //     <main id="dashboard" className={style["container"]}>


  //     </main>
  //   </>
  // );
}
