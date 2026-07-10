import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const AmbientBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const springConfig = { stiffness: 50, damping: 20, mass: 1 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: -1, pointerEvents: 'none', backgroundColor: '#050508' }}>
      
      {/* Grid HUD con máscara de desvanecimiento radial (Más visible) */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)'
        }}
      />

      {/* Nebulosas Espaciales Derivantes (MÁS INTENSAS Y SUAVES) */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 60, 0],
          y: [0, -40, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '-10%', left: '-10%',
          width: '1000px', height: '1000px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 80%)', // Cyan
          filter: 'blur(100px)',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Nueva nebulosa sutil detrás de la terminal para alimentar el blur */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, -20, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          position: 'absolute',
          top: '20%', right: '5%',
          width: '800px', height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)', // Blanco/Plata sutil
          filter: 'blur(100px)',
          mixBlendMode: 'screen'
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '-10%', right: '-10%',
          width: '1200px', height: '1200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 80%)', // Violeta
          filter: 'blur(120px)',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Resplandor tenue que sigue al cursor */}
      <motion.div
        style={{
          position: 'absolute',
          top: -200, left: -200,
          width: 400, height: 400,
          x: cursorX, y: cursorY,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 50%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};
