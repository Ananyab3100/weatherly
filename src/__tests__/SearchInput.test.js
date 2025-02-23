import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import SearchInput from "../SearchInput"; // Import your SearchInput component

describe("SearchInput Component", () => {
  test("renders the search input correctly", () => {
    render(<SearchInput placeholder="Search..." />);
    const inputElement = screen.getByPlaceholderText("Search...");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass("search-input");
  });

  test("has the correct initial styles", () => {
    render(<SearchInput />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveStyle(`
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border-radius: 25px;
    `);
  });

  test("applies focus styles when focused", async () => {
    render(<SearchInput />);
    const inputElement = screen.getByRole("textbox");
    inputElement.focus();

    expect(inputElement).toHaveStyle(`
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
    `);
  });

  test("accepts user input", async () => {
    render(<SearchInput />);
    const inputElement = screen.getByRole("textbox");
    await userEvent.type(inputElement, "Hello");
    expect(inputElement).toHaveValue("Hello");
  });

  test("shows correct placeholder text", () => {
    render(<SearchInput placeholder="Search for a city..." />);
    const inputElement = screen.getByPlaceholderText("Search for a city...");
    expect(inputElement).toBeInTheDocument();
  });
});
