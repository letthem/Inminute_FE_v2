import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import AOS from 'aos';
import { MainPage } from '@/pages/Main/MainPage';
import { NotePage } from '@/pages/Note/NotePage';
import { CalendarPage } from '@/pages/Calendar/CalendarPage';
import { AboutPage } from '@/pages/About/AboutPage';
import { OAuthRedirect } from '@/components/Login/OAuthRedirect/OAuthRedirect';
import Layout from '@/components/Layout/Layout';
import 'aos/dist/aos.css';
import { LoginPage } from '@/pages/Login/LoginPage';
import { JoinPage } from '@/pages/Join/JoinPage';

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
          <Route path="/" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/google/callback" element={<OAuthRedirect />} />
          <Route path="/kakao/callback" element={<OAuthRedirect />} />
          <Route
            path="/home"
            element={
              <Layout>
                <MainPage />
              </Layout>
            }
          />
          <Route
            path="/note/:uuid"
            element={
              <Layout>
                <NotePage />
              </Layout>
            }
          />
          <Route
            path="/calendar"
            element={
              <Layout>
                <CalendarPage />
              </Layout>
            }
          />
        </Routes>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
