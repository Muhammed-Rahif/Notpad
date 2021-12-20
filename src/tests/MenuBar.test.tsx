import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MenuBar from "../components/MenuBar/MenuBar";

describe("renders menu bar component with button", () => {
  afterEach(cleanup);

  test("screen should have 'File' menu button", () => {
    render(<MenuBar />);
    const btnElem = screen.getByText(/file/i);
    expect(btnElem).toBeInTheDocument();
  });

  test("screen should have 'Edit' menu button", () => {
    render(<MenuBar />);
    const btnElem = screen.getByText(/edit/i);
    expect(btnElem).toBeInTheDocument();
  });

  test("screen should have 'View' menu button", () => {
    render(<MenuBar />);
    const btnElem = screen.getByText(/view/i);
    expect(btnElem).toBeInTheDocument();
  });

  test("screen should have 'Help' menu button", () => {
    render(<MenuBar />);
    const btnElem = screen.getByText(/help/i);
    expect(btnElem).toBeInTheDocument();
  });
});
