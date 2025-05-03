import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import comicsData from '../assets/comicsData';
import { useNavigate } from 'react-router-dom';

const Trending = () => {
    const trendingComics = comicsData.filter(comic => comic.tags?.includes('trending'));
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const navigate = useNavigate();

    const getSlidesPerView = () => {
        if (isSmallScreen) return 1;
        if (isMediumScreen) return 2;
        return 3;
    };

    const handleComicClick = (comicTitle) => {
        window.scrollTo(0, 0); // Ensure the page starts at the top when navigating
        navigate(`/comic/${encodeURIComponent(comicTitle)}`);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(to bottom, rgba(61, 144, 215, 1), rgba(61, 144, 215, 0))', // Add fade effect
            }}
        >
            <Box sx={{ width: '90%', textAlign: 'center' }}>
                <Typography variant="h4" color="white" gutterBottom>
                    Trending Comics
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Box>
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={getSlidesPerView()}
                            navigation
                            pagination={{ clickable: true }}
                            loop={true}
                            modules={[Navigation, Pagination]}
                        >
                            {trendingComics.slice(0, Math.ceil(trendingComics.length / 2)).map((comic, index) => (
                                <SwiperSlide key={index}>
                                    <Box
                                        sx={{
                                            backgroundColor: 'white',
                                            height: '200px',
                                            margin: '10px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleComicClick(comic.title)}
                                    >
                                        {comic.image && (
                                            <img src={comic.image} alt={comic.title} style={{ width: '100px', height: '150px', objectFit: 'cover', marginBottom: '10px' }} />
                                        )}
                                        {comic.title}
                                    </Box>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Box>
                    <Box>
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={getSlidesPerView()}
                            navigation
                            pagination={{ clickable: true }}
                            loop={true}
                            modules={[Navigation, Pagination]}
                        >
                            {trendingComics.slice(Math.ceil(trendingComics.length / 2)).map((comic, index) => (
                                <SwiperSlide key={index}>
                                    <Box
                                        sx={{
                                            backgroundColor: 'white',
                                            height: '200px',
                                            margin: '10px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleComicClick(comic.title)}
                                    >
                                        {comic.image && (
                                            <img src={comic.image} alt={comic.title} style={{ width: '100px', height: '150px', objectFit: 'cover', marginBottom: '10px' }} />
                                        )}
                                        {comic.title}
                                    </Box>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Trending;