import { Route, Routes } from 'react-router-dom';
import { MainPage } from '@/pages/Main/MainPage';
import { NotePage } from '@/pages/Note/NotePage';
import { CalendarPage } from '@/pages/Calendar/CalendarPage';
import { AboutPage } from '@/pages/About/AboutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/note/:noteId" element={<NotePage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
