import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

const logLines = [
  "Initializing cluster nodes...",
  "Starting data pipeline...",
  "Connecting to BigQuery [OK]",
  "Ingesting stream (12.4GB/s)...",
  "Model training started...",
  "Epoch 1/50 - loss: 0.2314",
  "Epoch 2/50 - loss: 0.1892",
  "Syncing metadata to bucket...",
  "System health: OPTIMAL."
];

export const DataTerminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setLines(prev => {
        const newLines = [...prev, logLines[index]];
        if (newLines.length > 5) newLines.shift();
        return newLines;
      });
      index = (index + 1) % logLines.length;
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <GlassPanel tilt={8} style={{ padding: '0', width: '100%', maxWidth: '420px', height: 'fit-content', overflow: 'hidden' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#27c93f', boxShadow: '0 0 10px #27c93f' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#888', letterSpacing: '0.1em' }}>
            // LIVE_PIPELINE_STATUS
          </span>
        </div>
        
        <div style={{ 
          fontFamily: 'monospace', 
          fontSize: '0.85rem', 
          color: '#27c93f', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.5rem',
          height: '110px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', bottom: 0, width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingBottom: '0.5rem' }}>
            <AnimatePresence initial={false}>
              {lines.map((line, i) => (
                <motion.div
                  key={line + i}
                  initial={{ opacity: 0, x: -10, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(2px)' }}
                  transition={{ duration: 0.3 }}
                >
                  <span style={{ color: '#888', marginRight: '0.5rem' }}>{'>'}</span> 
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{ width: '8px', height: '14px', backgroundColor: '#27c93f', marginTop: '0.2rem' }}
            />
          </div>
        </div>
      </div>
      
      {/* Footer del panel (Coordenadas y Uptime) */}
      <div style={{ 
        borderTop: '1px solid rgba(255,255,255,0.05)', 
        background: 'rgba(0,0,0,0.2)', 
        padding: '1.25rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#666', letterSpacing: '0.1em' }}>LAT: -33.4569</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#666', letterSpacing: '0.1em' }}>LON: -70.6482</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em' }}>SYS_UPTIME</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#27c93f', boxShadow: '0 0 5px #27c93f' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#fff', letterSpacing: '0.1em' }}>99.99%</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};
