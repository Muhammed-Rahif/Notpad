import React, { useContext, useState } from "react";
import {
  AlertBoxContext,
  DrawModeContext,
  DrawPadRefContext,
} from "../../../contexts/Context";
import { downloadFile, newFile, saveDrawAsImage } from "../../../helpers";

function File() {
  const [showFile, setShowFile] = useState(false);
  const { setAlertBox } = useContext(AlertBoxContext);
  const { drawMode } = useContext(DrawModeContext);
  const { drawPadRef } = useContext(DrawPadRefContext);

  return (
    <div className="dropdown">
      <button
        className="btn"
        onClick={() => setShowFile(!showFile)}
        onBlur={() => {
          setTimeout(() => setShowFile(false), 150);
        }}
      >
        File
      </button>
      <div
        className="dropdown-content"
        style={{ display: showFile ? "block" : "none" }}
      >
        <button className="menu-btn btn" onClick={() => newFile({})}>
          New <kbd>Alt + N</kbd>
        </button>
        <button
          className="menu-btn btn"
          onClick={() => newFile({ newWindow: true })}
        >
          New Window <kbd>Ctrl + Shift + N</kbd>
        </button>
        {!drawMode && (
          <button
            className="menu-btn btn"
            onClick={() => {
              const openFileELem = document.getElementById("open-file");
              openFileELem?.click();
            }}
          >
            Open <kbd>Ctrl + O</kbd>
          </button>
        )}
        <button
          className="menu-btn btn"
          onClick={() => {
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
          }}
        >
          Save <kbd>Ctrl + S</kbd>
        </button>
        <hr />

        <button
          className="menu-btn btn"
          onClick={() => {
            setAlertBox({
              title: "Exit",
              body: "Are sure to want exit?",
              buttons: [
                {
                  text: "No",
                  onClick: () => {
                    setAlertBox(null);
                  },
                },
                {
                  text: "Yes",
                  onClick: () => {
                    setAlertBox(null);
                    window.close();
                  },
                },
              ],
            });
          }}
        >
          Exit <kbd>Ctrl + E</kbd>
        </button>
      </div>
    </div>
  );
}

export default File;
