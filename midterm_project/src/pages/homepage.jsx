import React, { useEffect } from 'react';
import Navbar from '../components/navbar.jsx';
import Recommendation from '../components/recommendation.jsx';
import NewlyUpdated from '../components/newlyUpdated.jsx';
import comicsData from '../assets/comicsData';
import Trending from '../components/trending.jsx';
import Footer from '../components/footer.jsx';
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleScrollRestoration = () => {
            window.history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
        };

        handleScrollRestoration();

        return () => {
            window.history.scrollRestoration = 'auto';
        };
    }, []);

    return (
        <>
            <Navbar />
            <div id="recomendation">
                <Recommendation comics={comicsData} onComicClick={(comicId) => navigate(`/comic/${comicId}`)} />
            </div>
            <div id="new update">
                <NewlyUpdated />
            </div>
            <div id="trending">
                <Trending comics={comicsData} />
            </div>
            <div id="contact">
                <Footer />
            </div>
        </>
    );
}

export default Homepage;