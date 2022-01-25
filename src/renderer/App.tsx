import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '7.css/dist/7.css';
import './App.scss';
import TitleBar from './components/TItleBar/TitleBar';
import MenuBar from './components/MenuBar/MenuBar';
import TextBox from './components/TextBox/TextBox';
import StatusBar from './components/StatusBar/StatusBar';

const Macropad = () => {
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
      <div className="window" data-testid="window">
        <Routes>
          <Route path="/" element={<Macropad />} />
        </Routes>
      </div>
    </Router>
  );
}
