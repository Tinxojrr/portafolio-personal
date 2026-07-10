import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

const certCategories = [
  {
    category: "Gestión & Liderazgo",
    items: [
      { title: "SCRUM MASTER & PRODUCT OWNER", acronyms: ["SMPC", "SPOPC"] },
      { title: "SOFTWARE PROJECT LEADER", acronyms: ["SPLPC"] },
    ]
  },
  {
    category: "Inteligencia Artificial",
    items: [
      { title: "ARTIFICIAL INTELLIGENCE EXPERT", acronyms: ["CAIEC"] },
      { title: "AI PROJECT MANAGER FOUNDATION", acronyms: ["AIPMFPC"] },
    ]
  },
  {
    category: "Ciberseguridad & Datos",
    items: [
      { title: "ETHICAL HACKING PROFESSIONAL", acronyms: ["CEHPC"] },
      { title: "DATA PROTECTION & SECURITY", acronyms: ["LGPDF", "I22301F"] },
    ]
  }
];

export const Certifications = () => {
  return (
    <section style={{ position: 'relative', zIndex: 1, padding: '6rem 10% 4rem', marginTop: '4rem' }}>
      
      {/* Nebulosa local para asegurar que haya luz detrás de estas cards y el glass haga blur */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '30%',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: -1,
        pointerEvents: 'none',
        mixBlendMode: 'screen'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p className="font-mono" style={{ color: '#888', marginBottom: '3rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Certificaciones
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          alignItems: 'start'
        }}>
          {certCategories.map((group, groupIdx) => (
            <div key={groupIdx} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <h3 className="font-mono" style={{ 
                fontSize: '0.75rem', 
                color: '#666', 
                textTransform: 'uppercase', 
                letterSpacing: '0.2em',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                paddingBottom: '0.75rem',
                margin: 0
              }}>
                {group.category}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {group.items.map((cert, certIdx) => (
                  <motion.div
                    key={certIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, delay: (groupIdx * 0.1) + (certIdx * 0.1) }}
                    style={{ height: '100%' }}
                  >
                    <GlassPanel tilt={10} style={{ 
                      padding: 0, 
                      minHeight: '150px', 
                      position: 'relative', 
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      background: 'rgba(255, 255, 255, 0.04)' // Un toque más de opacidad para resaltar el blur
                    }}>
                      {/* Borde izquierdo gradiente glow */}
                      <div style={{ 
                        position: 'absolute', 
                        left: 0, 
                        top: 0, 
                        width: '4px', 
                        height: '100%', 
                        background: 'linear-gradient(to bottom, #06b6d4, #8b5cf6)',
                        boxShadow: '2px 0 15px rgba(6, 182, 212, 0.6)'
                      }} />
                      
                      <div style={{ padding: '1.75rem 1.75rem 1.75rem 2.5rem' }}>
                        <h4 style={{ 
                          fontFamily: 'Archivo Black, sans-serif', 
                          fontSize: '1.15rem', 
                          color: '#fff', 
                          margin: '0 0 1rem 0', 
                          lineHeight: 1.25 
                        }}>
                          {cert.title}
                        </h4>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {cert.acronyms.map((acronym, acIdx) => (
                            <span key={acIdx} style={{ 
                              display: 'inline-block', 
                              padding: '0.35rem 1.25rem', 
                              borderRadius: '9999px', 
                              border: '1px solid rgba(255,255,255,0.1)', 
                              background: 'rgba(0,0,0,0.3)',
                              fontSize: '0.75rem',
                              fontFamily: 'monospace',
                              letterSpacing: '0.1em',
                              color: '#06b6d4',
                              whiteSpace: 'nowrap'
                            }}>
                              {acronym}
                            </span>
                          ))}
                        </div>
                      </div>
                    </GlassPanel>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
