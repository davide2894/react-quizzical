import './App.scss';
import Home from '../home/Home';
import Quiz from '../quiz/Quiz';
import { Routes, Route, HashRouter } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <HashRouter basename="/">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='quiz' element={<Quiz />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
