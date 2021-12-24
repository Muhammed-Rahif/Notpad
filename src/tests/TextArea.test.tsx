import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextArea from "../components/TextArea/TextArea";

describe("renders menu bar component with button", () => {
  afterEach(cleanup);

  test("TextArea component value must be changeable", async () => {
    render(<TextArea />);
    const textArea: HTMLTextAreaElement = (await screen.findByTestId(
      "text-area"
    )) as HTMLTextAreaElement;

    textArea.value = "some unique content";
    const contentElem: HTMLTextAreaElement = (await screen.findByDisplayValue(
      /some unique content/i
    )) as HTMLTextAreaElement;

    expect(textArea).toEqual(contentElem);
  });

  test("TextArea 'spellCheck' attribute must be 'false'", async () => {
    render(<TextArea />);
    const textArea: HTMLTextAreaElement = (await screen.findByTestId(
      "text-area"
    )) as HTMLTextAreaElement;

    expect(textArea.spellcheck).toBeFalsy();
  });

  test("TextArea line & column numbers must change when TextArea value changes", async () => {
    render(<TextArea />);
    const textArea: HTMLTextAreaElement = (await screen.findByTestId(
      "text-area"
    )) as HTMLTextAreaElement;

    textArea.value = "some content\nunique but actually not!";
    const lineIndexShower: HTMLParagraphElement = (await screen.findByTestId(
      "line-index"
    )) as HTMLParagraphElement;

    let keyUpEvent = new Event("keyup", { bubbles: true, cancelable: false });
    textArea.dispatchEvent(keyUpEvent);
    expect(lineIndexShower.innerHTML).toEqual("Ln 2, Col 24");
  });

  test("TextArea 'Tab' indentation must work", async () => {
    render(<TextArea />);
    const textArea: HTMLTextAreaElement = (await screen.findByTestId(
      "text-area"
    )) as HTMLTextAreaElement;

    fireEvent.keyDown(textArea, { key: "Tab", code: "Tab" });

    const lineIndexShower: HTMLParagraphElement = (await screen.findByTestId(
      "line-index"
    )) as HTMLParagraphElement;
    let keyUpEvent = new Event("keyup", { bubbles: true, cancelable: false });
    textArea.dispatchEvent(keyUpEvent);

    expect(lineIndexShower.innerHTML).toEqual("Ln 1, Col 1");
  });
});
