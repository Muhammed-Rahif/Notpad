import React, { useContext } from "react";
import "./AlertBox.scss";
import { VscChromeClose } from "react-icons/vsc";
import { AlertBoxContext } from "../../contexts/Context";

function AlertBox() {
  const { alertBox, setAlertBox } = useContext(AlertBoxContext);

  return (
    <div
      id="alert-box-wrapper"
      style={{ display: Boolean(alertBox) ? "flex" : "none" }}
      data-testid="alert-box-wrapper"
    >
      <div id="alert-box" className="alert-box">
        <header>
          <p>{alertBox?.title || "Alert"}</p>
          <button
            data-testid="btn-cls"
            className="btn-cls"
            onClick={() => setAlertBox(null)}
          >
            <VscChromeClose />
          </button>
        </header>
        <div className="alert-body">
          <p>{alertBox?.body || "Are you sure want to continue?"}</p>
        </div>
        <div className="alert-footer">
          {alertBox?.buttons.map((button, indx: number) => (
            <button onClick={button.onClick} key={indx}>
              {button.text}
            </button>
          )) || (
            <>
              <button onClick={() => setAlertBox(null)}>Cancel</button>
              <button onClick={() => setAlertBox(null)}>Ok</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlertBox;
