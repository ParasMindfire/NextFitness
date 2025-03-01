"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  "The only bad workout is the one that didn’t happen.",
  "Push yourself, because no one else is going to do it for you.",
  "Fitness is not about being better than someone else… it's about being better than you used to be.",
  "Success starts with self-discipline.",
  "Sweat is just fat crying.",
  "The body achieves what the mind believes.",
  "Don’t limit your challenges. Challenge your limits.",
  "Your only limit is you.",
  "Train insane or remain the same.",
  "It never gets easier, you just get stronger.",
  "Strong is not just about muscles; it’s about mindset.",
  "Every workout counts, even the tough ones.",
  "Small progress is still progress.",
  "Wake up. Work out. Look hot. Kick ass.",
  "When you feel like quitting, remember why you started.",
  "A one-hour workout is 4% of your day. No excuses.",
  "Work hard in silence, let success make the noise.",
  "Strive for progress, not perfection.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "It’s a slow process, but quitting won’t speed it up.",
];

const AnimatedQuotes: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) =>
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-center px-6 py-4 bg-white rounded-3xl border-2 border-purple-500 shadow-lg backdrop-blur-md transition-transform transform hover:scale-105 w-[800px]">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentQuoteIndex}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-purple-800"
        >
          {quotes[currentQuoteIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedQuotes;
