import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js';
import About from './pages/About.js';
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
