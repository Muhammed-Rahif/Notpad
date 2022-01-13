import React, { useState, MutableRefObject } from "react";
import { changeFont } from "../../../helpers";

const fontFamilies: string[] = [
  "Montserrat",
  "Nanum Gothic",
  "Nunito",
  "Oswald",
  "Poppins",
  "Roboto",
  "Roboto Condensed",
  "Roboto Mono",
  "The Nautigal",
  "Titillium Web",
  "Ubuntu",
  "Ubuntu Mono",
].sort();

const fontStyles: string[] = ["bold", "italic", "normal", "bold italic"];

const fontSizes: number[] = [
  2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72,
];

function ChangeFontBody({
  fontChangesRef,
}: {
  fontChangesRef: MutableRefObject<
    | {
        handleOkClick(): void;
      }
    | undefined
  >;
}) {
  const [fontFamily, setFontFamily] = useState("Lucida Console");
  const [fontStyle, setFontStyle] = useState("normal");
  const [fontSize, setFontSize] = useState(14);

  fontChangesRef.current = {
    handleOkClick: function () {
      changeFont({
        family: fontFamily,
        size: fontSize,
        style: fontStyle,
      });
    },
  };

  const changePreviewFontTo = ({
    family = fontFamily,
    size = fontSize,
    style = fontStyle,
  }) => {
    setFontFamily(family);
    setFontStyle(style);
    setFontSize(size);
    family = `${family}, sans-serif`;

    const previewTxt = document.getElementById(
      "preview-font-change"
    ) as HTMLElement;
    previewTxt.style.fontFamily = family;
    previewTxt.style.fontSize = `${size}px`;

    if (/bold/i.test(style)) previewTxt.style.fontWeight = "900";
    else previewTxt.style.fontWeight = "normal";
    if (/italic/i.test(style)) previewTxt.style.fontStyle = "italic";
    else previewTxt.style.fontStyle = "normal";
  };

  return (
    <div className="change-font-body">
      <h3>Preview:</h3>
      <h2 id="preview-font-change" className="blue-border p-1">
        AaBbYyZz
      </h2>
      <br />
      <hr />
      <br />

      <h4>Font family:</h4>
      <div className="blue-border">
        <button className="btn w-100 blue-border">{fontFamily}</button>

        <div className="scroll-btns">
          {fontFamilies.map((fontName, key) => (
            <button
              className="menu-btn btn w-100"
              onClick={() => changePreviewFontTo({ family: fontName })}
              key={key}
              style={{ fontFamily: fontName }}
            >
              {fontName}
            </button>
          ))}
        </div>
      </div>

      <br />

      <h4>Font style:</h4>
      <div className="blue-border">
        <button className="btn w-100 blue-border">{fontStyle}</button>

        <div className="scroll-btns">
          {fontStyles.map((fontStyle, key) => (
            <button
              className="menu-btn btn w-100"
              onClick={() => changePreviewFontTo({ style: fontStyle })}
              key={key}
              style={
                /bold/i.test(fontStyle)
                  ? {
                      fontWeight: "900",
                      fontStyle: /italic/i.test(fontStyle)
                        ? "italic"
                        : fontStyle,
                    }
                  : { fontStyle }
              }
            >
              {fontStyle}
            </button>
          ))}
        </div>
      </div>

      <br />

      <h4>Font size:</h4>
      <div className="blue-border">
        <button className="btn w-100 blue-border">{fontSize}</button>

        <div className="scroll-btns">
          {fontSizes.map((fontSize, key) => (
            <button
              className="menu-btn btn w-100"
              onClick={() => changePreviewFontTo({ size: fontSize })}
              key={key}
            >
              {fontSize}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChangeFontBody;
