import React, { useEffect, useRef } from 'react';

interface NeuralGuardianCanvasProps {
  statusColor?: string;
  width?: number;
  height?: number;
}

export const NeuralGuardianCanvas: React.FC<NeuralGuardianCanvasProps> = ({
  statusColor = '#7C3AED',
  width = 240,
  height = 200
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const nodeCount = 36;
    const nodes: { x: number; y: number; z: number; baseAngle: number; radius: number; speed: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: 0,
        y: 0,
        z: 0,
        baseAngle: (i / nodeCount) * Math.PI * 2,
        radius: 45 + Math.sin(i * 1.5) * 20,
        speed: 0.015 + (i % 3) * 0.005
      });
    }

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const projectedNodes: { x: number; y: number; scale: number }[] = [];

      nodes.forEach((node) => {
        const currentAngle = node.baseAngle + time * node.speed;
        const x3d = Math.cos(currentAngle) * node.radius;
        const y3d = Math.sin(currentAngle * 2) * (node.radius * 0.4);
        const z3d = Math.sin(currentAngle) * node.radius;

        const perspective = 220;
        const scale = perspective / (perspective + z3d + 60);

        const projX = centerX + x3d * scale;
        const projY = centerY + y3d * scale;

        projectedNodes.push({ x: projX, y: projY, scale });
      });

      ctx.lineWidth = 0.8;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const dx = projectedNodes[i].x - projectedNodes[j].x;
          const dy = projectedNodes[i].y - projectedNodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 65) {
            const alpha = (1 - dist / 65) * 0.45;
            ctx.strokeStyle = statusColor.startsWith('#')
              ? `${statusColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`
              : `rgba(124, 58, 237, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(projectedNodes[i].x, projectedNodes[i].y);
            ctx.lineTo(projectedNodes[j].x, projectedNodes[j].y);
            ctx.stroke();
          }
        }
      }

      projectedNodes.forEach((node) => {
        const nodeRadius = 3 * node.scale;
        ctx.fillStyle = statusColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = statusColor.startsWith('#')
          ? `${statusColor}33`
          : 'rgba(124, 58, 237, 0.2)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius * 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      const corePulse = 18 + Math.sin(time * 2) * 3;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, corePulse * 2);
      gradient.addColorStop(0, statusColor);
      gradient.addColorStop(0.5, statusColor.startsWith('#') ? `${statusColor}55` : 'rgba(124, 58, 237, 0.3)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, corePulse * 2, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [statusColor]);

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`w-[${width}px] h-[${height}px] pointer-events-none`}
      />
    </div>
  );
};
