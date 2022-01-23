/* eslint-disable no-alert */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '7.css/dist/7.css';
import './App.scss';
import TitleBar from './components/TItleBar/TitleBar';
import MenuBar from './components/MenuBar/MenuBar';
import TextBox from './components/TextBox/TextBox';
import StatusBar from './components/StatusBar/StatusBar';
// import { getInputFileContent } from './helpers/files';

const Notepad = () => {
  const handleOpenFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // getInputFileContent(e.target, (err, fileContent) => {
    //   if (err) alert(err);
    //   else
    //     (document.getElementById('text-box') as HTMLTextAreaElement).value =
    //       fileContent || '';
    // });
    console.log({ val: e.target.files });
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
