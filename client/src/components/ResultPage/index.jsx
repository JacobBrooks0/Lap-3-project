import React from 'react';
import style from '../../pages/Learn/style.module.css'
const ResultContainer = ({ score, totalQuestions, onRestart }) => {
    return (
        <div className={style["result-container"]}>
            <h2>Quiz Result</h2>
            <p>Your score: {score} / {totalQuestions}</p>
            <button className={style["restart-button"]} onClick={onRestart}>Restart Quiz</button>
        </div>
    );
};

export default ResultContainer;
