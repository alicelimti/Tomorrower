import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/layout/BottomNav';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Info from './pages/Info';
import Quiz from './pages/Quiz';
import My from './pages/My';
import UpdatePrompt from './components/UpdatePrompt';

export default function App() {
  return (
    <BrowserRouter basename="/Tomorrower">
      <Routes>
        <Route path="/" element={<><Home /><BottomNav /></>} />
        <Route path="/schedule" element={<><Schedule /><BottomNav /></>} />
        <Route path="/info" element={<><Info /><BottomNav /></>} />
        <Route path="/quiz" element={<><Quiz /><BottomNav /></>} />
        <Route path="/my" element={<><My /><BottomNav /></>} />
      </Routes>
      <UpdatePrompt />
    </BrowserRouter>
  );
}
