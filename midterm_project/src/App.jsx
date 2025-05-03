import Homepage from "./pages/homepage";
import ComicPage from './pages/comicPage';
import { Routes, Route } from 'react-router-dom';
import ChapterPage from './pages/chapterPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/comic/:comicTitle" element={<ComicPage />} />
      </Routes>
      {/* <ChapterPage /> */}
    </>
  );
}

export default App;
