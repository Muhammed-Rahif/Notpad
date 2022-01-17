import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import TitleBar from './components/TItleBar/TitleBar';
import MenuBar from './components/MenuBar/MenuBar';
import TextBox from './components/TextBox/TextBox';
import StatusBar from './components/StatusBar/StatusBar';

const Notepad = () => {
  return (
    <>
      <TitleBar />
      <div className="window-body">
        <MenuBar />
        <TextBox />
      </div>
      <StatusBar />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <div className="window">
        <Routes>
          <Route path="/" element={<Notepad />} />
        </Routes>
      </div>
    </Router>
  );
}
