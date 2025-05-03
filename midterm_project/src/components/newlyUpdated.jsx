import React, { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import comicsData from '../assets/comicsData';

const NewlyUpdated = () => {
    const navigate = useNavigate();
    const newUpdateComics = comicsData.filter(comic => comic.tags?.includes('new update'));
    const [showAll, setShowAll] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [hoveredComic, setHoveredComic] = useState(null);
    const [popupPosition, setPopupPosition] = useState('right');

    const handleViewAll = () => {
        if (newUpdateComics.length <= 12) {
            setShowPopup(true);
        } else {
            setShowAll(true);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleMouseEnter = (comic, event) => {
        const bounding = event.target.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const popupWidth = 260; // Estimate

        const fitsOnRight = bounding.right + popupWidth < screenWidth;

        setPopupPosition(fitsOnRight ? 'right' : 'left');
        setHoveredComic(comic);
    };

    const handleMouseLeave = () => {
        setHoveredComic(null);
    };

    return (
        <Box
            sx={{
                padding: 6,
                backgroundColor: '#F8FAFC',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '1400px' }, padding: 4 }}>
                <Typography variant="h4" align="center" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
                    NEW UPDATES
                </Typography>

                <Grid
                    container
                    spacing={4}
                    sx={{
                        display: { xs: 'block', md: 'grid' },
                        gridTemplateColumns: { md: 'repeat(6, 1fr)', sm: 'repeat(4, 1fr)' },
                        gridAutoRows: { md: '1fr' },
                    }}
                >
                    {(showAll ? newUpdateComics : newUpdateComics.slice(0, 12)).map((comic, index) => (
                        <Grid item key={index} xs={6} sm={3} md={1}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Paper
                                    sx={{
                                        width: '100%',
                                        height: 260, // consistent height
                                        padding: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        borderRadius: 2,
                                        marginBottom: 3,
                                        boxShadow: 3,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            boxShadow: 8,
                                        },
                                    }}
                                    onClick={() => navigate(`/comic/${encodeURIComponent(comic.title)}`)}
                                >
                                    <img
                                        src={comic.image}
                                        alt={comic.title}
                                        style={{
                                            width: '100%',
                                            height: '200px', // consistent height for image
                                            objectFit: 'cover',
                                            marginBottom: '8px',
                                            borderRadius: '4px',
                                        }}
                                        onMouseEnter={(e) => handleMouseEnter(comic, e)}
                                    />
                                    <Box sx={{ width: '100%', height: '3em', marginTop: 'auto' }}>
                                        <Typography
                                            variant="body1"
                                            align="center"
                                            sx={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {comic.title}
                                        </Typography>
                                    </Box>
                                </Paper>

                                {hoveredComic === comic && (
                                    <Box
                                        sx={{
                                            display: { xs: 'none', lg: 'flex' },
                                            position: 'absolute',
                                            top: '54%',
                                            scale: 1.15,
                                            left: popupPosition === 'right' ? '138%' : 'auto',
                                            right: popupPosition === 'left' ? '138%' : 'auto',
                                            transform: 'translateY(-50%)',
                                            backgroundColor: 'rgba(248, 248, 248, 0.95)',
                                            boxShadow: 3,
                                            padding: 3,
                                            zIndex: 10,
                                            borderRadius: 2,
                                            width: '300px',
                                            maxWidth: '90vw',
                                            maxHeight: '90vh',
                                            overflow: 'auto',
                                            flexDirection: 'column',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography variant="h6" gutterBottom>{comic.title}</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, alignItems: 'flex-start' }}>
                                            <img
                                                src={comic.image}
                                                alt={comic.title}
                                                style={{
                                                    width: '150px',
                                                    height: '225px',
                                                    objectFit: 'cover',
                                                    marginRight: { xs: '0', lg: '16px' },
                                                    marginBottom: { xs: '16px', lg: '0' },
                                                    borderRadius: '4px',
                                                }}
                                            />
                                            <Typography variant="body1" sx={{ textAlign: 'left', marginLeft: 2 }}>
                                                {comic.description || 'No description available.'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                    {!showAll && (
                        <Button variant="contained" color="primary" onClick={handleViewAll}>
                            View All
                        </Button>
                    )}
                </Box>

                <Dialog open={showPopup} onClose={handleClosePopup}>
                    <DialogTitle>No More Updates</DialogTitle>
                    <DialogContent>
                        <Typography>There are no more new updates to show.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosePopup} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default NewlyUpdated;
