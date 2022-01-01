import React, { useEffect } from "react";
import AlertBox from "./components/AlertBox/AlertBox";
import MenuBar from "./components/MenuBar/MenuBar";
import Shortcuts from "./components/Shortcuts/Shortcuts";
import TextArea from "./components/TextArea/TextArea";
import TitleBar from "./components/TitleBar/TitleBar";
import { handleOpenFileChange, setUserPreference } from "./helpers";
import "./App.scss";

function App() {
  useEffect(() => {
    setUserPreference();
  }, []);

  return (
    <Shortcuts>
      <TitleBar />
      <MenuBar />
      <TextArea />
      <AlertBox />
      <input
        type="file"
        name="open-file"
        id="open-file"
        hidden
        accept="text/plain"
        onChange={handleOpenFileChange}
      />
    </Shortcuts>
  );
}

export default App;
