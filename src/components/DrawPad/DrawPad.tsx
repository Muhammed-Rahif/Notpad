import React, { useContext, useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import useWindowSize from "../../hooks/useWindowSize";
import "./DrawPad.scss";
import { IoMdBrush } from "react-icons/io";
import { FaClipboard, FaVine } from "react-icons/fa";
import { SiZerply } from "react-icons/si";
import { DrawPadRefContext } from "../../contexts/Context";

function DrawPad() {
  const { height, width } = useWindowSize();
  const [brushColor, setBrushColor] = useState("#111");
  const [canvasColor, setCanvasColor] = useState("#fff");
  const [brushSize, setBrushSize] = useState(8);
  const [lazyRadius, setLazyRadius] = useState(13);
  const { drawPadRef, setDrawPadRef } = useContext(DrawPadRefContext);
  const [catenaryColor, setCatenaryColor] = useState("#111");

  useEffect(() => {
    localStorage.getItem("drawPadData") &&
      drawPadRef?.loadSaveData &&
      drawPadRef?.loadSaveData(localStorage.getItem("drawPadData"));
  }, [drawPadRef]);

  return (
    <>
      <CanvasDraw
        className="draw-pad"
        canvasWidth={width}
        canvasHeight={height ? height - 82 : 800}
        gridColor={"black"}
        brushColor={brushColor}
        backgroundColor={canvasColor}
        catenaryColor={catenaryColor}
        lazyRadius={lazyRadius}
        brushRadius={brushSize}
        hideGrid
        ref={setDrawPadRef}
        onChange={data =>
          localStorage.setItem("drawPadData", data.getSaveData())
        }
      />
      <div className="details-tab">
        <div className="tools">
          <div className="d-flex align-items-center">
            <IoMdBrush />:
            <input
              type="color"
              onChange={e => setBrushColor(e.target.value)}
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
              type="number"
              className="input"
              title="Catenary size"
              onChange={e =>
                setLazyRadius(
                  parseInt(e.target.value) <= 0 ? 0 : parseInt(e.target.value)
                )
              }
              value={lazyRadius}
              max={80}
            />
          </div>

          <div className="d-flex align-items-center">
            <FaVine />:
            <input
              type="color"
              onChange={e => setCatenaryColor(e.target.value)}
              className="color-picker input"
              value={catenaryColor}
              title="Catenary color"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DrawPad;
