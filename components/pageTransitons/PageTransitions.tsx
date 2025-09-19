'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransitionProps } from './PageTransitions.interface';

export const PageTransitions = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
        className="page-content"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
