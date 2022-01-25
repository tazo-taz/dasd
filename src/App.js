import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Main from './pages/main';
import Quiz from './pages/quiz';
import History from './pages/history';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
