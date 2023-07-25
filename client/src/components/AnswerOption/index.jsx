import React from 'react';

const AnswerOption = ({ option, onClick, isCorrect, isSelected }) => {
    let buttonClass = "option-button";
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
