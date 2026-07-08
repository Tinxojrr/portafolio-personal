import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion';
import './TechStack.css';

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
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

  const x = useTransform(baseX, (v: number) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax" style={{ overflow: 'hidden', margin: 0, whiteSpace: 'nowrap', display: 'flex', flexWrap: 'nowrap' }}>
      <motion.div className="scroller" style={{ x, display: 'flex', whiteSpace: 'nowrap', gap: '2rem' }}>
        <span className="marquee-text">{children} </span>
        <span className="marquee-text">{children} </span>
        <span className="marquee-text">{children} </span>
        <span className="marquee-text">{children} </span>
      </motion.div>
    </div>
  );
}

export const TechStack = () => {
  const stack = "PYTHON — GCP — REACT — FASTAPI — BIGQUERY — MACHINE LEARNING — CLOUD — CYBERSECURITY — ";
  
  return (
    <section className="section-padding" style={{ paddingBlock: '10vh', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ParallaxText baseVelocity={-2}>{stack}</ParallaxText>
      <ParallaxText baseVelocity={2}>{stack}</ParallaxText>
    </section>
  );
};
