import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import screenfull from 'screenfull';
import App from '../renderer/App';

describe('TitleBar component tests', () => {
  it('should goto fullscreen when fullscreen btn clicks', async () => {
    render(<App />);
    const fullscreenBtn = await screen.findByTestId('fullscreen-btn');
    fullscreenBtn.click();

    expect(screenfull.isEnabled).toBeTruthy();
  });
});
