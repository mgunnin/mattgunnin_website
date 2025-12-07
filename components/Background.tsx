import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = [];
    const particleCount = 120; // Increased count for better density
    const connectionDistance = 150;
    const mouse = { x: -1000, y: -1000 }; // Initialize off-screen

    const colors = ['#00f0ff', '#7000ff', '#333333'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse Interactions
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distMouse = Math.sqrt(dx * dx + dy * dy);

        // Repulsion
        if (distMouse < 200) {
           const forceDirectionX = dx / distMouse;
           const forceDirectionY = dy / distMouse;
           const force = (200 - distMouse) / 200;
           // Gentle push
           p.x -= forceDirectionX * force * 1.5;
           p.y -= forceDirectionY * force * 1.5;
        }

        // Mouse Connections (The "Interactive" part)
        if (distMouse < 200) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 * (1 - distMouse / 200)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw connections between particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist2 / connectionDistance)})`; // Fainter lines for particle-particle
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-cyber-black"
    />
  );
};

export default Background;