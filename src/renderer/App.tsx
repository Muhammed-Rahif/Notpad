/* eslint-disable no-alert */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '7.css/dist/7.css';
import './App.scss';
import { useContext } from 'react';
import { EditorState } from '@codemirror/basic-setup';
import TitleBar from './components/TItleBar/TitleBar';
import MenuBar from './components/MenuBar/MenuBar';
import TextBox from './components/TextBox/TextBox';
import StatusBar from './components/StatusBar/StatusBar';
import { EditorViewContext } from './contexts/EditorView';
import { defaultExtensions } from './helpers/editor';

const Notepad = () => {
  const { editorView } = useContext(EditorViewContext);

  const handleOpenFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    (e.target.files as FileList)[0]
      ?.text()
      // eslint-disable-next-line promise/always-return
      .then((fileContent) => {
        editorView.setState(
          EditorState.create({
            doc: fileContent,
            extensions: defaultExtensions,
          })
        );
      })
      .catch(alert);
  };

  return (
    <>
      <TitleBar />
      <div className="window-body">
        <MenuBar />
        <TextBox />
      </div>
      <StatusBar />
      <input
        type="file"
        accept=".css,.js,.html,.md,.java,.py,.xml,.php,.json,.cpp,.rs"
        id="open-file"
        hidden
        onChange={handleOpenFileChange}
        multiple={false}
      />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <div className="window" data-testid="window">
        <Routes>
          <Route path="/" element={<Notepad />} />
        </Routes>
      </div>
    </Router>
  );
}
