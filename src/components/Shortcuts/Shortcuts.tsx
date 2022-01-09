import React, { ReactNode, useContext } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { DrawModeContext, DrawPadRefContext } from "../../contexts/Context";
import {
  downloadFile,
  insertTimeAndDate,
  newFile,
  saveDrawAsImage,
} from "../../helpers";

function Shortcuts({ children }: { children: ReactNode }) {
  const { drawPadRef } = useContext(DrawPadRefContext);
  const { drawMode } = useContext(DrawModeContext);

  useHotkeys(
    "ctrl+z",
    e => {
      e.preventDefault();
      e.stopPropagation();
      if (drawMode) drawPadRef.undo();
    },
    undefined,
    drawPadRef
  );

  useHotkeys(
    "ctrl+y",
    e => {
      e.preventDefault();
      e.stopPropagation();
      if (drawMode) drawPadRef.clear();
    },
    undefined,
    drawPadRef
  );

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
      if (!drawMode) {
        const openFileELem = document.getElementById("open-file");
        openFileELem?.click();
      }
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
      if (drawMode)
        saveDrawAsImage(
          drawPadRef?.getDataURL(
            "image/png",
            null,
            drawPadRef.props.backgroundColor
          ),
          "draw.png"
        );
      else {
        const textAreaElem: HTMLTextAreaElement = document.getElementById(
          "text-area"
        ) as HTMLTextAreaElement;
        downloadFile(textAreaElem.value, "Untitled.txt", "text/plain");
      }
    },
    { enableOnTags: ["TEXTAREA"] }
  );

  return <div id="shortcuts">{children}</div>;
}

export default Shortcuts;
