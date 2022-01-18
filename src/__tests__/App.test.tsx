import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../renderer/App';

describe('App', () => {
  it('should render', () => {
    render(<App />);
    const windowElem = screen.findByTestId('window');

    expect(windowElem).toBeInTheDocument();
  });
});
