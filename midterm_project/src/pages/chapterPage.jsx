import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import comicsData from '../assets/comicsData';
import pagesPerChapterData from '../assets/pagesPerChapter';
import {
  Container,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Card,
  CardMedia,
  Button,
} from '@mui/material';
import Footer from '../components/footer';
import Trending from '../components/trending';
import ComicPageNavbar from '../components/comicPageNavbar';

const ChapterPage = () => {
  const { comicTitle, chapterNumber } = useParams();
  const navigate = useNavigate();
  const decodedTitle = decodeURIComponent(comicTitle);
  const currentChapter = chapterNumber || '1';

  const comic = comicsData.find((comic) => comic.title === decodedTitle);
  const pagesPerChapter = pagesPerChapterData[decodedTitle];

  const [selectedChapter, setSelectedChapter] = useState(currentChapter);

  useEffect(() => {
    setSelectedChapter(currentChapter);
    window.scrollTo(0, 0);
  }, [currentChapter]);

  const handleChapterChange = (event) => {
    const newChapter = event.target.value;
    setSelectedChapter(newChapter);
    navigate(`/chapter/${encodeURIComponent(decodedTitle)}/${newChapter}`);
  };

  if (!comic || !pagesPerChapter) {
    return <Typography variant="h4">Comic or pages not found</Typography>;
  }

  const chapterPath = `${comic.chapterPath}/${selectedChapter}`;
  const chapterKeys = Object.keys(pagesPerChapter);
  const sortedChapterKeys = chapterKeys.sort((a, b) => parseFloat(a) - parseFloat(b));
  const pages = Array.from({ length: pagesPerChapter[selectedChapter] }, (_, index) =>
    `${chapterPath}/${String(index + 1).padStart(3, '0')}.jpg`
  );

  return (
    <Box>
      <ComicPageNavbar />
      <Container>
        <Typography variant="h4" gutterBottom>
          {comic.title} - Chapter {selectedChapter}
        </Typography>

        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Select Chapter</InputLabel>
          <Select
            value={selectedChapter}
            onChange={handleChapterChange}
            label="Select Chapter"
          >
            {sortedChapterKeys.map((chapter) => (
              <MenuItem key={chapter} value={chapter}>
                Chapter {chapter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate(`/comic/${encodeURIComponent(comic.title)}`)}
        >
          Return to Manga Page
        </Button>

        <Box display="flex" flexDirection="column" gap={2}>
          {pages.map((url, index) => (
            <Card key={index} elevation={3}>
              <CardMedia
                component="img"
                image={url}
                alt={`Page ${index + 1}`}
                sx={{ width: '100%' }}
              />
            </Card>
          ))}
        </Box>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate(`/comic/${encodeURIComponent(comic.title)}`)}
          sx={{ marginBottom: 2 }}
        >
          Return to Manga Page
        </Button>

        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Select Chapter</InputLabel>
          <Select
            value={selectedChapter}
            onChange={handleChapterChange}
            label="Select Chapter"
          >
            {sortedChapterKeys.map((chapter) => (
              <MenuItem key={chapter} value={chapter}>
                Chapter {chapter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </Container>
      <Trending />
      <Footer />
    </Box>
  );
};

export default ChapterPage;
