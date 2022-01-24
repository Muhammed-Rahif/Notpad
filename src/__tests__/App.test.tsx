import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EditorViewProvider from '../renderer/contexts/EditorView';
import App from '../renderer/App';

const Application = () => (
  <EditorViewProvider>
    <App />
  </EditorViewProvider>
);

describe('App component tests', () => {
  it('should render without crashing', () => {
    expect(render(<Application />)).toBeTruthy();
  });

  it('should have "window" elem in document body', async () => {
    render(<Application />);
    const windowElem = await screen.findByTestId('window');
    expect(windowElem).toBeInTheDocument();
  });
});
