import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  duration?: number;
  trigger?: 'mount' | 'inView';
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  duration = 1.2,
  trigger = 'inView',
  as: Component = 'span',
  className,
  style,
  delay = 0,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const startScramble = () => {
      setIsScrambling(true);
      let frame = 0;
      let start: number | null = null;
      let animationFrameId: number;
      
      const update = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / (duration * 1000);
        
        if (progress >= 1) {
          setDisplayText(text);
          setIsScrambling(false);
          return;
        }

        const currentLength = Math.floor(progress * text.length) + 1;
        
        let newText = '';
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            newText += ' ';
            continue;
          }
          if (i < currentLength - 2) { // Allow a trailing scrambled character effect
             newText += text[i];
          } else if (i < currentLength + 3) {
             newText += CHARS[Math.floor(Math.random() * CHARS.length)];
          } else {
             newText += '';
          }
        }
        
        setDisplayText(newText);
        
        if (progress < 1) {
           animationFrameId = requestAnimationFrame(update);
        }
      };

      animationFrameId = requestAnimationFrame(update);
      
      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    };

    if (trigger === 'mount' || (trigger === 'inView' && isInView)) {
      timeoutId = setTimeout(startScramble, delay * 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, duration, trigger, isInView, delay]);

  return (
    <Component ref={containerRef} className={className} style={style}>
      {isScrambling || displayText !== '' ? displayText : text.replace(/./g, ' ')}
    </Component>
  );
};
