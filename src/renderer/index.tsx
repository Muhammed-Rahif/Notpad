import { render } from 'react-dom';
import App from './App';
import EditorViewProvider from './contexts/EditorView';
import OpenFileProvider from './contexts/OpenFile';

render(
  <EditorViewProvider>
    <OpenFileProvider>
      <App />
    </OpenFileProvider>
  </EditorViewProvider>,
  document.getElementById('root')
);
