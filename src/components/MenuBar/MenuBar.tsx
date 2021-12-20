import React, { useState } from "react";
import { newFile } from "../../helpers";
import "./MenuBar.scss";
import { MdOutlineDone } from "react-icons/md";
import { BiFont } from "react-icons/bi";
import { AiOutlineInfo } from "react-icons/ai";
import { RiFeedbackLine } from "react-icons/ri";

function MenuBar() {
  const [showFile, setShowFile] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div id="menu-bar">
      {/* File */}
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
        <div className="dropdown-content" style={{ display: showFile ? "block" : "none" }}>
          <button className="menu-btn btn" onClick={() => newFile({})}>
            New <kbd>Ctrl + N</kbd>
          </button>
          <button className="menu-btn btn" onClick={() => newFile({ newWindow: true })}>
            New Window <kbd>Ctrl + Shift + N</kbd>
          </button>
          <button className="menu-btn btn">
            Open <kbd>Ctrl + O</kbd>
          </button>
          <button className="menu-btn btn">
            Save <kbd>Ctrl + S</kbd>
          </button>
        </div>
      </div>

      {/* Edit */}
      <div className="dropdown">
        <button
          className="btn"
          onClick={() => setShowEdit(!showEdit)}
          onBlur={() => setShowEdit(false)}
        >
          Edit
        </button>
        <div className="dropdown-content" style={{ display: showEdit ? "block" : "none" }}>
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

          <button className="menu-btn btn">
            Select All <kbd>Ctrl + A</kbd>
          </button>
          <button className="menu-btn btn">
            Time/Date <kbd>F5</kbd>
          </button>
          <hr />

          <button className="menu-btn btn">
            Font{" "}
            <p>
              <BiFont />
            </p>
          </button>
        </div>
      </div>

      {/* View */}
      <div className="dropdown">
        <button
          className="btn"
          onClick={() => setShowView(!showView)}
          onBlur={() => setShowView(false)}
        >
          View
        </button>
        <div className="dropdown-content" style={{ display: showView ? "block" : "none" }}>
          <button className="menu-btn btn">
            Fullscreen{" "}
            <p>
              <MdOutlineDone />
            </p>
          </button>
          <button className="menu-btn btn">
            Dark Mode <p>{/* <MdOutlineDone /> */}</p>
          </button>
        </div>
      </div>

      {/* Help */}
      <div className="dropdown">
        <button
          className="btn"
          onClick={() => setShowHelp(!showHelp)}
          onBlur={() => setShowHelp(false)}
        >
          Help
        </button>
        <div className="dropdown-content" style={{ display: showHelp ? "block" : "none" }}>
          <button className="menu-btn btn">
            Send Feedback
            <p>
              <RiFeedbackLine />
            </p>
          </button>
          <button className="menu-btn btn">
            About Notepad
            <p>
              <AiOutlineInfo />
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
