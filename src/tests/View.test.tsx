import React from "react";
import {
  cleanup,
  render,
  screen,
  queryByAttribute,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import View from "../components/MenuBar/MenuItems/View";

describe("renders view component", () => {
  afterEach(cleanup);
  afterAll(() => {
    localStorage.clear();
  });
  const getByClass = queryByAttribute.bind(null, "class");

  test("The view dropdown is closed initially and has a button to open it", () => {
    const view = render(<View />);
    const viewButton = screen.getByText(/View/i);
    const content = getByClass(view.container, "dropdown-content");
    expect(viewButton).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(content?.style.display).toEqual("none");
  });
  test("The view dropdown is shown,when the view button is clicked", () => {
    const view = render(<View />);
    const viewButton = screen.getByText(/View/i);
    fireEvent.click(viewButton);
    const content = getByClass(view.container, "dropdown-content");
    expect(content?.style.display).toEqual("block");
  });
  test("The view dropdown is hidden,when the view button is clicked when it is open", () => {
    const view = render(<View />);
    const viewButton = screen.getByText(/View/i);
    fireEvent.click(viewButton);
    fireEvent.click(viewButton);
    const content = getByClass(view.container, "dropdown-content");
    expect(content?.style.display).toEqual("none");
  });
  test("When view drop down is open clicking the DarkModeButton toggles the theme from light to dark", () => {
    render(<View />);
    localStorage.setItem("theme", "light");
    const viewButton = screen.getByText(/View/i);
    fireEvent.click(viewButton);
    const themeButton = screen.getByText(/Dark Mode/i);
    fireEvent.click(themeButton);
    expect(localStorage.getItem("theme")).toEqual("dark");
  });
  test("When view drop down is open clicking the DarkModeButton toggles from dark to light", () => {
    render(<View />);
    localStorage.setItem("theme", "dark");
    const viewButton = screen.getByText(/View/i);
    fireEvent.click(viewButton);
    const themeButton = screen.getByText(/Dark Mode/i);
    fireEvent.click(themeButton);
    expect(localStorage.getItem("theme")).toEqual("light");
  });
});
