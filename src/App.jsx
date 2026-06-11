import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/layout/BottomNav';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Quiz from './pages/Quiz';
import Info from './pages/Info';
import My from './pages/My';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Home /><BottomNav /></>} />
        <Route path="/schedule" element={<><Schedule /><BottomNav /></>} />
        <Route path="/quiz" element={<><Quiz /><BottomNav /></>} />
        <Route path="/info" element={<><Info /><BottomNav /></>} />
        <Route path="/my" element={<><My /><BottomNav /></>} />
      </Routes>
    </BrowserRouter>
  );
}
