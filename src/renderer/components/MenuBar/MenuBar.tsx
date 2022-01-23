import './MenuBar.scss';

function MenuBar() {
  const handleOpenBtnClick = () => {
    document.getElementById('open-file')?.click();
  };

  return (
    <ul role="menubar" className="menubar">
      <li role="menuitem" tabIndex={0} aria-haspopup="true">
        File
        <ul role="menu">
          <li
            role="menuitem"
            onClick={handleOpenBtnClick}
            onKeyPress={handleOpenBtnClick}
          >
            <a href="#menu">Open</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Save</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Save As...</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Exit</a>
          </li>
        </ul>
      </li>
      <li role="menuitem" tabIndex={0} aria-haspopup="true">
        Edit
        <ul role="menu">
          <li role="menuitem">
            <a href="#menu">Undo</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Copy</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Cut</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Paste</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Delete</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Find...</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Replace...</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Go to...</a>
          </li>
        </ul>
      </li>
      <li role="menuitem" tabIndex={0} aria-haspopup="true">
        View
        <ul role="menu">
          <li role="menuitem" tabIndex={0} aria-haspopup="true">
            Zoom
            <ul role="menu">
              <li role="menuitem">
                <button type="button">Zoom In</button>
              </li>
              <li role="menuitem">
                <button type="button">Zoom Out</button>
              </li>
            </ul>
          </li>
          <li role="menuitem">
            <a href="#menu">Status Bar</a>
          </li>
        </ul>
      </li>
      <li role="menuitem" tabIndex={0} aria-haspopup="true">
        Help
        <ul role="menu">
          <li role="menuitem">
            <a href="#menu">View Help</a>
          </li>
          <li role="menuitem">
            <a href="#menu">About</a>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default MenuBar;
