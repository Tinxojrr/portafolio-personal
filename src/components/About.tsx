import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section id="about" className="section-padding" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <p className="font-mono" style={{ color: '#888', marginBottom: '3rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Sobre Mí
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <h2 style={{ 
            fontFamily: 'Inter, system-ui, sans-serif', 
            fontWeight: 400, 
            fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', 
            lineHeight: 1.5, 
            color: '#e0e0e0',
            margin: 0,
            textTransform: 'none'
          }}>
            Soy estudiante de Ingeniería en Informática especializado en Arquitectura de Datos y Cloud Computing. Mi enfoque es construir sistemas escalables y pipelines robustos que transformen datos complejos en decisiones estratégicas, combinando alta ingeniería con una estética minimalista y fluida.
          </h2>
        </div>
      </motion.div>
    </section>
  );
};
