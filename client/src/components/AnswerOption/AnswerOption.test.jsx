import React from 'react'; 
import {describe, it, expect, beforeEach, afterEach} from 'vitest';
//render component in virtual document
import {screen, render, cleanup} from '@testing-library/react';

//allow us to test cpecific behaviour
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import AnswerOption from '.'; 

describe("Answer Option", () => {
    let option;
    let isCorrect;
    let isSelected;
  
    afterEach(() => {
      cleanup();
    });
  
    it("renders AnswerOption", () => {
      render(<AnswerOption />);
    });
  
    it("renders has the correct button class", () => {
      isCorrect = true;
      isSelected = true;
      render(<AnswerOption isSelected={isSelected} isCorrect={isCorrect} />);
      const button = screen.getByRole("button");
      console.log(button);
      expect(button).toHaveClass("_option-button_63cee0 correct");
    });
  
    it("renders has the correct button class", () => {
      isCorrect = false;
      isSelected = true;
      render(<AnswerOption isSelected={isSelected} isCorrect={isCorrect} />);
      const button = screen.getByRole("button");
      console.log(button);
      expect(button).toHaveClass("_option-button_63cee0 incorrect");
    });
  });