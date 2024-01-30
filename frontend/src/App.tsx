import Home from './pages/Home';
import Search from './pages/Search';
import Result from './pages/Result';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
