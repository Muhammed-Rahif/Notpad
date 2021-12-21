import React, { useState, ChangeEvent } from "react";
import "./TextArea.scss";
import { getColumnIndex, getLineNumber } from "../../helpers";

function TextArea() {
  const [linesNum, setLineNum] = useState(1);
  const [columnIndex, setColumnIndex] = useState(0);

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setLineNum(getLineNumber(event.target));

    setColumnIndex(getColumnIndex(event.target));
  }

  return (
    <div id="text-area-wrapper" data-testid="text-area-wrapper">
      <textarea
        name="text-area"
        id="text-area"
        autoFocus
        spellCheck="false"
        onChange={handleTextAreaChange}
      />

      <div className="details-tab">
        <div className="line-number">
          <p>
            Ln {linesNum}, Col {columnIndex}
          </p>
        </div>
        <div className="extra-details"></div>
      </div>
    </div>
  );
}

export default TextArea;
