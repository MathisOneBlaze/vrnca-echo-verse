
import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
  alpha: number;
}

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const isActive = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create initial particles
    const createParticles = (count: number) => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          color: `rgba(0, 120, 255, ${Math.random() * 0.5 + 0.25})`,
          velocity: {
            x: (Math.random() - 0.5) * 0.2,
            y: (Math.random() - 0.5) * 0.2
          },
          alpha: Math.random() * 0.5 + 0.5
        });
      }
      particles.current = newParticles;
    };

    createParticles(50);

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      if (!isActive.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current.forEach((particle, index) => {
        // Move particle
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Respond to mouse
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.velocity.x -= dx * force * 0.01;
          particle.velocity.y -= dy * force * 0.01;
        }

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.velocity.x *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.velocity.y *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Connect nearby particles
        particles.current.forEach((p2, j) => {
          if (index === j) return;
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const opacity = (100 - dist) / 100 * 0.2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 120, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      isActive.current = false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};

export default ParticleBackground;
