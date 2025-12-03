import { useEffect, useRef } from 'react';

const CursorFollower = () => {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);

    // Use refs for positions to avoid re-renders on every frame
    const cursorPos = useRef({ x: -100, y: -100 });
    const followerPos = useRef({ x: -100, y: -100 });
    const followerSize = useRef({ width: 32, height: 32 });

    // Target state for the follower
    const targetState = useRef({
        x: -100,
        y: -100,
        width: 32,
        height: 32,
        radius: 50, // % or px depending on context, handled in render
        hovering: false
    });

    useEffect(() => {
        // Only enable on devices that support hover
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
        if (isTouchDevice) return;

        const checkHover = (x, y) => {
            const target = document.elementFromPoint(x, y);
            if (!target) return;

            const clickable = target.closest('a') ||
                target.closest('button') ||
                target.closest('.clickable') ||
                (window.getComputedStyle(target).cursor === 'pointer');

            if (clickable) {
                const rect = clickable.getBoundingClientRect();
                const style = window.getComputedStyle(clickable);
                const borderRadius = parseFloat(style.borderRadius);

                targetState.current.hovering = true;
                targetState.current.x = rect.left + rect.width / 2;
                targetState.current.y = rect.top + rect.height / 2;
                targetState.current.width = rect.width + 20;
                targetState.current.height = rect.height + 10;
                targetState.current.radius = borderRadius > 0 ? borderRadius + 5 : 8;

                if (cursorRingRef.current) {
                    cursorRingRef.current.classList.add('active');
                }
            } else {
                targetState.current.hovering = false;
                targetState.current.width = 32;
                targetState.current.height = 32;
                targetState.current.radius = 50;

                // If not hovering, target is mouse position
                targetState.current.x = cursorPos.current.x;
                targetState.current.y = cursorPos.current.y;

                if (cursorRingRef.current) {
                    cursorRingRef.current.classList.remove('active');
                }
            }
        };

        const onMouseMove = (e) => {
            cursorPos.current = { x: e.clientX, y: e.clientY };

            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
            }

            checkHover(e.clientX, e.clientY);
        };

        const onScroll = () => {
            if (cursorPos.current.x !== -100) {
                checkHover(cursorPos.current.x, cursorPos.current.y);
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('scroll', onScroll, { passive: true });

        // Animation loop for the follower ring
        let animationFrameId;

        const animate = () => {
            // Linear interpolation (lerp) for smooth following
            const lerpFactor = 0.15;

            if (!targetState.current.hovering) {
                targetState.current.x = cursorPos.current.x;
                targetState.current.y = cursorPos.current.y;
            }

            followerPos.current.x += (targetState.current.x - followerPos.current.x) * lerpFactor;
            followerPos.current.y += (targetState.current.y - followerPos.current.y) * lerpFactor;
            followerSize.current.width += (targetState.current.width - followerSize.current.width) * lerpFactor;
            followerSize.current.height += (targetState.current.height - followerSize.current.height) * lerpFactor;

            if (cursorRingRef.current) {
                cursorRingRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%)`;
                cursorRingRef.current.style.width = `${followerSize.current.width}px`;
                cursorRingRef.current.style.height = `${followerSize.current.height}px`;

                if (targetState.current.hovering) {
                    cursorRingRef.current.style.borderRadius = `${targetState.current.radius}px`;
                } else {
                    cursorRingRef.current.style.borderRadius = '50%';
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <div ref={cursorDotRef} className="cursor-dot" />
            <div ref={cursorRingRef} className="cursor-ring" />
        </>
    );
};

export default CursorFollower;
