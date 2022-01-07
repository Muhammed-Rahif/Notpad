import React, { useContext } from "react";
import "./WorkArea.scss";
import TextArea from "../TextArea/TextArea";
import DrawPad from "../DrawPad/DrawPad";
import { DrawingModeContext } from "../../contexts/Context";

function WorkArea() {
  const { drawMode } = useContext(DrawingModeContext);

  return (
    <div id="work-area" className="work-area" data-testid="work-area">
      {drawMode ? <DrawPad /> : <TextArea />}
    </div>
  );
}

export default WorkArea;
