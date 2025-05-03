import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import comicsData from '../assets/comicsData';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import ComicPageNavbar from '../components/comicPageNavbar';
import Trending from '../components/trending';
import Footer from '../components/footer';

function ComicPage() {
  const { comicTitle } = useParams();
  const navigate = useNavigate();
  const decodedTitle = decodeURIComponent(comicTitle);
  const comic = comicsData.find((comic) => comic.title === decodedTitle);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!comic) {
    return <Typography variant="h4">Comic not found</Typography>;
  }

  return (
    <>
      <ComicPageNavbar />
      <Box sx={{
        padding: 6,
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'linear-gradient(to right, rgba(52, 58, 76, 0.6), rgba(0, 0, 0, 0))',
        borderRadius: '8px',
      }}>
        <Box
          sx={{
            height: { xs: '0px', md: '400px' },
            backgroundImage: { xs: 'none', md: `url(${comic.image})` },
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginBottom: 6,
          }}
        />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 12 }}>
          {/* Left Panel */}
          <Box sx={{ flex: 1 }}>
            <Card sx={{ marginBottom: 4 }}>
              <CardMedia
                component="img"
                image={comic.image}
                alt={comic.title}
                sx={{ height: { xs: 'auto', md: '700px' }, width: '100%', objectFit: 'cover' }}
              />
            </Card>
            <Typography variant="h3" gutterBottom>{comic.title}</Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.25rem' }}>
              {comic.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 4 }}>
              {comic.tags.map((tag, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    backgroundColor: '#e0e0e0',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '1rem',
                  }}
                >
                  {tag}
                </Typography>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() =>
                  navigate(`/chapter/${encodeURIComponent(comic.title)}/1`)
                }
              >
                Read First Chapter
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() =>
                  navigate(`/chapter/${encodeURIComponent(comic.title)}/${comic.chapters}`)
                }
              >
                Read Latest Chapter
              </Button>
            </Box>
          </Box>

          {/* Right Panel */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>Chapters</Typography>
            <List sx={{ backgroundColor: '#EEEEEE', borderRadius: '8px' }}>
              {Array.from({ length: comic.chapters }, (_, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() =>
                    navigate(`/chapter/${encodeURIComponent(comic.title)}/${index + 1}`)
                  }
                >
                  <ListItemText primary={`Chapter ${index + 1}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Trending />
      </Box>
      <Footer />
    </>
  );
}

export default ComicPage;
