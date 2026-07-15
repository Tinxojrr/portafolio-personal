import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GlassPanel } from './GlassPanel';
import { ScrambleText } from './ScrambleText';

const projects = [
  { id: 'fintrack', name: 'FINTRACK', type: 'SaaS Gestión Financiera', stack: ['React', 'FastAPI', 'Stripe'] },
  { id: 'pipeline-big-data', name: 'PIPELINE BIG DATA', type: 'Retail Analytics', stack: ['GCP', 'BigQuery', 'Looker'] },
  { id: 'auramed', name: 'AURAMED', type: 'Sistema de Triaje Médico', stack: ['Python', 'TensorFlow', 'PostgreSQL'] },
  { id: 'cnn-clasificador', name: 'CNN CLASIFICADOR', type: 'Deep Learning / IA', stack: ['TensorFlow', 'Keras', 'OpenCV'] },
];

export const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none)');
    setIsTouch(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section id="proyectos" className="section-padding" style={{ position: 'relative', minHeight: '100vh', display: 'flex', gap: '4rem', flexDirection: isTouch ? 'column' : 'row' }}>
      
      {/* Fondo espacial local para esta sección */}
      <div style={{
        position: 'absolute',
        top: '40%', right: '20%',
        width: '800px', height: '800px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 60%)',
        filter: 'blur(100px)',
        zIndex: -1,
        pointerEvents: 'none',
        mixBlendMode: 'screen'
      }} />

      {/* Columna Izquierda: Lista de Proyectos */}
      <div style={{ flex: 1, paddingTop: '10vh' }}>
        <p className="font-mono" style={{ color: '#888', marginBottom: '4rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Selected Works
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {projects.map((project, index) => (
            <div key={project.id} style={{ position: 'relative', paddingBottom: '2.5rem' }}>
              {/* Línea divisoria en gradiente */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 'calc(150% + 4rem)',
                  height: '1px',
                  background: 'linear-gradient(to right, #06b6d4, transparent)',
                  transformOrigin: 'left',
                  opacity: 0.3
                }}
                animate={{
                  scaleX: hoveredIndex !== null ? 0.7 : 1,
                  opacity: hoveredIndex === index ? 0.8 : 0.2,
                  boxShadow: hoveredIndex === index ? '0 0 10px rgba(6, 182, 212, 0.5)' : 'none'
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />

              <motion.div
                className="hover-target"
                onClick={() => {
                  if (isTouch) {
                    setHoveredIndex(hoveredIndex === index ? null : index);
                  } else {
                    navigate(`/proyecto/${project.id}`);
                  }
                }}
                onMouseEnter={() => !isTouch && setHoveredIndex(index)}
                onMouseLeave={() => !isTouch && setHoveredIndex(null)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1.5rem',
                  cursor: 'none'
                }}
                whileHover={isTouch ? {} : { x: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Índice numérico */}
                <span className="font-mono" style={{ 
                  fontSize: '1.25rem', 
                  color: hoveredIndex === index ? '#06b6d4' : '#555',
                  transition: 'color 0.3s'
                }}>
                  0{index + 1}
                </span>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <motion.h2 
                    layoutId={`project-title-${project.id}`}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-large" 
                    style={{ margin: 0, transition: 'color 0.3s', color: hoveredIndex === index ? '#fff' : '#777' }}
                  >
                    <ScrambleText text={project.name} trigger="inView" />
                  </motion.h2>
                  <span style={{ fontSize: '1.125rem', color: hoveredIndex === index ? '#aaa' : '#555', transition: 'color 0.3s', marginTop: '0.5rem' }}>
                    {project.type}
                  </span>
                </div>
              </motion.div>

              <AnimatePresence>
                {isTouch && hoveredIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden', marginTop: '1.5rem' }}
                  >
                    <GlassPanel tilt={0} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)' }}>
                      <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        Explorar arquitectura del sistema, stack técnico y solución implementada.
                      </p>
                      
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        {project.stack.map((tech, i) => (
                          <span key={i} style={{ 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '9999px', 
                            background: 'rgba(6, 182, 212, 0.1)',
                            border: '1px solid rgba(6, 182, 212, 0.3)',
                            color: '#06b6d4',
                            fontSize: '0.7rem',
                            fontFamily: 'monospace'
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/proyecto/${project.id}`); }}
                        className="hover-target"
                        style={{
                          width: '100%', padding: '0.75rem', borderRadius: '8px',
                          background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.4)',
                          color: '#06b6d4', fontWeight: 500, cursor: 'none'
                        }}
                      >
                        VER PROYECTO COMPLETO
                      </button>
                    </GlassPanel>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Columna Derecha: Panel de Detalles Dinámico */}
      {!isTouch && (
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ position: 'sticky', top: '15vh', width: '100%', height: '85vh' }}>
            <AnimatePresence mode="wait">
              {hoveredIndex !== null && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    y: hoveredIndex * 140, // Se alinea verticalmente con el ítem en hover
                    filter: 'blur(0px)' 
                  }}
                  exit={{ opacity: 0, filter: 'blur(5px)' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ width: '100%', position: 'absolute', top: 0 }}
                >
                  <GlassPanel tilt={6} style={{ padding: '3rem', textAlign: 'left', minHeight: '320px', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.03)' }}>
                    <motion.h3 
                      className="text-huge" 
                      style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1, margin: 0, color: '#fff', textTransform: 'uppercase' }}
                    >
                      Ver <br/>Detalles
                    </motion.h3>
                    
                    <motion.p
                      style={{ color: '#888', marginTop: '1.5rem', fontSize: '1.1rem', flex: 1 }}
                    >
                      Explorar arquitectura del sistema, stack técnico y solución implementada. Haz click para continuar.
                    </motion.p>

                    {/* Stack del proyecto */}
                    <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                      <span className="font-mono" style={{ color: '#555', fontSize: '0.75rem', width: '100%', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                        Stack Técnico
                      </span>
                      {projects[hoveredIndex].stack.map((tech, i) => (
                        <span key={i} style={{ 
                          padding: '0.35rem 1rem', 
                          borderRadius: '9999px', 
                          background: 'rgba(6, 182, 212, 0.1)',
                          border: '1px solid rgba(6, 182, 212, 0.3)',
                          color: '#06b6d4',
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          letterSpacing: '0.05em'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </GlassPanel>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </section>
  );
};
