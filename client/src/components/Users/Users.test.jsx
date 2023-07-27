import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import axios from 'axios';

import Users from '.';

describe("Users component", () => {
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

  beforeEach(() => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: mockData });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks(); // Restore all mocked functions after each test
  });

  it("renders table headers and data", async () => {
    render(<Users />);

    // Wait for the data to be fetched and the component to re-render
    await screen.findByText('username');
    await screen.findByText('Italian Score');
    await screen.findByText('Spanish Score');
    await screen.findByText('Total Score');
    await screen.findByText('Rank');

    // Find the rendered data
    const userData = screen.getAllByRole('cell');

    // Assert that the data is displayed correctly
    expect(userData).toHaveLength(10); // 5 cells per row (5 columns), 2 rows of data
    expect(userData[0]).toHaveTextContent('1');
    expect(userData[1]).toHaveTextContent('100');
    expect(userData[2]).toHaveTextContent('200');
    expect(userData[3]).toHaveTextContent('300');
    expect(userData[4]).toHaveTextContent('1');
    expect(userData[5]).toHaveTextContent('2');
    expect(userData[6]).toHaveTextContent('50');
    expect(userData[7]).toHaveTextContent('150');
    expect(userData[8]).toHaveTextContent('200');
    expect(userData[9]).toHaveTextContent('2');
  });
});
