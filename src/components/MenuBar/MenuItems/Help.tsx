import React, { useState } from "react";
import { AiOutlineInfo } from "react-icons/ai";
import { RiFeedbackLine } from "react-icons/ri";

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
      </div>
    </div>
  );
}

export default Help;
