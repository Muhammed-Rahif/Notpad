import React from "react";
import AlertBox from "./components/AlertBox/AlertBox";
import MenuBar from "./components/MenuBar/MenuBar";
import TextArea from "./components/TextArea/TextArea";
import TitleBar from "./components/TitleBar/TitleBar";

function App() {
  return (
    <>
      <TitleBar />
      <MenuBar />
      <TextArea />
      <AlertBox />
    </>
  );
}

export default App;
