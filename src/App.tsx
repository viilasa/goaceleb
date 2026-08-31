import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { CelebrationProvider } from './context/CelebrationContext';
import { About } from './pages/About';
import { BookConsultation } from './pages/BookConsultation';
import { BuildCelebration } from './pages/BuildCelebration';
import { Home } from './pages/Home';
import { Journal } from './pages/Journal';
import { JournalArticle } from './pages/JournalArticle';
import { Services } from './pages/Services';
import { WeddingStory } from './pages/WeddingStory';
import { Weddings } from './pages/Weddings';

function JournalSlugRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/blogs/${slug || ''}`} replace />;
}

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
            <Route path="plan/build" element={<BuildCelebration />} />
            <Route path="plan" element={<Navigate to="/plan/build" replace />} />
            <Route path="about" element={<About />} />
            <Route path="blogs" element={<Journal />} />
            <Route path="blogs/:slug" element={<JournalArticle />} />
            <Route path="journal" element={<Navigate to="/blogs" replace />} />
            <Route path="journal/:slug" element={<JournalSlugRedirect />} />
            <Route path="packages" element={<Navigate to="/" replace />} />
            <Route path="contact" element={<Navigate to="/book?mode=enquiry" replace />} />
            <Route path="book" element={<BookConsultation />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </CelebrationProvider>
    </BrowserRouter>
  );
}
