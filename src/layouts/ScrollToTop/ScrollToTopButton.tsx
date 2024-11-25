import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            console.log("Current ScrollY:", window.scrollY); 
            if (window.scrollY > 50) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Fab
            color="primary"
            size="small"
            onClick={scrollToTop}
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                display: isVisible ? 'flex' : 'none',
                zIndex: 1000,
            }}
        >
            <KeyboardArrowUpIcon />
        </Fab>
    );
};

export default ScrollToTopButton;
