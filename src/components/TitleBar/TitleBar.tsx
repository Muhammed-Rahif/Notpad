import React from "react";
import screenfull from 'screenfull';
import "./TitleBar.scss";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscChromeClose,
} from "react-icons/vsc";

function TitleBar() {
  const getFullScreenNode = () => document.documentElement || document.body;

  const handleMinimizeScreen = () => {
    screenfull.exit();
  }
  const handleFullScreen = () => {
    screenfull.request(getFullScreenNode());
  }
  return (
    <div id="title-bar" data-testid="title-bar">
      <section className="title-section">
        <img src="assets/images/logo.png" alt="Notepad" width="20px" />
        <p className="title">Untitled.txt - Notepad</p>
      </section>
      <section className="btn-section">
        <button className="btn" onClick={handleMinimizeScreen}>
          <VscChromeMinimize />
        </button>
        <button className="btn" onClick={handleFullScreen} >
          <VscChromeMaximize />
        </button>
        <button className="btn btn-cls" onClick={window.close}>
          <VscChromeClose />
        </button>
      </section>
    </div>
  );
}

export default TitleBar;
