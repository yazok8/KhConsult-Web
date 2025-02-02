// Example using Framer Motion
import { motion } from 'framer-motion';

export const AnimatedCard = ({ children }:React.ReactNode) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white shadow-lg rounded-lg p-6"
  >
    {children}
  </motion.div>
);
