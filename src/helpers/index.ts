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
    const event = e as KeyboardEvent;
    if (event.key === "Tab") {
      event.preventDefault();
      const start = inputElem.selectionStart || 0;
      const end = inputElem.selectionEnd || 0;

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

function downloadFile(data: string, filename: string, type: string) {
  const file = new Blob([data], { type: type });
  const anchorElem = document.createElement("a"),
    url = URL.createObjectURL(file);
  anchorElem.href = url;
  anchorElem.download = filename;
  document.body.appendChild(anchorElem);
  anchorElem.click();
  setTimeout(function () {
    document.body.removeChild(anchorElem);
    window.URL.revokeObjectURL(url);
  }, 0);
}

function handleOpenFileChange(event: React.ChangeEvent<HTMLInputElement>) {
  const reader = new FileReader();
  const textAreaElem: HTMLTextAreaElement = document.getElementById(
    "text-area"
  ) as HTMLTextAreaElement;

  reader.onload = function (e: ProgressEvent<FileReader>) {
    let fileContent: string = e.target?.result as string;
    textAreaElem.value = fileContent;

    textAreaElem.focus();
  };
  const files = event.target.files as FileList;
  reader.readAsText(files[0]);
}

function insertTimeAndDate(inputElem: HTMLInputElement | HTMLTextAreaElement) {
  const Now: Date = new Date();
  const timeAndDate: string = `${Now.getHours()}:${Now.getMinutes()} ${Now.getDay()}/${Now.getMonth()}/${Now.getFullYear()} `;
  inputElem.value += timeAndDate;
  inputElem.focus();
}

function selectAllOfInput(inputElem: HTMLInputElement | HTMLTextAreaElement) {
  inputElem.setSelectionRange(0, inputElem.value.length);
  inputElem.focus();
}

function toggleTheme() {
  const currentTheme: string =
    document.documentElement.getAttribute("data-theme") ||
    localStorage.getItem("theme") ||
    "dark";

  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

function setUserPreference() {
  const preferedTheme: string = localStorage.getItem("theme") || "light";

  if (preferedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else if (preferedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

function isDarkTheme() {
  const preferedTheme: string = localStorage.getItem("theme") || "light";

  if (preferedTheme === "light") return false;
  else if (preferedTheme === "dark") return true;
}

function setToLocalStorage(key: string, { value = "" }: { value: string }) {
  localStorage.setItem(key, value);
}

function getFromLocalStorage(key: string) {
  return localStorage.getItem(key);
}

export {
  newFile,
  getLineNumber,
  getColumnIndex,
  enableTabIndentation,
  downloadFile,
  handleOpenFileChange,
  insertTimeAndDate,
  selectAllOfInput,
  toggleTheme,
  setUserPreference,
  isDarkTheme,
  setToLocalStorage,
  getFromLocalStorage,
};
