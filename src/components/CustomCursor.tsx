import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const circumference = 2 * Math.PI * 48; // ~301.59
  const dashoffset = useTransform(smoothProgress, [0, 1], [circumference, 0]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      animate={{ x: mousePosition.x, y: mousePosition.y }}
      transition={{ type: 'tween', ease: 'linear', duration: 0 }} // Instant follow
      style={{
        position: 'fixed',
        top: '-20px', left: '-20px',
        width: '40px',
        height: '40px',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference'
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? '#fff' : 'transparent',
          borderColor: isHovering ? 'transparent' : 'rgba(255, 255, 255, 0.5)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {!isHovering && (
          <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
            <motion.circle
              cx="50" cy="50" r="48"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: dashoffset }}
            />
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
};
