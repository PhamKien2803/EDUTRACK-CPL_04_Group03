import React, { useState, useEffect } from 'react';
import { Fab, Tooltip } from '@mui/material';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            console.log("Current ScrollY:", window.scrollY);
            if (window.scrollY > 1900) {
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
            color="secondary"
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
            <Tooltip title="Scroll to top">
                <span style={{ fontSize: 20 }}>↑</span>
            </Tooltip>

        </Fab>
    );
};

export default ScrollToTopButton;
