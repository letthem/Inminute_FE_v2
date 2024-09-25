import { Route, Routes } from 'react-router-dom';
import { ListPage } from '@/pages/List/ListPage';
import { NotePage } from '@/pages/Note/NotePage';
import { CalendarPage } from '@/pages/Calendar/CalendarPage';
import { IntroPage } from '@/pages/Intro/IntroPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/note/:noteId" element={<NotePage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/intro" element={<IntroPage />} />
    </Routes>
  );
}

export default App;
