import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransitionProps } from './PageTransitions.interface';

export const PageTransitions = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="page-content"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
