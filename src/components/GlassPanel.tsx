import { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

interface GlassPanelProps {
  children: React.ReactNode;
  tilt?: number; // Max rotation in degrees
  style?: React.CSSProperties;
  className?: string;
}

export const GlassPanel = ({ children, tilt = 6, style, className = '' }: GlassPanelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Springs for smooth mouse movement tracking
  const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 30 });

  // Transforms for 3D tilt
  // When mouse is at left edge (-0.5), rotateY is -tilt. At right edge (0.5), rotateY is tilt.
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [tilt, -tilt]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-tilt, tilt]);

  // Transforms for the specular highlight position (percentage 0 to 100)
  const spotlightX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
  
  // Motion template for the radial gradient background string
  const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${spotlightX}% ${spotlightY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of element, normalized from -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel ${className}`}
      style={{
        ...style,
        position: 'relative',
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        perspective: 1500,
      }}
      initial={{ rotateX: 0, rotateY: 0 }}
      animate={{ 
        rotateX: hovered ? rotateX.get() : 0, 
        rotateY: hovered ? rotateY.get() : 0 
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Specular highlight (Spotlight) */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: hovered ? 1 : 0,
          background: spotlightBackground,
          transition: 'opacity 0.3s ease',
        }}
      />
      
      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', transform: 'translateZ(10px)' }}>
        {children}
      </div>
    </motion.div>
  );
};
