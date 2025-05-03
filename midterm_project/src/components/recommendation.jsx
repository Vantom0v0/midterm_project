import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import comicsData from '../assets/comicsData';
import { useNavigate } from 'react-router-dom';

const recommendation = () => {
  const navigate = useNavigate();

  const recommendedComics = comicsData.filter(comic => comic.tags?.includes('recommended'));

  const onComicClick = (index) => {
    const comicTitle = recommendedComics[index].title;
    navigate(`/comic/${encodeURIComponent(comicTitle)}`);
  };

  return (
       <Box
      sx={{
        padding: 4,
        height: { xs: '95vh', sm: '80vh', md: '90vh' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B192C',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '90%', md: '1400px' },
          padding: { xs: 2, sm: 4 },
          margin: '0 auto',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: 4, color: 'white', fontWeight: 'bold' }}>
          RECOMENDATIONS
        </Typography>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={10}
          slidesPerView={1}
          style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: { xs: '10%', md: '5%' },
              zIndex: 2,
              cursor: 'pointer',
              background: 'linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))',
              transition: 'background 0.5s ease',
              '&:hover, .swiper-button-prev:hover': {
                background: 'linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
              },
            }}
            onClick={() => document.querySelector('.swiper-button-prev').click()}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: { xs: '10%', md: '5%' },
              zIndex: 2,
              cursor: 'pointer',
              background: 'linear-gradient(to left, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))',
              transition: 'background 0.5s ease',
              '&:hover, .swiper-button-next:hover': {
                background: 'linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
              },
            }}
            onClick={() => document.querySelector('.swiper-button-next').click()}
          />
          {recommendedComics.map((comic, index) => (
            <SwiperSlide key={index}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row', md: 'row' },
                  maxWidth: '100%',
                  margin: 'auto',
                  boxShadow: 3,
                  '&:hover': { boxShadow: 6 },
                  height: { xs: '700px', sm: '400px', md: '600px' },
                  overflow: 'hidden',
                }}
                onClick={() => onComicClick(index)}
              >
                <CardMedia
                  component="img"
                  image={comic.image}
                  alt={comic.title}
                  sx={{
                    width: { xs: '100%', sm: '33%', md: '33%' },
                    height: { xs: '55%', sm: '100%', md: '100%' },
                    objectFit: 'cover',
                  }}
                />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 3,
                    width: { xs: '100%', sm: '67%', md: '67%' },
                    maxWidth: '100%',
                  }}
                >
                  <Typography variant="h5" component="div" gutterBottom>
                    {comic.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {comic.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default recommendation;