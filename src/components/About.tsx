import { motion } from 'framer-motion';

const phrase = "Mi enfoque no es solo escribir código, sino construir arquitecturas robustas. Fusiono Ingeniería de Datos, Cloud y Ciberseguridad para crear soluciones escalables.";

export const About = () => {
  const words = phrase.split(" ");

  return (
    <section className="section-padding flex-center" style={{ minHeight: '80vh' }}>
      <div style={{ maxWidth: '1000px', textAlign: 'center' }}>
        
        <h3 className="text-large" style={{ textTransform: 'none', lineHeight: '1.3', color: '#fff', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem 1.2rem' }}>
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: index * 0.03, ease: [0.2, 0.65, 0.3, 0.9] }}
              style={{ display: 'inline-block', transformOrigin: 'bottom' }}
            >
              {word}
            </motion.span>
          ))}
        </h3>

        <motion.p 
          className="text-body" 
          style={{ color: '#888', marginTop: '4rem', marginInline: 'auto' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Como estudiante avanzado de Ingeniería en Informática, aplico metodologías ágiles y pensamiento crítico en cada proyecto. Desde el diseño de pipelines ETL hasta el desarrollo de interfaces fluidas, mi meta es siempre aportar valor medible.
        </motion.p>
      </div>
    </section>
  );
};
