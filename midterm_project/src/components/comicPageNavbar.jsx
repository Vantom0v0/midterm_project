import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import comicsData from '../assets/comicsData';

const MAX_RESULTS = 5;

function ComicPageNavbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isTop, setIsTop] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const searchResultsRef = useRef(null);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() !== '') {
      const results = comicsData.filter((comic) =>
        comic.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleClickOutside = (event) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log('Search Results:', searchResults);
  }, [searchResults]);

  return (
    <AppBar
      position="sticky"
      color="primary"
      sx={{
        mb: 2,
        opacity: isHovered || isTop ? 1 : 0.1, 
        transition: 'opacity 0.3s ease-in-out',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => navigate('/')}
        >
          Comik
        </Typography>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchResults.length > 0 && (
            <Box
              ref={searchResultsRef}
              sx={{
                position: 'absolute',
                backgroundColor: '#213555',
                zIndex: 1,
                width: '100%',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '4px',
                marginTop: '8px',
              }}
            >
              {searchResults.slice(0, MAX_RESULTS).map((result, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px',
                    borderBottom: index !== searchResults.length - 1 ? '1px solid #ccc' : 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#3E5879',
                    },
                  }}
                  onClick={() => navigate(`/comic/${encodeURIComponent(result.title)}`)}
                >
                  <img
                    src={result.image}
                    alt={result.title}
                    style={{ width: '40px', height: '60px', objectFit: 'cover', marginRight: '10px' }}
                  />
                  {result.title}
                </Box>
              ))}
            </Box>
          )}
        </Search>
      </Toolbar>
    </AppBar>
  );
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default ComicPageNavbar;