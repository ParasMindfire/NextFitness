'use client';

import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
    </div>
  );
};

export default Loading;