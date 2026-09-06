import React, { useEffect, useRef } from 'react';

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  alpha: number;
  decay: number;
  angle: number;
  spin: number;
  color: string;
}

export const FluidTextCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -100;
    let mouseY = -100;
    let lastX = -100;
    let lastY = -100;
    let isHovering = false;

    const particles: SmokeParticle[] = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const target = e.target as HTMLElement | null;
      const isInsideExcluded = Boolean(
        target && target.closest('header, nav, [data-app-showcase="true"], .app-showcase-window')
      );

      const isActive = !isInsideExcluded;
      isHovering = isActive;

      if (isActive) {
        const dx = x - (lastX > 0 ? lastX : x);
        const dy = y - (lastY > 0 ? lastY : y);
        const moveDist = Math.hypot(dx, dy);

        const count = Math.min(Math.ceil(moveDist / 2) + 1, 4);
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.3 + Math.random() * 1.0;
          particles.push({
            x: x + (Math.random() - 0.5) * 4,
            y: y + (Math.random() - 0.5) * 4,
            vx: Math.cos(angle) * speed + dx * 0.08,
            vy: Math.sin(angle) * speed + dy * 0.08,
            size: 5 + Math.random() * 3.5,
            maxSize: 17 + Math.random() * 5,
            alpha: 0.90,
            decay: 0.020 + Math.random() * 0.01,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.1,
            color: Math.random() > 0.5 ? '147, 51, 234' : '124, 58, 237',
          });
        }
      }

      lastX = x;
      lastY = y;
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'screen';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.size += (p.maxSize - p.size) * 0.1;
        p.alpha -= p.decay;
        p.angle += p.spin;

        if (p.alpha <= 0 || p.size >= p.maxSize) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        grad.addColorStop(0, `rgba(${p.color}, ${p.alpha})`);
        grad.addColorStop(0.45, `rgba(147, 51, 234, ${p.alpha * 0.7})`);
        grad.addColorStop(1, `rgba(124, 58, 237, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, p.angle, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      if (isHovering && mouseX > 0) {
        ctx.save();
        ctx.translate(mouseX, mouseY);

        const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 18);
        coreGrad.addColorStop(0, 'rgba(216, 180, 254, 0.98)');
        coreGrad.addColorStop(0.35, 'rgba(168, 85, 247, 0.80)');
        coreGrad.addColorStop(0.7, 'rgba(124, 58, 237, 0.45)');
        coreGrad.addColorStop(1, 'rgba(109, 40, 217, 0)');

        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
};
