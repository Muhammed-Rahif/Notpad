import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

test("renders home page", () => {
  render(<App />);

  const linkElement = screen.getByText(/untitled.txt - notepad/i);
  expect(linkElement).toBeInTheDocument();
});
