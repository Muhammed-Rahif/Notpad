import React, { useState } from "react";
import { AiOutlineInfo } from "react-icons/ai";
import { RiFeedbackLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { openLink } from "../../../helpers";

function Help() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="dropdown">
      <button
        className="btn"
        onClick={() => setShowHelp(!showHelp)}
        onBlur={() => {
          setTimeout(() => setShowHelp(false), 150);
        }}
      >
        Help
      </button>
      <div
        className="dropdown-content"
        style={{ display: showHelp ? "block" : "none" }}
      >
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
        <button
          className="menu-btn btn"
          onClick={() =>
            openLink(new URL("https://github.com/Muhammed-Rahif/Notepad"), {
              newTab: true,
            })
          }
        >
          GitHub
          <p>
            <FaGithub />
          </p>
        </button>
      </div>
    </div>
  );
}

export default Help;
