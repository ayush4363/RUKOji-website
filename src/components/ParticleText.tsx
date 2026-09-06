import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseColor: string;
  hoverColor: string;
}

interface ParticleTextProps {
  className?: string;
}

export const ParticleText: React.FC<ParticleTextProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const mouse = {
      x: -9999,
      y: -9999,
      radius: 45,
      active: false,
    };

    const initParticles = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) return;

      mouse.radius = width < 640 ? 40 : 55;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      offCtx.clearRect(0, 0, width, height);

      let fontSize = Math.min(width * 0.10, 92);
      if (width < 640) {
        fontSize = Math.min(width * 0.12, 54);
      }

      const fontStyle = `800 ${fontSize}px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif`;
      offCtx.font = fontStyle;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';

      const lineGap = fontSize * 1.02;
      const line1 = 'Pause before';
      const line2 = 'you scroll.';

      const centerY = height / 2;
      const line1Y = centerY - lineGap / 2;
      const line2Y = centerY + lineGap / 2;

      offCtx.fillStyle = '#FFFFFF';
      offCtx.fillText(line1, width / 2, line1Y);

      const line2Width = offCtx.measureText(line2).width;
      const line2StartX = (width - line2Width) / 2;
      const line2EndX = (width + line2Width) / 2;

      const grad2 = offCtx.createLinearGradient(line2StartX, 0, line2EndX, 0);
      grad2.addColorStop(0.0, '#FFFFFF');
      grad2.addColorStop(0.48, '#FFFFFF');
      grad2.addColorStop(0.62, '#C084FC');
      grad2.addColorStop(0.80, '#9333EA');
      grad2.addColorStop(1.0, '#7C3AED');

      offCtx.fillStyle = grad2;
      offCtx.fillText(line2, width / 2, line2Y);

      const imageData = offCtx.getImageData(0, 0, width, height);
      const data = imageData.data;

      particles = [];
      const gap = width < 640 ? 3 : 3;

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) {
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];

            const baseColor = `rgb(${r}, ${g}, ${b})`;
            const hoverColor = '#8B5CF6';

            particles.push({
              x: x + (Math.random() - 0.5) * 2,
              y: y + (Math.random() - 0.5) * 2,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              radius: width < 640 ? 1.4 : 1.75,
              color: baseColor,
              baseColor: baseColor,
              hoverColor: hoverColor,
            });
          }
        }
      }
    };

    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    const resizeObserver = new ResizeObserver(() => {
      initParticles();
    });
    resizeObserver.observe(canvas);

    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pushStrength = 380;
      const ease = 14;
      const friction = 0.82;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = mouse.radius * mouse.radius;

        if (distSq < radiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);

          p.vx -= Math.cos(angle) * force * pushStrength * delta;
          p.vy -= Math.sin(angle) * force * pushStrength * delta;

          p.color = p.hoverColor;
        } else {
          p.color = p.baseColor;
        }

        p.vx += (p.originX - p.x) * ease * delta;
        p.vy += (p.originY - p.y) * ease * delta;

        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={`relative w-full h-[140px] sm:h-[185px] md:h-[210px] flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer touch-none block"
      />
    </div>
  );
};
