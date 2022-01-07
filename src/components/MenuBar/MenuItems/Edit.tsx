import React, { useState } from "react";
import { AiOutlineFontSize } from "react-icons/ai";
import { insertTimeAndDate, selectAllOfInput } from "../../../helpers";

function Edit() {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="dropdown">
      <button
        className="btn"
        onClick={() => setShowEdit(!showEdit)}
        onBlur={() => {
          setTimeout(() => setShowEdit(false), 150);
        }}
      >
        Edit
      </button>
      <div
        className="dropdown-content"
        style={{ display: showEdit ? "block" : "none" }}
      >
        <button className="menu-btn btn">
          Undo <kbd>Ctrl + Z</kbd>
        </button>
        <hr />

        <button className="menu-btn btn">
          Cut <kbd>Ctrl + X</kbd>
        </button>
        <button className="menu-btn btn">
          Copy <kbd>Ctrl + C</kbd>
        </button>
        <button className="menu-btn btn">
          Paste <kbd>Ctrl + P</kbd>
        </button>
        <button className="menu-btn btn">
          Delete <kbd>Del</kbd>
        </button>
        <hr />

        <button className="menu-btn btn">
          Find <kbd>Ctrl + F</kbd>
        </button>
        <button className="menu-btn btn">
          Go to <kbd>Ctrl + G</kbd>
        </button>
        <hr />

        <button
          className="menu-btn btn"
          onClick={() =>
            selectAllOfInput(
              document.getElementById("text-area") as HTMLTextAreaElement
            )
          }
        >
          Select All <kbd>Ctrl + A</kbd>
        </button>
        <button
          className="menu-btn btn"
          onClick={() => {
            insertTimeAndDate(
              document.getElementById("text-area") as HTMLTextAreaElement
            );
          }}
        >
          Time/Date <kbd>F5</kbd>
        </button>
        <hr />

        <button className="menu-btn btn">
          Font{" "}
          <p>
            <AiOutlineFontSize />
          </p>
        </button>
      </div>
    </div>
  );
}

export default Edit;
