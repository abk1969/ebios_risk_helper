import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  isLoading?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isLoading }) => (
  <div className="relative h-2 bg-gray-100">
    <motion.div
      className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600"
      initial={{ width: 0 }}
      animate={{ width: `${progress * 100}%` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
    {isLoading && (
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-blue-500/50"
        animate={{ 
          opacity: [0.5, 1, 0.5],
          transition: { duration: 1.5, repeat: Infinity }
        }}
      />
    )}
  </div>
); 