import { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 100, delay = 500, className = '' }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsStarted(true);
        }, delay);

        return () => clearTimeout(timeout);
    }, [delay]);

    useEffect(() => {
        if (!isStarted) return;

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, isStarted, speed, text]);

    return (
        <span className={`typewriter ${className}`}>
            {displayText}
            <span className="cursor-blink">|</span>
        </span>
    );
};

export default Typewriter;
