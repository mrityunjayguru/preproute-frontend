// components/ProgressBar.tsx (now a centered loader)
"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function TopProgressBar({ isAnimating }: { isAnimating: boolean }) {
  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-sm pointer-events-auto"
        >
          <div className="relative flex flex-col items-center">
            {/* Outer Rotating Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-16 h-16 border-4 border-[#FF5635]/20 border-t-[#FF5635] rounded-full"
            />
            
            {/* Optional Loading Text */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-[#FF5635] font-poppins font-medium tracking-wide"
            >
              Loading Exams...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}