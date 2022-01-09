import React, { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { isDarkTheme, toggleTheme } from "../../../helpers";

function View() {
  const [showView, setShowView] = useState(false);

  return (
    <div className="dropdown">
      <button
        className="btn"
        onClick={() => setShowView(!showView)}
        onBlur={() => {
          setTimeout(() => setShowView(false), 150);
        }}
      >
        View
      </button>
      <div
        className="dropdown-content"
        style={{ display: showView ? "block" : "none" }}
      >
        <button className="menu-btn btn">
          Fullscreen{" "}
          <p>
            <MdOutlineDone />
          </p>
        </button>
        <button className="menu-btn btn" onClick={toggleTheme}>
          Dark Mode <p>{isDarkTheme() && <MdOutlineDone />}</p>
        </button>
      </div>
    </div>
  );
}

export default View;
