import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../renderer/App';

describe('App', () => {
  it('should render without crashing', () => {
    expect(render(<App />)).toBeTruthy();
  });

  it('should have "window" elem in document body', async () => {
    render(<App />);
    const windowElem = await screen.findByTestId('window');
    expect(windowElem).toBeInTheDocument();
  });
});
