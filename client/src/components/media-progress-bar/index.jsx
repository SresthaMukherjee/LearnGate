import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function MediaProgressbar({ isMediaUploading, progress }) {
  const [showProgress, setShowProgress] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (isMediaUploading) {
      setShowProgress(true);
      setAnimatedProgress(progress);
    } else {
      const timer = setTimeout(() => {
        setShowProgress(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isMediaUploading, progress]);

  if (!showProgress) return null;

  return (
    <div className="w-full mt-6 mb-6">
      {/* Progress Label */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-purple-200">
          {isMediaUploading ? "Uploading media..." : "Upload complete"}
        </span>
        <span className="text-sm font-bold text-orange-400">
          {Math.round(animatedProgress)}%
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-full bg-purple-800/30 rounded-full h-4 overflow-hidden border border-purple-500/20 shadow-inner">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full" />
        
        {/* Progress Bar */}
        <motion.div
          className="relative h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-lg"
          initial={{ width: 0 }}
          animate={{
            width: `${animatedProgress}%`,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          {/* Progress Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-sm opacity-70" />
          
          {/* Animated Shimmer Effect */}
          <motion.div
            className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Completion Pulse Effect */}
          {progress >= 100 && isMediaUploading && (
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-60"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>

        {/* Progress Indicator Dots */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-2 transform -translate-y-1/2 pointer-events-none">
          {[25, 50, 75].map((milestone) => (
            <div
              key={milestone}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                animatedProgress >= milestone
                  ? "bg-white shadow-sm"
                  : "bg-purple-400/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Status Message */}
      {progress >= 100 && isMediaUploading && (
        <motion.div
          className="flex items-center justify-center mt-3 text-sm text-green-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
          Processing complete
        </motion.div>
      )}
    </div>
  );
}

export default MediaProgressbar;