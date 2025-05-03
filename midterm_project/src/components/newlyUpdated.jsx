import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import comicsData from '../assets/comicsData';

const NewlyUpdated = () => {
    const navigate = useNavigate();
    const newUpdateComics = comicsData.filter(comic => comic.tags?.includes('new update'));
    const [showAll, setShowAll] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

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

    return (
        <Box sx={{ padding: 6, backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'center',
         alignItems: 'center', minHeight: '100vh',  }}>
            <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '1400px' }, padding: 4 }}>
                <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>New Updates</Typography>
                <Grid container spacing={4} sx={{ display: { xs: 'block', md: 'grid' }, gridTemplateColumns: { md: 'repeat(6, 1fr)', sm: 'repeat(4, 1fr)' }, gridAutoRows: { md: '1fr' } }}>
                    {(showAll ? newUpdateComics : newUpdateComics.slice(0, 12)).map((comic, index) => (
                        <Grid item key={index} xs={6} sm={3} md={1}>
                            <Paper
                                sx={{
                                    padding: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    cursor: 'pointer',
                                }}
                                onClick={() => navigate(`/comic/${encodeURIComponent(comic.title)}`)}
                            >
                                <img
                                    src={comic.image}
                                    alt={comic.title}
                                    style={{
                                        width: '100%',
                                        height: '450px',
                                        objectFit: 'cover',
                                        marginBottom: '8px',
                                    }}
                                />
                                <Typography
                                    variant="h5"
                                    align="center"
                                    sx={{
                                        marginTop: '8px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '100%',
                                    }}
                                >
                                    {comic.title}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                    {!showAll && (
                        <Button variant="contained" color="primary" onClick={handleViewAll}>View All</Button>
                    )}
                </Box>

                <Dialog open={showPopup} onClose={handleClosePopup}>
                    <DialogTitle>No More Updates</DialogTitle>
                    <DialogContent>
                        <Typography>There are no more new updates to show.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosePopup} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default NewlyUpdated;