import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";
import Context from "../contexts/Context";

describe("renders home page with contents", () => {
  afterEach(cleanup);

  it("should be visible when state is avaliable", () => {
    render(
      <Context>
        <App />
      </Context>
    );

    const existBtn = screen.getByText(/exit/i);
    existBtn.click();

    const alertBoxComponent = screen.getByTestId("alert-box-wrapper");

    expect(alertBoxComponent.style.display).toEqual("flex");

    const alertNoBtn = screen.getByText(
      (contnt, elem) => contnt.startsWith("No") && elem?.tagName === "BUTTON"
    );
    alertNoBtn.click();

    expect(alertBoxComponent.style.display).toEqual("none");
  });
});
