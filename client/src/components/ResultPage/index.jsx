import React from 'react';

const ResultContainer = ({ score, totalQuestions, onRestart }) => {
    return (
        <div className="result-container">
            <h2>Quiz Result</h2>
            <p>Your score: {score} / {totalQuestions}</p>
            <button className="restart-button" onClick={onRestart}>Restart Quiz</button>
        </div>
    );
};

export default ResultContainer;
