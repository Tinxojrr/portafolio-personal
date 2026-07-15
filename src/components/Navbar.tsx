import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1.5rem 5vw',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div 
        className="glass-panel" 
        style={{ 
          width: '100%', 
          maxWidth: '1200px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1rem 2rem', 
          borderRadius: '9999px',
          background: 'rgba(5, 5, 5, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
        }}
      >
        <a href="/" className="hover-target font-mono" style={{ textDecoration: 'none', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '2px' }}>
          M/A
        </a>
        
        <div style={{ display: 'none', gap: '3rem', '@media (minWidth: 768px)': { display: 'flex' } } as any} className="nav-links">
          <a href="/#proyectos" className="hover-target font-mono" style={{ textDecoration: 'none', color: '#aaa', fontSize: '0.85rem', transition: 'color 0.3s', letterSpacing: '1px' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#aaa'}>PROYECTOS</a>
          <a href="/#about" className="hover-target font-mono" style={{ textDecoration: 'none', color: '#aaa', fontSize: '0.85rem', transition: 'color 0.3s', letterSpacing: '1px' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#aaa'}>ABOUT</a>
          <a href="/#certificaciones" className="hover-target font-mono" style={{ textDecoration: 'none', color: '#aaa', fontSize: '0.85rem', transition: 'color 0.3s', letterSpacing: '1px' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#aaa'}>CERTIFICACIONES</a>
        </div>
        
        <a 
          href="/cv.pdf" 
          target="_blank"
          className="hover-target font-mono" 
          style={{ 
            textDecoration: 'none', 
            color: '#06b6d4', 
            fontSize: '0.85rem', 
            padding: '0.6rem 1.5rem', 
            border: '1px solid rgba(6, 182, 212, 0.4)', 
            borderRadius: '9999px',
            background: 'rgba(6, 182, 212, 0.1)',
            transition: 'all 0.3s',
            letterSpacing: '1px'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(6, 182, 212, 0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          DESCARGAR CV
        </a>
      </div>
    </motion.nav>
  );
};
