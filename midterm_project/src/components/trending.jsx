import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
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
        window.scrollTo(0, 0);
        navigate(`/comic/${encodeURIComponent(comicTitle)}`);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(to bottom, rgba(61, 144, 215, 1), rgba(61, 144, 215, 0))',
            }}
        >
            <Box sx={{ width: '90%', textAlign: 'center' }}>
                <Typography variant="h4" color="white" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 4 }}>
                    TRENDING COMICS
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Box>
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={getSlidesPerView()}
                            navigation
                            pagination={{ clickable: true }}
                            loop={true}
                            modules={[Navigation, Pagination, Autoplay]}
                            autoplay={{
                                delay: 0,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            speed={5000}
                        >
                            {trendingComics.slice(0, Math.ceil(trendingComics.length / 2)).map((comic, index) => (
                                <SwiperSlide key={index}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: { xs: 'column', sm: 'row' },
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            gap: '20px',
                                            padding: '10px',
                                            backgroundColor: 'white',
                                            height: { xs: 'auto', sm: '250px' },
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleComicClick(comic.title)}
                                    >
                                        {comic.image && (
                                            <img
                                                src={comic.image}
                                                alt={comic.title}
                                                style={{
                                                    width: '150px',
                                                    height: '200px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        )}
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 'bold',
                                                textAlign: { xs: 'center', sm: 'left' },
                                            }}
                                        >
                                            {comic.title}
                                        </Typography>
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
                            modules={[Navigation, Pagination, Autoplay]}
                            autoplay={{
                                delay: 0,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            speed={5000}
                        >
                            {trendingComics.slice(Math.ceil(trendingComics.length / 2)).map((comic, index) => (
                                <SwiperSlide key={index}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: { xs: 'column', sm: 'row' }, 
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            gap: '20px',
                                            padding: '10px',
                                            backgroundColor: 'white',
                                            height: { xs: 'auto', sm: '250px' },
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleComicClick(comic.title)}
                                    >
                                        {comic.image && (
                                            <img
                                                src={comic.image}
                                                alt={comic.title}
                                                style={{
                                                    width: '150px',
                                                    height: '200px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        )}
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 'bold',
                                                textAlign: { xs: 'center', sm: 'left' }, 
                                            }}
                                        >
                                            {comic.title}
                                        </Typography>
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