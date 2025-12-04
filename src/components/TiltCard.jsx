import { useState, useRef } from 'react';

const TiltCard = ({ children, style, className }) => {
    const [transform, setTransform] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 15;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    };

    const glowStyle = {
        borderColor: isHovered ? 'rgba(100, 108, 255, 0.8)' : (style?.borderColor || 'rgba(255, 255, 255, 0.05)'),
        boxShadow: isHovered ? '0 0 20px rgba(100, 108, 255, 0.4), inset 0 0 10px rgba(100, 108, 255, 0.2)' : (style?.boxShadow || 'none'),
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                ...style,
                transform: transform,
                transition: 'transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
                willChange: 'transform',
                ...glowStyle
            }}
            className={`js-tilt-card ${className || ''}`}
            data-tilt-max="15"
        >
            {children}
        </div>
    );
};

export default TiltCard;
