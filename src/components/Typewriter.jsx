import { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 100, delay = 500, className = '', onComplete }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        setDisplayText('');
        setCurrentIndex(0);
        setIsStarted(false);

        const timeout = setTimeout(() => {
            setIsStarted(true);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, delay]);

    useEffect(() => {
        if (!isStarted) return;

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, isStarted, speed, text, onComplete]);

    return (
        <span className={`typewriter ${className}`}>
            {displayText}
            <span className="cursor-blink">|</span>
        </span>
    );
};

export default Typewriter;
