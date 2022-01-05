import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

describe("renders page with contents and basic features", () => {
  afterEach(cleanup);

  it("should have the 'TitleBar' component in 'App'", () => {
    render(<App />);
    const titleBarComponent = screen.getByTestId("title-bar");
    expect(titleBarComponent).toBeInTheDocument();
  });

  it("should have the 'MenuBar' component in 'App'", () => {
    render(<App />);
    const menuBarComponent = screen.getByTestId("menu-bar");
    expect(menuBarComponent).toBeInTheDocument();
  });

  it("should have the 'TextArea' component in 'App'", () => {
    render(<App />);
    const textAreaComponent = screen.getByTestId("text-area-wrapper");
    expect(textAreaComponent).toBeInTheDocument();
  });

  it("should have the 'AlertBox' component in 'App'", () => {
    render(<App />);
    const alertBoxComponent = screen.getByTestId("alert-box-wrapper");
    expect(alertBoxComponent).toBeInTheDocument();
  });
});
