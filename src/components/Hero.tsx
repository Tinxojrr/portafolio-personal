import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="min-h-screen flex-center section-padding">
      <div style={{ width: '100%' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ marginBottom: '2rem', fontSize: '1.25rem', color: '#888' }}
        >
          ESTUDIANTE DE INGENIERIA EN INFORMATICA
        </motion.p>

        <motion.h1
          className="text-huge hover-target"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          MARTIN ABURTO<br />
          PORTAFOLIO
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ marginTop: '4rem', maxWidth: '500px' }}
        >
          <p className="text-body" style={{ color: '#aaa' }}>
            Especializado en crear experiencias digitales premium.
            Diseño minimalista, alto contraste y desarrollo frontend avanzado.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
