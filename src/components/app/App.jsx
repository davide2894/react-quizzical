import './App.scss';
import Home from '../home/Home';
import Quiz from '../quiz/Quiz';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='quiz' element={<Quiz />} />
        </Routes>
    </div>
  );
}

export default App;
