import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { CelebrationProvider } from './context/CelebrationContext';
import { About } from './pages/About';
import { BookConsultation } from './pages/BookConsultation';
import { BuildCelebration } from './pages/BuildCelebration';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { Journal } from './pages/Journal';
import { JournalArticle } from './pages/JournalArticle';
import { Packages } from './pages/Packages';
import { Services } from './pages/Services';
import { WeddingStory } from './pages/WeddingStory';
import { Weddings } from './pages/Weddings';

export default function App() {
  return (
    <BrowserRouter>
      <CelebrationProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="weddings" element={<Weddings />} />
            <Route path="weddings/:slug" element={<WeddingStory />} />
            <Route path="services" element={<Services />} />
            <Route path="packages" element={<Packages />} />
            <Route path="plan/build" element={<BuildCelebration />} />
            <Route path="plan" element={<Navigate to="/plan/build" replace />} />
            <Route path="about" element={<About />} />
            <Route path="journal" element={<Journal />} />
            <Route path="journal/:slug" element={<JournalArticle />} />
            <Route path="contact" element={<Contact />} />
            <Route path="book" element={<BookConsultation />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </CelebrationProvider>
    </BrowserRouter>
  );
}
