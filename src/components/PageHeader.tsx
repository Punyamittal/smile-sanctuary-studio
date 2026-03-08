import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import sparkleTooth from "@/assets/sparkle-tooth.png";
import floatingTooth from "@/assets/floating-tooth.png";
import toothShield from "@/assets/tooth-shield.png";
import dentalMirror from "@/assets/dental-mirror.png";
import toothbrush from "@/assets/toothbrush.png";

interface PageHeaderProps {
  subtitle: string;
  title: string;
  description?: string;
  variant?: "about" | "services" | "testimonials" | "contact" | "default";
}

// Floating particles
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 3,
  duration: 4 + Math.random() * 4,
}));

// Decorative images per variant
const variantImages: Record<string, { src: string; position: string; size: string; rotate?: number }[]> = {
  about: [
    { src: sparkleTooth, position: "top-8 right-[8%]", size: "w-20 md:w-28" },
    { src: toothbrush, position: "bottom-6 left-[5%]", size: "w-16 md:w-24", rotate: 25 },
  ],
  services: [
    { src: dentalMirror, position: "top-10 right-[6%]", size: "w-18 md:w-26" },
    { src: floatingTooth, position: "bottom-8 left-[4%]", size: "w-16 md:w-22" },
    { src: toothShield, position: "top-20 left-[10%]", size: "w-14 md:w-20", rotate: -15 },
  ],
  testimonials: [
    { src: sparkleTooth, position: "top-6 right-[5%]", size: "w-20 md:w-28", rotate: 10 },
    { src: floatingTooth, position: "bottom-10 left-[8%]", size: "w-14 md:w-20" },
  ],
  contact: [
    { src: toothShield, position: "top-10 right-[7%]", size: "w-18 md:w-26" },
    { src: dentalMirror, position: "bottom-6 left-[6%]", size: "w-16 md:w-22", rotate: -20 },
  ],
  default: [
    { src: floatingTooth, position: "top-8 right-[6%]", size: "w-20 md:w-28" },
  ],
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const letterPull = {
  hidden: { y: "110%", rotateX: -80 },
  visible: {
    y: "0%",
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const PageHeader = ({ subtitle, title, description, variant = "default" }: PageHeaderProps) => {
  const images = variantImages[variant] || variantImages.default;
  const titleWords = title.split(" ");

  // Mouse parallax
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section className="relative pt-32 pb-24 md:pb-28 bg-primary overflow-hidden">
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 60% at 20% 40%, hsl(var(--accent) / 0.15), transparent)",
            "radial-gradient(ellipse 80% 60% at 80% 60%, hsl(var(--accent) / 0.15), transparent)",
            "radial-gradient(ellipse 80% 60% at 20% 40%, hsl(var(--accent) / 0.15), transparent)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated concentric circles */}
      {[500, 380, 260].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border border-primary-foreground/[0.06]"
          style={{
            width: size,
            height: size,
            top: "50%",
            right: i % 2 === 0 ? "-5%" : undefined,
            left: i % 2 !== 0 ? "-5%" : undefined,
            translateY: "-50%",
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: i % 2 === 0 ? 360 : -360,
          }}
          transition={{
            duration: 18 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary-foreground/[0.08]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Horizontal animated line */}
      <motion.div
        className="absolute top-1/2 left-0 h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--accent) / 0.2), transparent)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Floating dental images with parallax */}
      {images.map((img, i) => (
        <motion.img
          key={i}
          src={img.src}
          alt=""
          className={`absolute ${img.position} ${img.size} opacity-[0.12] pointer-events-none`}
          style={{
            rotate: img.rotate || 0,
            x: mouse.x * (0.3 + i * 0.15),
            y: mouse.y * (0.3 + i * 0.15),
          }}
          animate={{
            y: [0, -16 + i * 4, 0],
            rotate: [(img.rotate || 0) - 3, (img.rotate || 0) + 3, (img.rotate || 0) - 3],
          }}
          transition={{
            duration: 5 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Subtitle with line */}
        <motion.div variants={fadeSlideUp} className="flex items-center gap-3 mb-5">
          <motion.div
            className="h-px bg-accent"
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <span className="text-accent text-sm font-medium tracking-[0.2em] uppercase">
            {subtitle}
          </span>
        </motion.div>

        {/* Title with word-by-word reveal */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground max-w-4xl leading-[1.05] perspective-[800px]">
          {titleWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
              <motion.span
                className="inline-block"
                variants={letterPull}
                custom={i}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Description with smooth fade */}
        {description && (
          <motion.p
            variants={fadeSlideUp}
            className="text-primary-foreground/70 text-lg md:text-xl mt-6 max-w-xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {/* Animated bottom accent bar */}
        <motion.div
          className="mt-8 flex items-center gap-3"
          variants={fadeSlideUp}
        >
          <motion.div
            className="h-1 rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="h-1 w-3 rounded-full bg-primary-foreground/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          />
          <motion.div
            className="h-1 w-2 rounded-full bg-primary-foreground/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom wave / curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
          <motion.path
            d="M0,40 C360,0 720,60 1080,20 C1260,5 1380,30 1440,40 L1440,60 L0,60 Z"
            fill="hsl(var(--background))"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </svg>
      </div>
    </section>
  );
};

export default PageHeader;
