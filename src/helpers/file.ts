export function newFile({
  newWindow = false,
}: {
  newWindow?: boolean;
  content?: string;
}): void {
  newWindow
    ? window.open(
        "/",
        "_blank",
        "location=yes,height=570,width=520,scrollbars=yes,status=yes"
      )
    : window.open("/", "_blank");
}

export function downloadFile(data: string, filename: string, type: string) {
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
