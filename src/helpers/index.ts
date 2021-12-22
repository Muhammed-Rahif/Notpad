function newFile({ newWindow = false }) {
  window.open(
    window.location.href,
    "_blank",
    newWindow
      ? "location=yes,height=570,width=520,scrollbars=yes,status=yes"
      : undefined
  );
}

function getLineNumber(inputElem: HTMLTextAreaElement | HTMLInputElement) {
  let textLines: string[] = inputElem.value
    .substr(0, inputElem?.selectionStart || undefined)
    .split("\n");
  const lineNumber = textLines.length;
  return lineNumber;
}

function getColumnIndex(inputElem: HTMLTextAreaElement | HTMLInputElement) {
  let textLines: string[] = inputElem.value
    .substr(0, inputElem?.selectionStart || undefined)
    .split("\n");
  var columnIndex = textLines[textLines.length - 1].length;
  return columnIndex;
}

function enableTabIndentation(
  inputElem: HTMLInputElement | HTMLTextAreaElement
) {
  inputElem.addEventListener("keydown", (e: Event) => {
    let event = e as KeyboardEvent;
    if (event.key === "Tab") {
      event.preventDefault();
      var start = inputElem.selectionStart || 0;
      var end = inputElem.selectionEnd || 0;

      // set textarea value to: text before caret + tab + text after caret
      inputElem.value =
        inputElem.value.substring(0, start) +
        "\t" +
        inputElem.value.substring(end);

      // put caret at right position again
      inputElem.selectionStart = inputElem.selectionEnd = start + 1;
    }
  });
}

export { newFile, getLineNumber, getColumnIndex, enableTabIndentation };
