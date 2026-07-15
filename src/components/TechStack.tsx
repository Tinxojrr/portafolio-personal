import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion';
import { Code2, Database, Cloud, BrainCircuit } from 'lucide-react';
import { GlassPanel } from './GlassPanel';
import './TechStack.css';

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

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

  const textStyle = { 
    display: 'block', 
    fontSize: 'clamp(4rem, 8vw, 6rem)', 
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    WebkitTextStroke: '2px rgba(255,255,255,1)',
    color: 'transparent',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  } as React.CSSProperties;

  return (
    <div className="parallax" style={{ overflow: 'hidden', margin: 0, whiteSpace: 'nowrap', display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
      <motion.div className="scroller" style={{ x, display: 'flex', whiteSpace: 'nowrap', gap: '2rem' }}>
        <span style={textStyle}>{children}</span>
        <span style={textStyle}>{children}</span>
        <span style={textStyle}>{children}</span>
        <span style={textStyle}>{children}</span>
      </motion.div>
    </div>
  );
};

const stackCategories = [
  {
    category: 'Frontend',
    icon: Code2,
    items: ['React', 'TypeScript', 'Vite']
  },
  {
    category: 'Backend & Datos',
    icon: Database,
    items: ['FastAPI', 'Python', 'Supabase', 'BigQuery', 'SQL']
  },
  {
    category: 'Cloud & DevOps',
    icon: Cloud,
    items: ['GCP', 'Docker', 'Kubernetes']
  },
  {
    category: 'IA & Machine Learning',
    icon: BrainCircuit,
    items: ['TensorFlow', 'Keras', 'Claude API']
  }
];

export const TechStack = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="tecnologias" style={{ 
      padding: '8rem 0', 
      position: 'relative',
      overflow: 'hidden',
      zIndex: 2
    }}>
      {/* Background Marquee */}
      <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', transform: 'translateY(-50%)', opacity: 0.04, pointerEvents: 'none', zIndex: -1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <ParallaxText baseVelocity={-1}>REACT ✦ FASTAPI ✦ PYTHON ✦ GO ✦ GCP ✦ DOCKER ✦ </ParallaxText>
          <ParallaxText baseVelocity={1}>BIGQUERY ✦ TENSORFLOW ✦ KUBERNETES ✦ SQL ✦ </ParallaxText>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ marginBottom: '4rem' }}>
          <p className="font-mono" style={{ color: '#06b6d4', marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Stack Tecnológico
          </p>
          <h2 className="text-large" style={{ margin: 0, color: '#fff' }}>HERRAMIENTAS & TECNOLOGÍAS</h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '2rem' 
        }}>
          {stackCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const isHovered = hoveredIdx === idx;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredIdx(idx)}
                onHoverEnd={() => setHoveredIdx(null)}
              >
                <GlassPanel style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ 
                      color: '#06b6d4', 
                      transition: 'filter 0.3s ease',
                      filter: isHovered ? 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.8))' : 'drop-shadow(0 0 0px transparent)'
                    }}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <h3 style={{ 
                      fontFamily: 'Space Grotesk, sans-serif', 
                      fontSize: '1.25rem', 
                      color: '#fff', 
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {cat.category}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                    {cat.items.map((item, itemIdx) => (
                      <motion.span 
                        key={itemIdx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: (idx * 0.1) + (itemIdx * 0.05) }}
                        className="font-mono"
                        style={{ 
                          fontSize: '0.8rem',
                          padding: '0.35rem 0.85rem',
                          borderRadius: '9999px',
                          background: 'rgba(6,182,212,0.05)',
                          border: '1px solid rgba(6,182,212,0.2)',
                          color: '#06b6d4'
                        }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
