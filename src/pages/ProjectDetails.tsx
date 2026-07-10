import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock de base de datos de los proyectos (el usuario puede modificar esto)
  const projectData: Record<string, any> = {
    'auramed': {
      title: 'AuraMed',
      link: 'https://aura-med-eight.vercel.app/',
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
        '/auramed-5.png',
        '/auramed-6.png',
        '/auramed-7.png'
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-huge"
          style={{ margin: 0 }}
        >
          {data.title}
        </motion.h1>
        
        {data.link && (
          <motion.a 
            href={data.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hover-target"
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem 1.5rem', borderRadius: '9999px',
              background: 'rgba(6, 182, 212, 0.1)', color: '#fff', border: '1px solid rgba(6, 182, 212, 0.4)', textDecoration: 'none',
              fontWeight: 500, fontSize: '1rem', transition: 'all 0.2s',
              fontFamily: 'Inter, sans-serif',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.15)',
              marginTop: '0.5rem'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(6,182,212,0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }} 
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Ver Proyecto en Vivo
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </motion.a>
        )}
      </div>

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
            <div style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ color: '#fff', margin: 0, fontSize: '1.5rem', textTransform: 'uppercase' }}>Galería de Interfaces</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    className="hover-target"
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + data.images.length) % data.images.length)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem' }}
                  >
                    {'<'} ANTERIOR
                  </button>
                  <button 
                    className="hover-target"
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % data.images.length)}
                    style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#06b6d4', padding: '0.5rem 1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem' }}
                  >
                    SIGUIENTE {'>'}
                  </button>
                </div>
              </div>
              
              <div style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', backgroundColor: 'transparent', aspectRatio: '16/9' }}>
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    src={data.images[currentImageIndex]}
                    alt={`${data.title} screenshot ${currentImageIndex+1}`}
                    initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: 0 }}
                  />
                </AnimatePresence>
                
                {/* Indicadores de paginación */}
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {data.images.map((_: any, i: number) => (
                    <div 
                      key={i} 
                      className="hover-target"
                      onClick={() => setCurrentImageIndex(i)}
                      style={{ 
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: currentImageIndex === i ? '#06b6d4' : 'rgba(255,255,255,0.3)',
                        transition: 'background 0.3s',
                        boxShadow: currentImageIndex === i ? '0 0 10px #06b6d4' : 'none'
                      }} 
                    />
                  ))}
                </div>
              </div>
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
