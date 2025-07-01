import Home from './pages/Home.js';
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
