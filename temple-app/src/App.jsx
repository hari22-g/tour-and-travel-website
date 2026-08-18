import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TempleListPage from './components/TempleListPage';
import TempleDetailsPage from './components/TempleDetailsPage';
import BookingPage from './components/BookingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TempleListPage />} />
        <Route path="/temple/:slug" element={<TempleDetailsPage />} />
        <Route path="/booking/:slug" element={<BookingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
