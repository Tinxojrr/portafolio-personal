import { Magnetic } from './Magnetic';

export const Footer = () => {
  return (
    <footer className="section-padding" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '4rem' }}>
        <div>
          <p style={{ color: '#888', marginBottom: '1rem' }}>¿TIENES UNA IDEA?</p>
          <Magnetic>
            <a 
              href="mailto:aburtomartin13@gmail.com" 
              className="text-large hover-target" 
              style={{ 
                textDecoration: 'none', 
                color: '#fff', 
                display: 'block',
                cursor: 'none'
              }}
            >
              LET'S TALK.
            </a>
          </Magnetic>
        </div>
        
        <div style={{ display: 'flex', gap: '3rem', paddingBottom: '1rem' }}>
          <Magnetic>
            <a href="#" className="hover-target" style={{ color: '#888', textDecoration: 'none', fontSize: '1.125rem', transition: 'color 0.3s', cursor: 'none' }}>LinkedIn</a>
          </Magnetic>
          <Magnetic>
            <a href="#" className="hover-target" style={{ color: '#888', textDecoration: 'none', fontSize: '1.125rem', transition: 'color 0.3s', cursor: 'none' }}>GitHub</a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
};
