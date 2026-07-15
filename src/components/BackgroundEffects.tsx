import { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export const BackgroundEffects = () => {
  const springConfig = { stiffness: 50, damping: 20, mass: 1 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* 1. Orbes de luz difusos (Respiración lenta) */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: -2, pointerEvents: 'none' }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '-20%', left: '-10%',
            width: '60vw', height: '60vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(15, 23, 42, 0.9) 0%, transparent 70%)', // Azul muy oscuro
            filter: 'blur(80px)'
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -50, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            position: 'absolute',
            bottom: '-20%', right: '-10%',
            width: '70vw', height: '70vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(30, 27, 75, 0.7) 0%, transparent 70%)', // Morado oscuro profundo
            filter: 'blur(100px)'
          }}
        />
        
        {/* Resplandor suave siguiendo el cursor */}
        <motion.div
          style={{
            position: 'absolute',
            top: -250, left: -250,
            width: 500, height: 500,
            x: cursorX, y: cursorY,
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 60%)', // Azul claro hiper sutil
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* 2. Textura de Ruido Cinematográfico (Film Grain) */}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          zIndex: -1, // Entre los orbes y el contenido
          pointerEvents: 'none',
          opacity: 0.3, // Opacidad baja para que no sea molesto
          mixBlendMode: 'overlay',
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </>
  );
};
