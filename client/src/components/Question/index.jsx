import React from 'react';
import style from '../../pages/Learn/style.module.css'
const Question = ({ question }) => {
    return (
        <div className={style["question-container"]}>
            <h2>{question}</h2>
        </div>
    );
};

export default Question;
