import { motion } from "framer-motion";
import { ArrowRight, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import toothSplash from "@/assets/tooth-splash.png";
import useCountUp from "@/hooks/useCountUp";

const statsData = [
  { value: 150, suffix: "+", label: "Expert Dentists" },
  { value: 20, suffix: "+", label: "Dental Clinics across UK" },
  { value: 3, suffix: "+", label: "Countries presence" },
];

const marqueeItems = ["Braces", "Denta Care", "Dentist", "Dentures", "Implants", "Whitening", "Oral Surgery", "Root Canal"];

const StatItem = ({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) => {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className="border-l-2 border-accent pl-5"
    >
      <p className="text-4xl md:text-5xl font-bold text-accent tabular-nums">
        <span ref={ref}>{String(count).padStart(String(value).length, "0")}</span>
        {suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
};

const HeroSection = () => {
  const letterVariants = {
    hidden: { y: 120, rotateX: -90 },
    visible: (i: number) => ({
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, delay: 0.1 + i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  };

  const words = ["Every", "Smile", "Matters"];

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden pt-20">
      {/* Background decorative circles */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-light -translate-x-1/3 -translate-y-1/4 opacity-60"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-blue-light translate-x-1/3 opacity-40"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 flex-1 grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center relative z-10 py-12">
        {/* Left – headline + CTA */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] text-primary uppercase perspective-[600px]">
            {words.map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.span
                  className="italic block"
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 max-w-sm shadow-sm border border-border/50"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our skilled dentists use advanced technology to offer complete care in a comfortable and friendly environment.
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Clock className="w-4 h-4 text-accent" />
              <span>We're Open: <strong className="text-foreground">10:00 AM – 07:00 PM</strong></span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Button asChild variant="accent" size="lg" className="rounded-full px-8 group">
              <a href="#contact">
                Book Appointment
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Center – tooth image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
          className="flex justify-center"
        >
          <motion.img
            src={toothSplash}
            alt="3D tooth with water splash"
            className="w-[280px] md:w-[380px] lg:w-[420px] xl:w-[480px] drop-shadow-2xl"
            loading="eager"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Right – stats */}
        <div className="space-y-8 lg:pl-8">
          {statsData.map((s, i) => (
            <StatItem key={i} {...s} delay={0.5 + i * 0.2} />
          ))}
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="relative z-10 border-t border-border bg-card/50 backdrop-blur-sm py-4 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center mx-6 text-lg font-medium text-muted-foreground">
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
