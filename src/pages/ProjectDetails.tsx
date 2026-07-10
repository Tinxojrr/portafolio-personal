import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock de base de datos de los proyectos (el usuario puede modificar esto)
  const projectData: Record<string, any> = {
    'auramed': {
      title: 'AuraMed',
      role: 'Backend & Cloud Engineer',
      stack: ['Python', 'FastAPI', 'Google Cloud Platform', 'TensorFlow', 'PostgreSQL'],
      problem: 'El triaje en salas de urgencias estaba saturado, causando largos tiempos de espera y riesgo para pacientes críticos al depender únicamente de evaluación manual.',
      solution: 'Se diseñó un motor de inferencia en tiempo real desplegado en GCP usando Cloud Run. El sistema consume los síntomas y signos vitales mediante una API REST en FastAPI, procesándolos a través de un modelo TensorFlow optimizado para entregar un nivel de urgencia clínico en menos de 10 segundos.',
      architecture: 'Cliente Frontend -> API Gateway -> FastAPI (Cloud Run) -> TF Serving (GKE) -> Cloud SQL (PostgreSQL)',
      images: [
        '/auramed-1.png',
        '/auramed-2.png',
        '/auramed-3.png',
        '/auramed-4.png',
        '/auramed-5.png'
      ]
    },
    'fintrack': {
      title: 'FinTrack',
      role: 'Full Stack Engineer',
      stack: ['React', 'FastAPI', 'Stripe', 'Docker'],
      problem: 'Necesidad de un sistema robusto para la gestión financiera personal con suscripciones automatizadas.',
      solution: 'Plataforma SaaS fullstack con integración de pasarela de pagos Stripe y panel de administración en tiempo real.',
      architecture: 'React (Vite) -> FastAPI REST -> Redis Cache -> Stripe API'
    }
  };

  const data = projectData[id || ''] || {
    title: id?.toUpperCase()?.replace('-', ' '),
    role: 'Data Engineer / Cloud Architect',
    stack: ['GCP', 'Python', 'BigQuery'],
    problem: 'Complejidad en el procesamiento y almacenamiento de grandes volúmenes de datos.',
    solution: 'Implementación de pipelines automatizados (ETL) para limpieza y orquestación de datos en la nube.',
    architecture: 'Cloud Storage -> Dataflow -> BigQuery -> Looker Studio'
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="section-padding" 
      style={{ minHeight: '100vh', paddingTop: '15vh', paddingBottom: '15vh' }}
    >
      <div className="hover-target" onClick={() => navigate('/')} style={{ cursor: 'none', display: 'inline-block', marginBottom: '4rem', padding: '1rem 0' }}>
        <p style={{ color: '#888', fontSize: '1.25rem', letterSpacing: '2px' }}>← VOLVER AL PORTAFOLIO</p>
      </div>

      <motion.h1 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-huge"
      >
        {data.title}
      </motion.h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', marginTop: '10vh' }}>
        <div>
          <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.5rem', textTransform: 'uppercase' }}>Rol</h3>
          <p style={{ color: '#888', marginBottom: '3rem', fontSize: '1.125rem' }}>{data.role}</p>

          <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.5rem', textTransform: 'uppercase' }}>Stack Tecnológico</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {data.stack.map((tech: string, i: number) => (
              <li key={i} style={{ color: '#888', marginBottom: '0.5rem', fontSize: '1.125rem' }}>— {tech}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.5rem', textTransform: 'uppercase' }}>El Problema</h3>
          <p className="text-body" style={{ color: '#aaa', marginBottom: '4rem' }}>{data.problem}</p>

          <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.5rem', textTransform: 'uppercase' }}>La Solución</h3>
          <p className="text-body" style={{ color: '#aaa', marginBottom: '4rem' }}>{data.solution}</p>
          
          <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.5rem', textTransform: 'uppercase' }}>Arquitectura del Sistema</h3>
          <div style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <p style={{ color: '#aaa', fontFamily: 'monospace', fontSize: '1.125rem' }}>{data.architecture}</p>
          </div>
          
          {data.images && data.images.length > 0 ? (
            <div style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '-1rem', fontSize: '1.5rem', textTransform: 'uppercase' }}>Galería de Interfaces</h3>
              {data.images.map((imgUrl: string, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
                  style={{ 
                    width: '100%', 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    backgroundColor: 'rgba(255,255,255,0.02)'
                  }}
                >
                  <img src={imgUrl} alt={`${data.title} screenshot ${i+1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ marginTop: '5rem', width: '100%', minHeight: '50vh', backgroundColor: '#050505', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px dashed #333' }}>
              <p style={{ color: '#555', textAlign: 'center', padding: '2rem' }}>
                <strong>[ Sin imágenes de proyecto ]</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.main>
  );
};
