import React, { useEffect, useRef } from 'react';

interface ShapeGridProps {
  gridSize?: number;
  speed?: number;
}

export const ShapeGrid: React.FC<ShapeGridProps> = ({
  gridSize = 40,
  speed = 0.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    let offsetX = 0;
    let offsetY = 0;

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      offsetX = (offsetX + speed) % gridSize;
      offsetY = (offsetY + speed * 0.7) % gridSize;

      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(124, 58, 237, 0.12)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = offsetX - gridSize; x < width + gridSize; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      ctx.stroke();

      ctx.beginPath();
      for (let y = offsetY - gridSize; y < height + gridSize; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      if (mouseX > -500 && mouseY > -500) {
        const radius = 200;
        const startX = Math.floor((mouseX - radius) / gridSize) * gridSize + (offsetX % gridSize);
        const endX = Math.ceil((mouseX + radius) / gridSize) * gridSize + (offsetX % gridSize);
        const startY = Math.floor((mouseY - radius) / gridSize) * gridSize + (offsetY % gridSize);
        const endY = Math.ceil((mouseY + radius) / gridSize) * gridSize + (offsetY % gridSize);

        for (let x = startX; x <= endX; x += gridSize) {
          for (let y = startY; y <= endY; y += gridSize) {
            const dist = Math.hypot(x - mouseX, y - mouseY);
            if (dist < radius) {
              const factor = Math.pow(1 - dist / radius, 2);

              ctx.fillStyle = `rgba(124, 58, 237, ${factor * 0.25})`;
              ctx.fillRect(x, y, gridSize, gridSize);

              ctx.strokeStyle = `rgba(139, 92, 246, ${factor * 0.6})`;
              ctx.strokeRect(x, y, gridSize, gridSize);

              ctx.fillStyle = `rgba(167, 139, 250, ${factor * 0.9})`;
              ctx.beginPath();
              ctx.arc(x, y, 2.5 * factor, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gridSize, speed]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0B0B0C_95%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0B0B0C] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0C] to-transparent pointer-events-none" />
    </div>
  );
};
