import React from "react";
import { useAuth } from "../../contexts";
import { Link } from 'react-router-dom';

import style from "./style.module.css";

export default function Dashboard() {
  const { user } = useAuth();


  const quizzes = [
    { id: 1, name: "Nouns" },
    { id: 2, name: "Basic Grammar" },
    { id: 3, name: "Food" },
    { id: 4, name: "Information" },
    { id: 5, name: "Bookings" },
  ];

  return (
    <div>
      <h2>Choose a Quiz:</h2>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz.id}>
            <Link to={`/learn/${quiz.id}`}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
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
