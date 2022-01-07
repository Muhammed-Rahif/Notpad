import React, { useContext, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { DrawingModeContext } from "../../../contexts/Context";

function Mode() {
  const [showMode, setShowMode] = useState(false);

  const { drawMode, setDrawMode } = useContext(DrawingModeContext);

  return (
    <div className="dropdown">
      <button
        className="btn"
        onClick={() => setShowMode(!showMode)}
        onBlur={() => {
          setTimeout(() => setShowMode(false), 150);
        }}
      >
        Mode
      </button>
      <div
        className="dropdown-content"
        style={{ display: showMode ? "block" : "none" }}
      >
        <button className="menu-btn btn" onClick={() => setDrawMode(!drawMode)}>
          Draw Mode <kbd>{drawMode && <MdOutlineDone />}</kbd>
        </button>
      </div>
    </div>
  );
}

export default Mode;
