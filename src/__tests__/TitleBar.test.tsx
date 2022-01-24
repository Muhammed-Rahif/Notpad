import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import screenfull from 'screenfull';
import EditorViewProvider from '../renderer/contexts/EditorView';
import App from '../renderer/App';

const Application = () => (
  <EditorViewProvider>
    <App />
  </EditorViewProvider>
);

describe('TitleBar component tests', () => {
  it('should goto fullscreen when fullscreen btn clicks', async () => {
    render(<Application />);
    const fullscreenBtn = await screen.findByTestId('fullscreen-btn');
    fullscreenBtn.click();

    expect(screenfull.isEnabled).toBeTruthy();
  });
});
