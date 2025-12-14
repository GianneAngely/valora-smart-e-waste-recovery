import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const SPLASH_DURATION = 2500; // 2.5 seconds

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo - Replace Leaf icon with actual logo image when available */}
      {/* To use actual logo: <img src="/path-to-logo.png" alt="VALORA Logo" className="w-12 h-12" /> */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1 }}
        className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center mb-6"
      >
        <Leaf className="w-12 h-12 text-white" />
      </motion.div>
      
      {/* App Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-4xl font-bold text-white mb-2"
      >
        VALORA
      </motion.h1>
      
      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-white/80 text-center"
      >
        Value Recovery from E-Waste
      </motion.p>
      
      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 flex gap-1"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-white/60"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
