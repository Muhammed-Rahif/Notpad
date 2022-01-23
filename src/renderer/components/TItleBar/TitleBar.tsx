import './TitleBar.scss';
import { BrowserWindow } from '@electron/remote';
import screenfull from 'screenfull';
import { useState } from 'react';

function TitleBar() {
  const [fullScreen, setFullScreen] = useState(screenfull.isFullscreen);

  const toggleFullscreen = () => {
    screenfull.toggle(document.documentElement || document.body);
    setFullScreen(!fullScreen);
  };

  return (
    <div className="title-bar">
      <div className="title-bar-text">Notepad</div>
      <div className="title-bar-controls">
        <button
          type="button"
          aria-label="Minimize"
          onClick={() => BrowserWindow.getFocusedWindow()?.minimize()}
        />
        <button
          type="button"
          aria-label={fullScreen ? 'Restore' : 'Maximize'}
          onClick={toggleFullscreen}
          data-testid="fullscreen-btn"
        />
        <button type="button" aria-label="Close" onClick={window.close} />
      </div>
    </div>
  );
}

export default TitleBar;
