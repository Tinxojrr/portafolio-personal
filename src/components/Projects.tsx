import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const projects = [
  { id: 'fintrack', name: 'FINTRACK', type: 'SaaS Gestión Financiera (React, FastAPI, Stripe)' },
  { id: 'pipeline-big-data', name: 'PIPELINE BIG DATA', type: 'Retail Analytics (GCP, BigQuery, Looker)' },
  { id: 'auramed', name: 'AURAMED', type: 'Sistema de Triaje Médico' },
  { id: 'cnn-clasificador', name: 'CNN CLASIFICADOR', type: 'Deep Learning / IA (TensorFlow)' },
];

export const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <section className="section-padding" style={{ position: 'relative', minHeight: '100vh', display: 'flex', gap: '4rem' }}>
      
      {/* Columna Izquierda: Lista de Proyectos */}
      <div style={{ flex: 1, paddingTop: '10vh' }}>
        <p style={{ marginBottom: '4rem', fontSize: '1.25rem', color: '#888' }}>SELECTED WORKS</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {projects.map((project, index) => (
            <div key={project.id} style={{ position: 'relative', paddingBottom: '2rem' }}>
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 'calc(200% + 4rem)',
                  height: '1px',
                  background: '#222',
                  transformOrigin: 'left'
                }}
                animate={{
                  scaleX: hoveredIndex !== null ? 0.4 : 1,
                  backgroundColor: hoveredIndex === index ? '#666' : '#222'
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />

              <motion.div
                className="hover-target"
                onClick={() => navigate(`/proyecto/${project.id}`)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  cursor: 'none' // Usamos el cursor personalizado
                }}
                whileHover={{ x: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <h2 className="text-large" style={{ margin: 0, transition: 'color 0.3s', color: hoveredIndex === index ? '#fff' : '#444' }}>
                  {project.name}
                </h2>
                <span style={{ fontSize: '1.125rem', color: hoveredIndex === index ? '#fff' : '#666', transition: 'color 0.3s', marginTop: '0.5rem' }}>
                  {project.type}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Columna Derecha: Texto Ultra Minimalista en Hover */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'sticky', top: '15vh', width: '100%', height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {hoveredIndex !== null && (
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: 'left', width: '100%' }}
              >
                <motion.h3 
                  className="text-huge" 
                  style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 1, margin: 0, color: '#fff', textTransform: 'uppercase' }}
                >
                  Ver <br/>Detalles
                </motion.h3>
                <motion.p
                  style={{ color: '#888', marginTop: '2rem', fontSize: '1.25rem' }}
                >
                  Explorar arquitectura del sistema, stack técnico y solución implementada. Haz click para continuar.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
