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
    .substr(
      0,
      inputElem?.selectionStart ? inputElem?.selectionStart : undefined
    )
    .split("\n");
  const lineNumber = textLines.length;
  return lineNumber;
}

function getColumnIndex(inputElem: HTMLTextAreaElement | HTMLInputElement) {
  let textLines: string[] = inputElem.value
    .substr(
      0,
      inputElem?.selectionStart ? inputElem?.selectionStart : undefined
    )
    .split("\n");
  var columnIndex = textLines[textLines.length - 1].length;
  return columnIndex;
}

export { newFile, getLineNumber, getColumnIndex };
