import React from 'react'; 
import {describe, it, expect, beforeEach, afterEach} from 'vitest';
//render component in virtual document
import {screen, render, cleanup} from '@testing-library/react';

//allow us to test cpecific behaviour
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Leaderboard from '.'; 



describe("Leaderboard", () => {  
    afterEach(() => {
      cleanup();
    });
  
    it("renders the Leaderboard", () => {
      render(<Leaderboard />);
      const headingElement = screen.getByRole('heading', { name: /Leaderboard/i });
      expect(headingElement).toBeInTheDocument();
    });
  
});