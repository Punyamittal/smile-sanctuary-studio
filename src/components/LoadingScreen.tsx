import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("reveal"), 300);
          setTimeout(() => onComplete(), 1600);
          return 100;
        }
        return p + Math.random() * 12 + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  const displayProgress = Math.min(Math.round(progress), 100);

  return (
    <AnimatePresence>
      {phase === "loading" ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Animated background circles */}
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full border border-primary-foreground/10"
            animate={{ scale: [1, 1.3, 1], rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full border border-primary-foreground/5"
            animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* Tooth icon mask */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative mb-10"
          >
            <svg
              width="80"
              height="96"
              viewBox="0 0 80 96"
              fill="none"
              className="text-primary-foreground"
            >
              <motion.path
                d="M40 0C26 0 16 6 10 16C4 26 0 38 4 50C8 62 16 70 22 80C28 90 32 96 40 96C48 96 52 90 58 80C64 70 72 62 76 50C80 38 76 26 70 16C64 6 54 0 40 0Z"
                fill="currentColor"
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-primary font-display font-bold text-2xl">D</span>
            </motion.div>
          </motion.div>

          {/* Brand name reveal */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="text-3xl md:text-4xl font-display font-bold text-primary-foreground uppercase tracking-[0.3em]"
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Denta{" "}
              <span className="text-accent">Care</span>
            </motion.h1>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-primary-foreground/20 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-accent rounded-full"
              style={{ width: `${displayProgress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <motion.p
            className="text-primary-foreground/50 text-sm font-body tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {displayProgress}%
          </motion.p>
        </motion.div>
      ) : (
        /* Mask reveal – two panels slide apart */
        <motion.div key="reveal" className="fixed inset-0 z-[100] pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-primary"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-primary"
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
