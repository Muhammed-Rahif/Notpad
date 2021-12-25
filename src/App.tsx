import React from "react";
import AlertBox from "./components/AlertBox/AlertBox";
import MenuBar from "./components/MenuBar/MenuBar";
import Shortcuts from "./components/Shortcuts/Shortcuts";
import TextArea from "./components/TextArea/TextArea";
import TitleBar from "./components/TitleBar/TitleBar";
import { handleOpenFileChange } from "./helpers";

function App() {
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
