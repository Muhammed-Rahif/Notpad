import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  MouseEvent,
  useEffect,
} from "react";
import "./TextArea.scss";
import {
  getColumnIndex,
  getLineNumber,
  enableTabIndentation,
} from "../../helpers";

function TextArea() {
  const [linesNum, setLineNum] = useState(1);
  const [columnIndex, setColumnIndex] = useState(0);

  function handleTextAreaChange(
    event:
      | ChangeEvent<HTMLTextAreaElement>
      | KeyboardEvent<HTMLTextAreaElement>
      | MouseEvent<HTMLTextAreaElement>
  ) {
    setLineNum(getLineNumber(event.target as HTMLTextAreaElement));

    setColumnIndex(getColumnIndex(event.target as HTMLTextAreaElement));
  }

  useEffect(() => {
    let textAreaElem: HTMLTextAreaElement = document.getElementById(
      "text-area"
    ) as HTMLTextAreaElement;
    enableTabIndentation(textAreaElem);
  }, []);

  return (
    <div id="text-area-wrapper" data-testid="text-area-wrapper">
      <textarea
        name="text-area"
        id="text-area"
        autoFocus
        spellCheck="false"
        onKeyUp={handleTextAreaChange}
        onKeyDown={handleTextAreaChange}
        onKeyPress={handleTextAreaChange}
        onChange={handleTextAreaChange}
        onFocus={handleTextAreaChange}
        onMouseUp={handleTextAreaChange}
        data-testid="text-area"
      />

      <div className="details-tab">
        <div className="line-number">
          <p data-testid="line-index">
            Ln {linesNum}, Col {columnIndex}
          </p>
        </div>
        <div className="extra-details"></div>
      </div>
    </div>
  );
}

export default TextArea;
