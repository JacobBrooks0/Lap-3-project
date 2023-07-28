import React from 'react';
import style from './style.module.css'

const AnswerOption = ({ option, onClick, isCorrect, isSelected }) => {
    let buttonClass = style["option-button"];
    if (isSelected) {
        if (isCorrect) {
            buttonClass += " correct";
        } else {
            buttonClass += " incorrect";
        }
    }

    return (
        <button
            onClick={onClick}
            className={buttonClass}
        >
            {option}
        </button>
    );
};

export default AnswerOption;
