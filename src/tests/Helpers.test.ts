/* eslint-disable jest/valid-describe-callback */
import {
  getColumnIndex,
  getLineNumber,
  newFile,
  enableTabIndentation,
  insertTimeAndDate,
  selectAllOfInput,
  toggleTheme,
  isDarkTheme,
  openLink,
} from "../helpers";

afterEach(() => {
  localStorage.clear();
});

describe("Testing helpers", () => {
  describe("Testing newFile function", () => {
    it("should call window.open with 'location=yes,height=570,width=520,scrollbars=yes,status=yes'", () => {
      global.open = jest.fn();
      newFile({ newWindow: true });
      expect(global.open).toBeCalledWith(
        global.location.href,
        "_blank",
        "location=yes,height=570,width=520,scrollbars=yes,status=yes"
      );
    });
    it("should call window.open with undefined", () => {
      global.open = jest.fn();
      newFile({ newWindow: false });
      expect(global.open).toBeCalledWith(
        global.location.href,
        "_blank",
        undefined
      );
    });
  });

  describe("Testing getLineNumber function", () => {
    it("should give the line number for a given input or textarea", () => {
      const input = document.createElement("input");
      input.value = "Line 1\nLine 2\nLine 3";
      input.selectionStart = 1;

      expect(getLineNumber(input)).toEqual(1);
    });
  });

  describe("Testing getColumnIndex function", () => {
    it("should give the line number for a given input or textarea", () => {
      const input = document.createElement("input");
      input.value = "Test";
      input.selectionStart = 1;
      input.selectionEnd = 1;
      expect(getColumnIndex(input)).toEqual(1);
    });
  });

  describe("Testing enable indentation", () => {
    it("should set textarea value to: text before caret + tab + text after caret", () => {
      const input = document.createElement("input");
      input.value = "Tester";
      enableTabIndentation(input);
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
      expect(input.value).toEqual("Tester\t");
    });
  });

  describe("Testing inserTimeAndDate", () => {
    it("should set time and date based on current time and date", () => {
      const Now = new Date();
      const timeAndDate: string = `${Now.getHours()}:${Now.getMinutes()} ${Now.getDay()}/${Now.getMonth()}/${Now.getFullYear()} `;
      const input = document.createElement("input");
      insertTimeAndDate(input);
      expect(input.value).toEqual(timeAndDate);
    });
  });

  describe("Testing selectAllInput", () => {
    it("should select the entire content of the input", () => {
      const input = document.createElement("input");
      input.value = "Text";
      const selectionRangeSpy = jest.spyOn(input, "setSelectionRange");
      const focusSpy = jest.spyOn(input, "focus");
      selectAllOfInput(input);
      expect(selectionRangeSpy).toHaveBeenCalledWith(0, 4);
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe("Testing toggleTheme", () => {
    it("should set theme to dark when theme is light in data attribute", () => {
      document.documentElement.getAttribute = jest.fn(() => "light");
      toggleTheme();
      expect(localStorage.getItem("theme")).toEqual("dark");
    });
    it("should set theme to dark when theme is light in local storage", () => {
      localStorage.getItem = jest.fn(() => "light");
      toggleTheme();
      expect(localStorage.getItem("theme")).toEqual("dark");
    });
    it("should set theme to light when data attribute or localstorage theme value is not available", () => {
      document.documentElement.getAttribute = jest.fn(() => "");
      localStorage.getItem = jest.fn(() => "");
      toggleTheme();
      expect(localStorage.getItem("theme")).toEqual("light");
    });
    it("should set theme to light when theme is dark in data attribute", () => {
      document.documentElement.getAttribute = jest.fn(() => "dark");
      toggleTheme();
      expect(localStorage.getItem("theme")).toEqual("light");
    });
    it("should set theme to light when theme is dark in local storage", () => {
      localStorage.getItem = jest.fn(() => "dark");
      toggleTheme();
      expect(localStorage.getItem("theme")).toEqual("light");
    });
  });

  describe("Testing isDarkTheme", () => {
    it("should should return true when theme is dark", () => {
      localStorage.setItem("theme", "dark");
      expect(isDarkTheme()).toBeTruthy();
    });
    it("should should return false when theme is light", () => {
      localStorage.setItem("theme", "light");
      expect(isDarkTheme()).toBeFalsy();
    });
    it("should should return false when theme is not set (In this case theme is considered as light)", () => {
      localStorage.setItem("theme", "light");
      expect(isDarkTheme()).toBeFalsy();
    });
  });

  describe("Testing openlink", () => {
    it("should should open link in new tab if newTab is true", () => {
      global.open = jest.fn();
      openLink("test.com", { newTab: true });
      expect(global.open).toHaveBeenCalledWith("test.com", "_blank");
    });
    it("should should open link in current tab if newTab is false", () => {
      global.open = jest.fn();
      openLink("test.com", { newTab: false });
      expect(global.open).toHaveBeenCalledWith("test.com", "_top");
    });
  });
});

//Avoid linting error
export {};
