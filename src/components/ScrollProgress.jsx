import { useState, useEffect } from 'react';

const ScrollProgress = () => {
    const [scrollWidth, setScrollWidth] = useState(0);

    const handleScroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        setScrollWidth(scrolled);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={styles.container}>
            <div style={{ ...styles.bar, width: `${scrollWidth}%` }} />
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '1px',
        zIndex: 10002, // Above everything, including navbar
        backgroundColor: 'transparent',
    },
    bar: {
        height: '100%',
        background: 'linear-gradient(90deg, #646cff 0%, #a1a6ff 100%)',
        transition: 'width 0.3s ease-out',
        boxShadow: '0 0 10px rgba(100, 108, 255, 0.5)',
    }
};

export default ScrollProgress;
