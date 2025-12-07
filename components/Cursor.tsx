import React, { useEffect, useRef, useState } from 'react';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailerRef = useRef<HTMLDivElement>(null);
  const [click, setClick] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let requestRef: number;
    let mouseX = -100; // Start off screen
    let mouseY = -100;
    let trailerX = -100;
    let trailerY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Move main cursor instantly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };
    
    // Smooth trailer animation loop
    const animateTrailer = () => {
      // Linear interpolation (Lerp) for lag effect
      trailerX += (mouseX - trailerX) * 0.15;
      trailerY += (mouseY - trailerY) * 0.15;
      
      if (trailerRef.current) {
        trailerRef.current.style.transform = `translate3d(${trailerX}px, ${trailerY}px, 0) translate(-50%, -50%)`;
      }
      requestRef = requestAnimationFrame(animateTrailer);
    };
    
    // Interaction Detection
    const onMouseDown = () => setClick(true);
    const onMouseUp = () => setClick(false);
    
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for interactive elements
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setHover(true);
      } else {
        setHover(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);
    requestRef = requestAnimationFrame(animateTrailer);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  return (
    <>
      <style>{`
        /* Hide default cursor globally */
        body, a, button, input, textarea { 
            cursor: none !important; 
        }
      `}</style>
      
      {/* Main Cursor Dot */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyber-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      
      {/* Trailing Ring */}
      <div 
        ref={trailerRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] border border-cyber-primary rounded-full transition-all duration-300 ease-out flex items-center justify-center
            ${hover ? 'w-12 h-12 bg-cyber-primary/10 border-cyber-primary shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'w-8 h-8 opacity-40'}
            ${click ? 'scale-75 bg-cyber-primary/30' : 'scale-100'}
        `}
      >
        {/* Tactical Crosshair Decor appearing on Hover */}
        <div className={`w-1 h-0.5 bg-cyber-primary absolute top-0 -translate-y-1 transition-all duration-300 ${hover ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`w-1 h-0.5 bg-cyber-primary absolute bottom-0 translate-y-1 transition-all duration-300 ${hover ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`w-0.5 h-1 bg-cyber-primary absolute left-0 -translate-x-1 transition-all duration-300 ${hover ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`w-0.5 h-1 bg-cyber-primary absolute right-0 translate-x-1 transition-all duration-300 ${hover ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </>
  );
};

export default Cursor;