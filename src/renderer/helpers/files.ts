function getInputFileContent(
  inputFileElem: HTMLInputElement,
  cb: (err: unknown, done?: string) => void
): void {
  const reader: FileReader = new FileReader();
  let fileContent: string;

  try {
    reader.onload = (e: ProgressEvent<FileReader>) => {
      fileContent = e.target?.result as string;
      cb(null, fileContent);
    };
  } catch (err) {
    cb(err);
  }

  const files = inputFileElem.files as FileList;
  reader.readAsText(files[0]);
}

// eslint-disable-next-line import/prefer-default-export
export { getInputFileContent };
