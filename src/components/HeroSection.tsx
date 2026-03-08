import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, Clock, Plus, Sparkles, Shield, Heart, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCountUp from "@/hooks/useCountUp";
import toothSplash from "@/assets/tooth-splash.png";
import heroTooth from "@/assets/hero-tooth.png";
import dentalMirror from "@/assets/dental-mirror.png";
import toothbrush from "@/assets/toothbrush.png";
import sparkleTooth from "@/assets/sparkle-tooth.png";
import floatingTooth from "@/assets/floating-tooth.png";
import doc1 from "@/assets/doctor1.jpg";
import InteractivePixelGrid from "@/components/InteractivePixelGrid";
import { Link } from "react-router-dom";

const marqueeItems = [
  "Braces",
  "Teeth Cleaning",
  "Whitening",
  "Implants",
  "Root Canal",
  "Oral Surgery",
  "Cosmetic Dentistry",
  "Pediatric Care",
];

const StatCard = ({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) => {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="bg-card/60 backdrop-blur-xl rounded-2xl p-5 border border-border/30 shadow-xl cursor-default"
    >
      <p className="text-3xl md:text-4xl font-bold text-accent tabular-nums font-display">
        <span ref={ref}>{count}</span>
        {suffix}
      </p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
};

const HeroSection = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const titleLine1 = "SMILE";
  const titleLine2 = "DENTAL";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-background pt-20"
    >
      {/* Dramatic gradient background */}
      <div className="absolute inset-0">
        {/* Large gradient orbs */}
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.08), transparent 70%)",
            x: mouse.x * -0.2,
            y: mouse.y * -0.2,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--accent) / 0.06), transparent 70%)",
            x: mouse.x * 0.15,
            y: mouse.y * 0.15,
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Central light beam inspired by AI Framework reference */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-full"
          style={{
            background:
              "linear-gradient(180deg, transparent, hsl(var(--accent) / 0.3), hsl(var(--accent) / 0.1), transparent)",
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-full opacity-20"
          style={{
            background:
              "linear-gradient(180deg, transparent, hsl(var(--accent) / 0.15), transparent)",
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
      </div>

      {/* Interactive pixel grid overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-auto">
        <InteractivePixelGrid
          rows={16}
          cols={28}
          className="w-full h-full"
          inactiveColor="hsl(var(--primary) / 0.03)"
          activeColor="hsl(var(--accent) / 0.4)"
        />
      </div>

      {/* Floating dental assets with deep parallax */}
      <motion.img
        src={dentalMirror}
        alt=""
        className="absolute top-[15%] right-[6%] w-24 md:w-36 opacity-[0.08] pointer-events-none hidden lg:block"
        style={{ x: mouse.x * 0.6, y: mouse.y * 0.6 }}
        animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={toothbrush}
        alt=""
        className="absolute bottom-[25%] left-[3%] w-20 md:w-28 opacity-[0.06] pointer-events-none hidden lg:block rotate-[25deg]"
        style={{ x: mouse.x * -0.5, y: mouse.y * -0.5 }}
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={sparkleTooth}
        alt=""
        className="absolute top-[60%] right-[12%] w-14 md:w-20 opacity-[0.05] pointer-events-none hidden xl:block"
        style={{ x: mouse.x * 0.4, y: mouse.y * 0.4 }}
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content */}
      <div className="container mx-auto px-4 flex-1 flex items-center relative z-10 py-8">
        <div className="w-full grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Giant overlapping typography */}
          <div className="relative">
            {/* Subtitle */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="h-px bg-accent"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <span className="text-xs font-medium text-accent tracking-[0.2em] uppercase">
                Premium Dental Care
              </span>
            </motion.div>

            {/* Giant title lines - overlapping like PULSE SYNC */}
            <div className="relative">
              <motion.h1
                className="text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] xl:text-[9rem] font-display font-black leading-[0.85] text-foreground tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {titleLine1.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: 120, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.h1
                className="text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] xl:text-[9rem] font-display font-black leading-[0.85] tracking-tight -mt-2 md:-mt-4"
                style={{
                  WebkitTextStroke: "2px hsl(var(--foreground) / 0.2)",
                  color: "transparent",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {titleLine2.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: 120, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Description text */}
            <motion.p
              className="text-muted-foreground text-base md:text-lg max-w-md mt-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              A sanctuary where dental excellence meets comfort — your smile
              deserves the finest care with cutting-edge technology.
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="flex items-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <Button
                asChild
                variant="accent"
                size="lg"
                className="rounded-full px-8 group shadow-lg shadow-accent/20"
              >
                <Link to="/contact">
                  Book Appointment
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-card/80 backdrop-blur border border-border/50 flex items-center justify-center shadow-lg"
              >
                <Play className="w-4 h-4 text-foreground ml-0.5" />
              </motion.button>
            </motion.div>

            {/* Floating glass stat card - bottom left */}
            <motion.div
              className="mt-10 flex gap-4 flex-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.7 }}
            >
              <div className="bg-card/60 backdrop-blur-xl rounded-2xl px-5 py-4 border border-border/30 shadow-lg flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Client Satisfied
                </span>
                <span className="text-2xl font-bold text-accent font-display">
                  99%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Central hero image with glass effect */}
          <div className="relative flex justify-center items-center">
            {/* Glow behind image */}
            <motion.div
              className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--accent) / 0.12), hsl(var(--primary) / 0.06), transparent 70%)",
                x: mouse.x * 0.1,
                y: mouse.y * 0.1,
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Rotating orbital rings */}
            <motion.div
              className="absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full border border-dashed border-primary/10"
              animate={{ rotate: 360 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-accent/[0.06]"
              animate={{ rotate: -360 }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Main image */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.4,
                type: "spring",
                stiffness: 60,
              }}
            >
              <motion.img
                src={toothSplash}
                alt="Advanced dental care"
                className="w-[280px] md:w-[380px] lg:w-[440px] drop-shadow-2xl"
                style={{ x: mouse.x * 0.15, y: mouse.y * 0.15 }}
                animate={{ y: [0, -16, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Glass shine sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Floating stat cards around the image */}
            <motion.div
              className="absolute top-[5%] right-[0%] md:right-[-5%] z-20"
              style={{ x: mouse.x * 0.3, y: mouse.y * 0.3 }}
            >
              <StatCard value={15} suffix="+" label="Years Experience" delay={1.2} />
            </motion.div>

            <motion.div
              className="absolute bottom-[10%] left-[0%] md:left-[-10%] z-20"
              style={{ x: mouse.x * -0.25, y: mouse.y * -0.25 }}
            >
              <StatCard value={5000} suffix="+" label="Happy Patients" delay={1.4} />
            </motion.div>

            {/* Doctor card - bottom right */}
            <motion.div
              className="absolute bottom-[0%] right-[0%] md:right-[-5%] z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              style={{ x: mouse.x * 0.2, y: mouse.y * 0.2 }}
            >
              <div className="bg-card/70 backdrop-blur-xl rounded-2xl p-3 border border-border/30 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent/30">
                  <img
                    src={doc1}
                    alt="Dr. Mitchell"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Dr. Sarah Mitchell
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    15+ Years of Experience
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom: Enhanced lower section with dramatic dark bar */}
      <div className="relative z-10 bg-primary mt-auto overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(ellipse 60% 50% at 20% 50%, hsl(var(--accent) / 0.2), transparent)",
              "radial-gradient(ellipse 60% 50% at 80% 50%, hsl(var(--accent) / 0.2), transparent)",
              "radial-gradient(ellipse 60% 50% at 20% 50%, hsl(var(--accent) / 0.2), transparent)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <motion.div
                  className="flex items-center gap-3 mb-4 justify-center lg:justify-start"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="h-px bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: 30 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                  <span className="text-accent text-xs tracking-[0.15em] uppercase font-medium">
                    Beyond Expectations
                  </span>
                </motion.div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground uppercase leading-tight font-display">
                  Smile Beyond <br className="hidden md:block" />
                  <motion.span
                    className="text-accent inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    Expectations
                  </motion.span>
                </h2>
                <motion.p
                  className="text-primary-foreground/70 mt-4 max-w-xl text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  Whether it's a routine checkup or a complete smile makeover, I
                  combine expertise with cutting-edge technology to deliver
                  results that exceed your expectations.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    asChild
                    variant="accent"
                    size="lg"
                    className="rounded-full px-8 mt-6 group shadow-lg shadow-accent/25"
                  >
                    <Link to="/services">
                      Explore Services
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, type: "spring" }}
              className="relative flex justify-center"
            >
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full border-2 border-dashed border-accent/30" />
              </motion.div>

              <div className="w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-4 border-primary-foreground/20 shadow-2xl relative">
                <img
                  src={heroTooth}
                  alt="Advanced dental care"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 border-t border-border bg-card/50 backdrop-blur-sm py-4 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center mx-6 text-lg font-medium text-muted-foreground"
            >
              {item}
              <Plus className="w-4 h-4 ml-6 text-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
