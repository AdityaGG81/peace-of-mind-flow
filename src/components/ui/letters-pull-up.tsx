'use client';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';
 
export function LettersPullUp({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const splittedText = text.split('');
 
  const pullupVariant = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
   return (
    <div className={`flex space-x-1 justify-center ${className}`}>
      {text.split('').map((char, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.p>
      ))}
    </div>
  );
}