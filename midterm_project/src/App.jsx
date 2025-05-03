import Homepage from "./pages/homepage";
import ComicPage from './pages/comicPage';
import ChapterPage from './pages/chapterPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/comic/:comicTitle" element={<ComicPage />} />
      <Route path="/chapter/:comicTitle/:chapterNumber" element={<ChapterPage />} />
    </Routes>
  );
}

export default App;
