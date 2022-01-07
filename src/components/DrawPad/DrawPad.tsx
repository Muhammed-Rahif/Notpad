import React, { useContext, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import useWindowSize from "../../hooks/useWindowSize";
import "./DrawPad.scss";
import { IoMdBrush } from "react-icons/io";
import { FaClipboard, FaVine } from "react-icons/fa";
import { SiZerply } from "react-icons/si";
import { useHotkeys } from "react-hotkeys-hook";
import { DrawPadRefContext } from "../../contexts/Context";

function DrawPad() {
  const { height, width } = useWindowSize();
  const [brushColor, setBrushColor] = useState("#111");
  const [canvasColor, setCanvasColor] = useState("#fff");
  const [brushSize, setBrushSize] = useState(8);
  const [hideInterface, setHideInterface] = useState(false);
  const { drawPadRef, setDrawPadRef } = useContext(DrawPadRefContext);

  useHotkeys("ctrl+z", e => {
    e.preventDefault();
    e.stopPropagation();
    drawPadRef.undo();
  });

  useHotkeys("ctrl+y", e => {
    e.preventDefault();
    e.stopPropagation();
    drawPadRef.clear();
  });

  return (
    <>
      <CanvasDraw
        className="draw-pad"
        canvasWidth={width}
        canvasHeight={height ? height - 82 : 800}
        gridColor={"black"}
        brushColor={brushColor}
        backgroundColor={canvasColor}
        catenaryColor={hideInterface ? "tranparent" : "#111"}
        lazyRadius={hideInterface ? 2 : 13}
        brushRadius={brushSize}
        hideGrid
        hideInterface={hideInterface}
        ref={setDrawPadRef}
      />
      <div className="details-tab">
        <div className="tools">
          <div className="d-flex align-items-center">
            <IoMdBrush />:
            <input
              type="color"
              onChange={e => setBrushColor(e.target.value)}
              placeholder="Brush"
              className="color-picker input"
              value={brushColor}
              title="Brush color"
            />
          </div>
          <div className="d-flex align-items-center">
            <FaClipboard />:
            <input
              type="color"
              onChange={e => setCanvasColor(e.target.value)}
              placeholder="Brush"
              className="color-picker input"
              value={canvasColor}
              title="Canvas color"
            />
          </div>
          <div className="d-flex align-items-center">
            <SiZerply />:
            <input
              type="number"
              onChange={e =>
                setBrushSize(
                  parseInt(e.target.value) <= 0 ? 0 : parseInt(e.target.value)
                )
              }
              value={brushSize}
              className="input"
              title="Brush size"
              max={80}
            />
          </div>
          <div className="d-flex align-items-center">
            <FaVine />:
            <input
              type="checkbox"
              className="input"
              title="Show catenary"
              checked={hideInterface}
              onChange={e => setHideInterface(e.target.checked)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DrawPad;
