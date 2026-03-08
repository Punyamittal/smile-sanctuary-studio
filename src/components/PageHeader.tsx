import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import InteractivePixelGrid from "@/components/InteractivePixelGrid";
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

// Variant-specific accent images
const variantImages: Record<
  string,
  { src: string; position: string; size: string; rotate?: number }[]
> = {
  about: [
    { src: sparkleTooth, position: "top-[15%] right-[8%]", size: "w-20 md:w-32" },
    { src: toothbrush, position: "bottom-[20%] left-[5%]", size: "w-16 md:w-24", rotate: 25 },
  ],
  services: [
    { src: dentalMirror, position: "top-[12%] right-[6%]", size: "w-18 md:w-28" },
    { src: floatingTooth, position: "bottom-[18%] left-[4%]", size: "w-16 md:w-22" },
    { src: toothShield, position: "top-[55%] left-[10%]", size: "w-14 md:w-20", rotate: -15 },
  ],
  testimonials: [
    { src: sparkleTooth, position: "top-[10%] right-[5%]", size: "w-20 md:w-28", rotate: 10 },
    { src: floatingTooth, position: "bottom-[15%] left-[8%]", size: "w-14 md:w-20" },
  ],
  contact: [
    { src: toothShield, position: "top-[12%] right-[7%]", size: "w-18 md:w-28" },
    { src: dentalMirror, position: "bottom-[20%] left-[6%]", size: "w-16 md:w-22", rotate: -20 },
  ],
  default: [
    { src: floatingTooth, position: "top-[15%] right-[6%]", size: "w-20 md:w-28" },
  ],
};

// Variant-specific stats
const variantStats: Record<string, { value: string; label: string }[]> = {
  about: [
    { value: "15+", label: "Years Experience" },
    { value: "5K+", label: "Happy Patients" },
  ],
  services: [
    { value: "12+", label: "Certifications" },
    { value: "6", label: "Specialties" },
  ],
  testimonials: [
    { value: "4.9", label: "Google Rating" },
    { value: "500+", label: "Reviews" },
  ],
  contact: [
    { value: "24h", label: "Response Time" },
    { value: "99%", label: "Satisfaction" },
  ],
  default: [],
};

const PageHeader = ({
  subtitle,
  title,
  description,
  variant = "default",
}: PageHeaderProps) => {
  const images = variantImages[variant] || variantImages.default;
  const stats = variantStats[variant] || [];

  // Mouse parallax
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section className="relative min-h-[70vh] md:min-h-[75vh] flex items-end pb-16 md:pb-24 bg-primary overflow-hidden">
      {/* Interactive pixel grid background */}
      <div className="absolute inset-0 opacity-20 pointer-events-auto">
        <InteractivePixelGrid
          rows={14}
          cols={24}
          className="w-full h-full"
          inactiveColor="hsl(var(--primary-foreground) / 0.03)"
          activeColor="hsl(var(--accent) / 0.35)"
        />
      </div>

      {/* Dramatic gradient overlays */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 60% at 20% 40%, hsl(var(--accent) / 0.1), transparent)",
            "radial-gradient(ellipse 80% 60% at 80% 60%, hsl(var(--accent) / 0.1), transparent)",
            "radial-gradient(ellipse 80% 60% at 20% 40%, hsl(var(--accent) / 0.1), transparent)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Central vertical light beam */}
      <motion.div
        className="absolute top-0 right-[30%] w-[2px] h-full"
        style={{
          background:
            "linear-gradient(180deg, transparent, hsl(var(--accent) / 0.2), transparent)",
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      <motion.div
        className="absolute top-0 right-[30%] w-[80px] h-full opacity-10 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(180deg, transparent, hsl(var(--accent) / 0.15), transparent)",
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 0.6 }}
      />

      {/* Animated concentric circles */}
      {[480, 360].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border border-primary-foreground/[0.04]"
          style={{
            width: size,
            height: size,
            top: "50%",
            right: "15%",
            translateY: "-50%",
          }}
          animate={{
            scale: [1, 1.12, 1],
            rotate: i % 2 === 0 ? 360 : -360,
          }}
          transition={{
            duration: 20 + i * 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Floating dental images with parallax */}
      {images.map((img, i) => (
        <motion.img
          key={i}
          src={img.src}
          alt=""
          className={`absolute ${img.position} ${img.size} opacity-[0.1] pointer-events-none hidden md:block`}
          style={{
            rotate: img.rotate || 0,
            x: mouse.x * (0.3 + i * 0.2),
            y: mouse.y * (0.3 + i * 0.2),
          }}
          animate={{
            y: [0, -18 + i * 6, 0],
            rotate: [
              (img.rotate || 0) - 4,
              (img.rotate || 0) + 4,
              (img.rotate || 0) - 4,
            ],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
          {/* Left: Title content */}
          <div>
            {/* Subtitle with animated line */}
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="h-px bg-accent"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <span className="text-accent text-sm font-medium tracking-[0.2em] uppercase">
                {subtitle}
              </span>
            </motion.div>

            {/* Giant title with character-by-character reveal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-primary-foreground leading-[0.95] max-w-5xl">
              {title.split(" ").map((word, wi) => (
                <span key={wi} className="inline-block overflow-hidden mr-[0.3em]">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "120%", rotateX: -80 }}
                    animate={{ y: "0%", rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3 + wi * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Description */}
            {description && (
              <motion.p
                className="text-primary-foreground/70 text-lg md:text-xl mt-6 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                {description}
              </motion.p>
            )}

            {/* Bottom accent bar */}
            <motion.div
              className="mt-8 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="h-1 rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{
                  duration: 1,
                  delay: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <motion.div
                className="h-1 w-3 rounded-full bg-primary-foreground/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              />
              <motion.div
                className="h-1 w-2 rounded-full bg-primary-foreground/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              />
            </motion.div>
          </div>

          {/* Right: Floating glass stat cards */}
          {stats.length > 0 && (
            <div className="flex lg:flex-col gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 40, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  style={{
                    x: mouse.x * (0.15 + i * 0.1),
                    y: mouse.y * (0.15 + i * 0.1),
                  }}
                  className="bg-primary-foreground/[0.08] backdrop-blur-xl rounded-2xl px-6 py-5 border border-primary-foreground/[0.1] cursor-default min-w-[140px]"
                >
                  <p className="text-3xl md:text-4xl font-bold text-accent font-display">
                    {stat.value}
                  </p>
                  <p className="text-xs text-primary-foreground/60 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          className="w-full"
          preserveAspectRatio="none"
        >
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
