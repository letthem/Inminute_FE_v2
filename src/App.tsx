import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AOS from 'aos';
import { MainPage } from '@/pages/Main/MainPage';
import { NotePage } from '@/pages/Note/NotePage';
import { CalendarPage } from '@/pages/Calendar/CalendarPage';
import { AboutPage } from '@/pages/About/AboutPage';
import 'aos/dist/aos.css';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/home" element={<MainPage />} />
          <Route path="/note/:uuid" element={<NotePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/" element={<AboutPage />} />
        </Routes>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
