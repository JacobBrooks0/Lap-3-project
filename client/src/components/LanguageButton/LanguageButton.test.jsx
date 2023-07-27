/*
import React from 'react'; 
import {describe, it, expect, beforeEach} from 'vitest';
//render component in virtual document
import {screen, render} from '@testing-library/react';

//allow us to test cpecific behaviour
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import LanguageButton from '.'; 
import { LanguageProvider } from '../../contexts/Language';

// #1. SET-UP overriding funciton
describe("LanguageButton component", () =>{

    beforeEach(() =>{
        //before the test runs, we want the component to render
        render(
            <LanguageProvider>
              <LanguageButton />
            </LanguageProvider>
          );  
          
          afterEach(() =>{
            cleanup();
        })

    });

    //after the component is rendered, we can run the tests
    it ("Displays a button with appropriate images", () =>{
        // define what we want to select:
        const spanishFlagImage = screen.getByAltText("Spanish flag");
        const italianFlagImage = screen.getByAltText("Italian flag");

        expect(spanishFlagImage).toBeInTheDocument();
        expect(italianFlagImage).toBeInTheDocument();
    })

})*/