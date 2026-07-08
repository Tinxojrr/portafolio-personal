import { motion } from 'framer-motion';

const certs = [
  { title: "SCRUM MASTER & PRODUCT OWNER", org: "SMPC, SPOPC" },
  { title: "ARTIFICIAL INTELLIGENCE EXPERT", org: "CAIEC" },
  { title: "ETHICAL HACKING PROFESSIONAL", org: "CEHPC" },
  { title: "DATA PROTECTION & CYBERSECURITY", org: "LGPDF, ISO/IEC 22301" },
  { title: "SOFTWARE PROJECT LEADER", org: "SPLPC" },
];

export const Certifications = () => {
  return (
    <section className="section-padding" style={{ minHeight: '80vh', backgroundColor: '#000' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ marginBottom: '4rem', fontSize: '1.25rem', color: '#888' }}>CERTIFICACIONES</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid #222', paddingBottom: '1rem' }}
            >
              <h3 className="text-large" style={{ color: '#fff', margin: 0, lineHeight: 1.1 }}>{cert.title}</h3>
              <span style={{ color: '#888', fontSize: '1.25rem', marginTop: '0.5rem', fontFamily: 'Inter, sans-serif' }}>
                {cert.org}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
