import { render } from 'react-dom';
import App from './App';
import EditorViewProvider from './contexts/EditorView';

render(
  <EditorViewProvider>
    <App />
  </EditorViewProvider>,
  document.getElementById('root')
);
