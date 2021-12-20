import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TitleBar from "../components/TitleBar/TitleBar";

describe("renders home page with contents", () => {
  afterEach(cleanup);

  it("should have 'untitled.txt - notepad' title", () => {
    render(<TitleBar />);
    const titleElement = screen.getByText(/untitled.txt - notepad/i);
    expect(titleElement).toBeInTheDocument();
  });
});
