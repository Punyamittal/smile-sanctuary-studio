import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface PixelGridProps {
  rows?: number;
  cols?: number;
  className?: string;
  activeColor?: string;
  inactiveColor?: string;
}

const InteractivePixelGrid = ({
  rows = 12,
  cols = 20,
  className = "",
  activeColor = "hsl(var(--accent))",
  inactiveColor = "hsl(var(--primary-foreground) / 0.06)",
}: PixelGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePixels, setActivePixels] = useState<Set<string>>(new Set());
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.floor(((e.clientX - rect.left) / rect.width) * cols);
      const y = Math.floor(((e.clientY - rect.top) / rect.height) * rows);
      setMousePos({ x, y });
    },
    [cols, rows]
  );

  // Randomly activate pixels over time
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePixels((prev) => {
        const next = new Set(prev);
        // Add 2-3 random
        for (let i = 0; i < 3; i++) {
          const r = Math.floor(Math.random() * rows);
          const c = Math.floor(Math.random() * cols);
          next.add(`${r}-${c}`);
        }
        // Remove some old ones to keep it dynamic
        if (next.size > rows * cols * 0.3) {
          const arr = Array.from(next);
          for (let i = 0; i < 4; i++) {
            next.delete(arr[Math.floor(Math.random() * arr.length)]);
          }
        }
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [rows, cols]);

  return (
    <div
      ref={containerRef}
      className={`grid gap-[2px] ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: -1, y: -1 })}
    >
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const key = `${r}-${c}`;
        const dist = Math.sqrt(
          Math.pow(c - mousePos.x, 2) + Math.pow(r - mousePos.y, 2)
        );
        const isNearMouse = dist < 3.5;
        const isActive = activePixels.has(key);

        return (
          <motion.div
            key={key}
            className="aspect-square rounded-[2px]"
            animate={{
              backgroundColor: isNearMouse
                ? activeColor
                : isActive
                ? `hsl(var(--primary-foreground) / 0.15)`
                : inactiveColor,
              scale: isNearMouse ? 1.3 : 1,
              opacity: isNearMouse ? 1 : isActive ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.2 }}
          />
        );
      })}
    </div>
  );
};

export default InteractivePixelGrid;
