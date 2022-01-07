import React, { useContext, useState } from "react";
import { AlertBoxContext } from "../../../contexts/Context";
import { downloadFile, newFile } from "../../../helpers";

function File() {
  const [showFile, setShowFile] = useState(false);
  const { setAlertBox } = useContext(AlertBoxContext);

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
        <button
          className="menu-btn btn"
          onClick={() => {
            const openFileELem = document.getElementById("open-file");
            openFileELem?.click();
          }}
        >
          Open <kbd>Ctrl + O</kbd>
        </button>
        <button
          className="menu-btn btn"
          onClick={() => {
            const textAreaElem: HTMLTextAreaElement = document.getElementById(
              "text-area"
            ) as HTMLTextAreaElement;
            downloadFile(textAreaElem.value, "Untitled.txt", "text/plain");
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
