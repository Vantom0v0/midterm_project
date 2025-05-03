import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import comicsData from '../assets/comicsData';
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
} from '@mui/material';
import Footer from '../components/footer';
import Trending from '../components/trending';
import ComicPageNavbar from '../components/comicPageNavbar';

const ComicPage = () => {
  const { chapterNumber } = useParams();
  const currentChapter = parseFloat(chapterNumber, 10.0) || 1;

  const [selectedChapter, setSelectedChapter] = useState(currentChapter);

  const handleChapterChange = (event) => {
    setSelectedChapter(event.target.value);
  };

  // Use "Kaoru Hana Wa Rin To Saku" as the example comic
  const title = 'Kaoru Hana wa Rin to Saku';
  const comic = comicsData.find((comic) => comic.title === title);

  if (!comic) {
    return <Typography variant="h4">Example comic not found</Typography>;
  }

  const chapterPath = `${comic.chapterPath}/${selectedChapter}`;
  const chapterKeys = Object.keys(comic.pagesPerChapter);
  const sortedChapterKeys = chapterKeys.sort((a, b) => parseFloat(a) - parseFloat(b));
  const pages = Array.from({ length: comic.pagesPerChapter[selectedChapter] }, (_, index) =>
    `${chapterPath}/${String(index + 1).padStart(3, '0')}.jpg`
  );

  return (
    <Box>
      <ComicPageNavbar />
      <Container>
        <Typography variant="h4" gutterBottom>
          {comic.title}
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
      </Container>
      <Trending />
      <Footer />
    </Box>
  );
};

export default ComicPage;
