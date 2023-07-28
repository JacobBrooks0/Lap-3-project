import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, render, cleanup, within } from "@testing-library/react";

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import axios from "axios";

import Users from ".";

describe("Users component", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks(); // Restore all mocked functions after each test
  });

  it("renders table headers and data", async () => {
    describe("fetchData", () => {
      it("makes a GET request to fetch users", async () => {
        const mockData = [
          {
            user_id: 1,
            score_italian: 100,
            score_spanish: 200,
            total: 300,
            rank: 1,
          },
          {
            user_id: 2,
            score_italian: 50,
            score_spanish: 150,
            total: 200,
            rank: 2,
          },
        ];

        axios.get.mockResolvedValue({
          data: mockData,
        });

        const users = await fetchData();

        expect(axios.get).toHaveBeenCalledWith(
          "https://hackstreet-boys.onrender.com/leaderboards/"
        );
        expect(users).toStrictEqual(usersMock);
      });
    });
  });

  it("renders table headers and data", async () => {
    render(<Users />);

    const userTable = await screen.getAllByRole("columnheader");
    expect(userTable[0].textContent).toBe("Username");
    expect(userTable[1].textContent).toBe("Italian Score");
    expect(userTable[2].textContent).toBe("Spanish Score");
    expect(userTable[3].textContent).toBe("Total Score");
    expect(userTable[4].textContent).toBe("Rank");
  });
});
