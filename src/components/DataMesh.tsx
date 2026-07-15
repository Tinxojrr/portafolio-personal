import { useEffect, useRef, useState } from 'react';

export const DataMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none)');
    setIsTouch(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const spacing = 45; // Espaciado entre puntos
    const interactionRadius = 150; // Radio de interacción del mouse
    let dots: { x: number, y: number, targetAlpha: number, currentAlpha: number, targetSize: number, currentSize: number }[] = [];
    
    let mouse = { x: -1000, y: -1000 };
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    const initDots = () => {
      dots = [];
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);
      
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          dots.push({
            x: i * spacing,
            y: j * spacing,
            targetAlpha: 0.08,
            currentAlpha: 0.08,
            targetSize: 1,
            currentSize: 1
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        if (!isTouch) {
          const dx = mouse.x - dot.x;
          const dy = mouse.y - dot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < interactionRadius) {
            const intensity = 1 - Math.pow(distance / interactionRadius, 2); // ease-out cuadrático
            dot.targetAlpha = 0.08 + (intensity * 0.4);
            dot.targetSize = 1 + (intensity * 2);
          } else {
            dot.targetAlpha = 0.08;
            dot.targetSize = 1;
          }
        }

        // Lerp inercia
        dot.currentAlpha += (dot.targetAlpha - dot.currentAlpha) * 0.1;
        dot.currentSize += (dot.targetSize - dot.currentSize) * 0.1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.currentSize, 0, Math.PI * 2);
        
        // Color interpolation towards cyan (#06b6d4 -> 6, 182, 212)
        const intensityFactor = (dot.currentAlpha - 0.08) / 0.4; // 0 to 1
        const r = Math.round(255 - (249 * intensityFactor));
        const g = Math.round(255 - (73 * intensityFactor));
        const b = Math.round(255 - (43 * intensityFactor));
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dot.currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouch]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', backgroundColor: '#050508', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      
      {/* Nebulosas sutiles para dar profundidad detrás del canvas */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 60%)', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 60%)', filter: 'blur(100px)' }} />
    </div>
  );
};
