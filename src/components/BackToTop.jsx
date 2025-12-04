import { useState, useEffect } from 'react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <>
            {isVisible && (
                <button onClick={scrollToTop} style={styles.button} aria-label="Back to Top">
                    &#8679;
                </button>
            )}
        </>
    );
};

const styles = {
    button: {
        position: 'fixed',
        bottom: '6rem',
        right: '2rem',
        backgroundColor: 'rgba(100, 108, 255, 0.8)',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        fontSize: '1.5rem',
        cursor: 'pointer',
        zIndex: 9999,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(5px)',
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export default BackToTop;
