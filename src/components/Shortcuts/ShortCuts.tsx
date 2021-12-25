import React, { ReactNode } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { downloadFile, insertTimeAndDate, newFile } from "../../helpers";

function Shortcuts({ children }: { children: ReactNode }) {
  useHotkeys(
    "alt+n",
    e => {
      e.preventDefault();
      e.stopPropagation();
      newFile({});
    },
    { enableOnTags: ["TEXTAREA"] }
  );

  useHotkeys(
    "ctrl+shift+n",
    e => {
      e.preventDefault();
      e.stopPropagation();
      newFile({ newWindow: true });
    },
    { enableOnTags: ["TEXTAREA"] }
  );

  useHotkeys(
    "ctrl+e",
    e => {
      e.preventDefault();
      e.stopPropagation();
      window.close();
    },
    { enableOnTags: ["TEXTAREA"] }
  );

  useHotkeys(
    "ctrl+o",
    e => {
      e.preventDefault();
      e.stopPropagation();
      const openFileELem = document.getElementById("open-file");
      openFileELem?.click();
    },
    { enableOnTags: ["TEXTAREA"] }
  );

  useHotkeys(
    "F5",
    e => {
      e.preventDefault();
      e.stopPropagation();
      insertTimeAndDate(
        document.getElementById("text-area") as HTMLTextAreaElement
      );
    },
    { enableOnTags: ["TEXTAREA"] }
  );

  useHotkeys(
    "ctrl+s",
    e => {
      e.preventDefault();
      e.stopPropagation();
      const textAreaElem: HTMLTextAreaElement = document.getElementById(
        "text-area"
      ) as HTMLTextAreaElement;
      downloadFile(textAreaElem.value, "Untitled.txt", "text/plain");
    },
    { enableOnTags: ["TEXTAREA"] }
  );

  return <div id="shortcuts">{children}</div>;
}

export default Shortcuts;
