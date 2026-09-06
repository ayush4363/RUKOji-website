import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  baseR: number;
  baseG: number;
  baseB: number;
  hoverR: number;
  hoverG: number;
  hoverB: number;
  scaleProgress: number;
  colorProgress: number;
  color: string;
  charId?: string;
}

interface CharBox {
  id: string;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
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
      active: false,
    };

    const buildCharBoxes = (
      offCtx: CanvasRenderingContext2D,
      text: string,
      lineY: number,
      fontSize: number,
      canvasWidth: number,
      prefix: string
    ): CharBox[] => {
      const boxes: CharBox[] = [];
      let currentX = (canvasWidth - offCtx.measureText(text).width) / 2;

      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const chWidth = offCtx.measureText(ch).width;

        if (ch.trim().length > 0) {
          boxes.push({
            id: `${prefix}_${i}`,
            minX: currentX - 3,
            maxX: currentX + chWidth + 3,
            minY: lineY - fontSize * 0.6,
            maxY: lineY + fontSize * 0.6,
          });
        }
        currentX += chWidth;
      }
      return boxes;
    };

    const initParticles = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) return;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.clearRect(0, 0, width, height);

      let fontSize = Math.floor(Math.min(width * 0.10, 92));
      if (width < 640) {
        fontSize = Math.floor(Math.min(width * 0.11, 44));
      }

      const fontStyle = (sz: number) => `800 ${Math.floor(sz)}px "Plus Jakarta Sans", "Inter", system-ui, -apple-system, sans-serif`;
      offCtx.font = fontStyle(fontSize);
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';

      while (offCtx.measureText('Pause before').width > width * 0.88 && fontSize > 16) {
        fontSize -= 1;
        offCtx.font = fontStyle(fontSize);
      }

      const lineGap = fontSize * 1.05;
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

      const boxesL1 = buildCharBoxes(offCtx, line1, line1Y, fontSize, width, 'L1');
      const boxesL2 = buildCharBoxes(offCtx, line2, line2Y, fontSize, width, 'L2');
      const allCharBoxes = [...boxesL1, ...boxesL2];

      const imageData = offCtx.getImageData(0, 0, width, height);
      const data = imageData.data;

      particles = [];
      const gap = width < 640 ? 3 : 3;

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 40) {
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];

            const baseColorStr = `rgb(${r}, ${g}, ${b})`;

            let assignedCharId = '';
            for (let c = 0; c < allCharBoxes.length; c++) {
              const box = allCharBoxes[c];
              if (x >= box.minX && x <= box.maxX && y >= box.minY && y <= box.maxY) {
                assignedCharId = box.id;
                break;
              }
            }

            particles.push({
              x: x + (Math.random() - 0.5) * 2,
              y: y + (Math.random() - 0.5) * 2,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              radius: width < 640 ? 1.4 : 1.75,
              baseR: r,
              baseG: g,
              baseB: b,
              hoverR: 147,
              hoverG: 51,
              hoverB: 234,
              scaleProgress: 0,
              colorProgress: 0,
              color: baseColorStr,
              charId: assignedCharId,
            });
          }
        }
      }
    };

    initParticles();
    if (document.fonts) {
      document.fonts.ready.then(() => {
        initParticles();
      });
    }

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

      const pushStrength = 130;
      const ease = 14;
      const friction = 0.82;

      const canvasWidth = canvas.getBoundingClientRect().width;
      const isMobile = canvasWidth < 640;

      const headLen = isMobile ? 18 : 25;
      const maxHalfWidth = isMobile ? 16 : 24;
      const tailLen = isMobile ? 65 : 100;

      const charActivation: Record<string, number> = {};

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;

        const u = -dx;
        const v = dy;

        let normDist = 2.0;

        if (u >= 0 && u <= headLen) {
          normDist = (u / headLen) ** 2 + (v / maxHalfWidth) ** 2;
        } else if (u < 0 && u >= -tailLen) {
          const t = -u / tailLen;
          const taperedWidth = maxHalfWidth * Math.pow(1.0 - t, 0.75);
          const currentWidth = Math.max(2.0, taperedWidth);
          normDist = t ** 2 + (v / currentWidth) ** 2;
        }

        if (normDist <= 1.0 && mouse.active && mouse.x > 0) {
          const force = 1.0 - Math.sqrt(normDist);
          if (p.charId) {
            charActivation[p.charId] = Math.max(
              charActivation[p.charId] || 0,
              Math.min(1.0, force * 1.6)
            );
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        let targetScale = 0;
        let targetColor = 0;

        if (p.charId && charActivation[p.charId] > 0 && mouse.active && mouse.x > 0) {
          targetColor = charActivation[p.charId];
          targetScale = charActivation[p.charId];

          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * targetColor * pushStrength * delta;
          p.vy -= Math.sin(angle) * targetColor * pushStrength * delta;
        }

        p.scaleProgress += (targetScale - p.scaleProgress) * 0.18;
        p.colorProgress += (targetColor - p.colorProgress) * 0.14;

        p.vx += (p.originX - p.x) * ease * delta;
        p.vy += (p.originY - p.y) * ease * delta;

        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        const curR = Math.round(p.baseR + (p.hoverR - p.baseR) * p.colorProgress);
        const curG = Math.round(p.baseG + (p.hoverG - p.baseG) * p.colorProgress);
        const curB = Math.round(p.baseB + (p.hoverB - p.baseB) * p.colorProgress);

        p.color = `rgb(${curR}, ${curG}, ${curB})`;

        const idleWave = Math.sin(time * 0.003 + p.originX * 0.08) * 0.035;
        const renderRadius = p.radius * (1.0 + idleWave + p.scaleProgress * 0.25);

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, renderRadius, 0, Math.PI * 2);
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
