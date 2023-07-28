import React from "react";
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { screen, render, cleanup, within } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import {
  getAuthenticated,
  removeAccount,
  CompWrapper,
} from "../../test/helpers";
import { AuthProvider } from "../../contexts";
import { LanguageProvider } from "../../contexts/Language";
import { Popup } from "../../components";

import Practice from ".";

describe("Practice Page", () => {
  beforeAll(() => {
    getAuthenticated();
  });

  afterAll(() => {
    cleanup();
    removeAccount();
    vi.restoreAllMocks(); // Restore all mocked functions after each test
  });

  it("renders without crashing", async () => {
    render(
      <Router>
        <LanguageProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Practice />} />
            </Routes>
          </AuthProvider>
        </LanguageProvider>
      </Router>
    );
  });
});
