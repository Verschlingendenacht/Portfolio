import { useEffect, useRef, useState } from 'react';

const FocusCard = ({ children, style, className = '' }) => {
    const [isFocused, setIsFocused] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFocused(entry.isIntersecting);
            },
            {
                threshold: 0.4, // Trigger when 40% of the card is visible
                rootMargin: '-10% 0px -10% 0px' // Focus when it's more in the center
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...style,
                transform: isFocused ? 'scale(1.02)' : 'scale(1)',
                transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)', // Smooth ease-out
                willChange: 'transform',
            }}
        >
            {children}
        </div>
    );
};

export default FocusCard;
