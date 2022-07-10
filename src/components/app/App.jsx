import './App.scss';
import Home from '../home/Home';
import Quiz from '../quiz/Quiz';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='quiz' element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
