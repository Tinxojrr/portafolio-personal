import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion';
import './TechStack.css';

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

// Función helper para envolver el valor
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ParallaxText = ({ children, baseVelocity = 100 }: ParallaxProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  return (
    <div className="parallax" style={{ overflow: 'hidden', margin: 0, whiteSpace: 'nowrap', display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
      <motion.div className="scroller" style={{ x, display: 'flex', whiteSpace: 'nowrap', gap: '2rem' }}>
        <span style={{ display: 'block', fontSize: '2rem', color: '#888' }}>{children} </span>
        <span style={{ display: 'block', fontSize: '2rem', color: '#888' }}>{children} </span>
        <span style={{ display: 'block', fontSize: '2rem', color: '#888' }}>{children} </span>
        <span style={{ display: 'block', fontSize: '2rem', color: '#888' }}>{children} </span>
      </motion.div>
    </div>
  );
};

export const TechStack = () => {
  return (
    <section style={{ 
      padding: '4rem 0', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      overflow: 'hidden',
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      position: 'relative',
      zIndex: 2
    }}>
      <p className="font-mono" style={{ color: '#888', marginBottom: '4rem', fontSize: '0.85rem', textTransform: 'uppercase', paddingLeft: '4rem' }}>
        Tecnologías
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <ParallaxText baseVelocity={-2}>REACT FASTAPI PYTHON GO GCP DOCKER</ParallaxText>
        <ParallaxText baseVelocity={2}>BIGQUERY TENSORFLOW KUBERNETES SQL</ParallaxText>
      </div>
    </section>
  );
};
