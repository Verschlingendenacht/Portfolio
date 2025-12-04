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
        radius: 50,
        hovering: false
    });

    useEffect(() => {
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

                let visibleLeft = rect.left;
                let visibleTop = rect.top;
                let visibleRight = rect.right;
                let visibleBottom = rect.bottom;

                // Walk up the DOM to check for clipping containers
                let parent = clickable.parentElement;
                while (parent && parent !== document.body) {
                    const style = window.getComputedStyle(parent);
                    const overflowX = style.overflowX;
                    const overflowY = style.overflowY;

                    if (overflowX === 'hidden' || overflowX === 'scroll' || overflowX === 'auto' ||
                        overflowY === 'hidden' || overflowY === 'scroll' || overflowY === 'auto') {

                        const parentRect = parent.getBoundingClientRect();
                        visibleLeft = Math.max(visibleLeft, parentRect.left);
                        visibleTop = Math.max(visibleTop, parentRect.top);
                        visibleRight = Math.min(visibleRight, parentRect.right);
                        visibleBottom = Math.min(visibleBottom, parentRect.bottom);
                    }
                    parent = parent.parentElement;
                }

                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                visibleLeft = Math.max(0, visibleLeft);
                visibleTop = Math.max(0, visibleTop);
                visibleRight = Math.min(viewportWidth, visibleRight);
                visibleBottom = Math.min(viewportHeight, visibleBottom);

                const visibleWidth = Math.max(0, visibleRight - visibleLeft);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);

                const style = window.getComputedStyle(clickable);
                const borderRadius = parseFloat(style.borderRadius);

                targetState.current.hovering = true;
                targetState.current.x = visibleLeft + visibleWidth / 2;
                targetState.current.y = visibleTop + visibleHeight / 2;
                targetState.current.width = visibleWidth + 20;
                targetState.current.height = visibleHeight + 10;
                targetState.current.radius = borderRadius > 0 ? borderRadius + 5 : 8;
                targetState.current.rotateX = 0;
                targetState.current.rotateY = 0;
                targetState.current.scale = 1;

                if (cursorRingRef.current) {
                    cursorRingRef.current.classList.add('active');
                    if (clickable.closest('nav')) {
                        cursorRingRef.current.style.zIndex = '10001';
                    } else {
                        cursorRingRef.current.style.zIndex = '';
                    }
                }
            } else {
                targetState.current.hovering = false;
                targetState.current.width = 32;
                targetState.current.height = 32;
                targetState.current.radius = 50;
                targetState.current.x = cursorPos.current.x;
                targetState.current.y = cursorPos.current.y;
                targetState.current.rotateX = 0;
                targetState.current.rotateY = 0;
                targetState.current.scale = 1;

                if (cursorRingRef.current) {
                    cursorRingRef.current.classList.remove('active');
                    cursorRingRef.current.style.zIndex = '';
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

        let animationFrameId;

        const animate = () => {
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
                const scale = targetState.current.scale || 1;
                cursorRingRef.current.style.transform = `
                    translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) 
                    translate(-50%, -50%) 
                    perspective(1000px) 
                    rotateX(${targetState.current.rotateX || 0}deg) 
                    rotateY(${targetState.current.rotateY || 0}deg)
                    scale3d(${scale}, ${scale}, ${scale})
                `;
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
