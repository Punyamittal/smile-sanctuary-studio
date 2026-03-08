import { motion } from "framer-motion";
import { ArrowRight, Clock, Plus, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCountUp from "@/hooks/useCountUp";
import toothSplash from "@/assets/tooth-splash.png";
import heroTooth from "@/assets/hero-tooth.png";
import { Link } from "react-router-dom";

const statsData = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 5000, suffix: "+", label: "Happy Patients" },
  { value: 12, suffix: "+", label: "Certifications" },
];

const marqueeItems = ["Braces", "Teeth Cleaning", "Whitening", "Implants", "Root Canal", "Oral Surgery", "Cosmetic Dentistry", "Pediatric Care"];

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

  const words = ["Your", "Smile", "My", "Priority"];

  return (
    <section className="relative flex flex-col overflow-hidden pt-20">
      {/* Background blobs */}
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

      {/* Upper hero */}
      <div className="container mx-auto px-4 flex-1 grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center relative z-10 py-12">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] text-primary uppercase perspective-[600px]">
            {words.map((word, i) => (
              <div key={word + i} className="overflow-hidden">
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
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 max-w-sm shadow-sm border border-border/50"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              I'm <strong className="text-foreground">Dr. Sarah Mitchell</strong>, a dedicated dentist committed to giving you the healthiest, most beautiful smile using the latest technology and a gentle touch.
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Clock className="w-4 h-4 text-accent" />
              <span>Clinic Hours: <strong className="text-foreground">9:00 AM – 6:00 PM</strong></span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Button asChild variant="accent" size="lg" className="rounded-full px-8 group">
              <Link to="/contact">
                Book Appointment
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Center – tooth image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
          className="flex justify-center"
        >
          <motion.img
            src={toothSplash}
            alt="Dental care illustration"
            className="w-[280px] md:w-[380px] lg:w-[420px] xl:w-[480px] drop-shadow-2xl"
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

      {/* Lower banner – inspired by reference */}
      <div className="relative z-10 bg-primary mt-8">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid lg:grid-cols-[1fr_auto_auto] gap-8 items-center">
            {/* Text + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground uppercase leading-tight">
                Smile Beyond <br className="hidden md:block" />
                <span className="text-accent">Expectations</span>
              </h2>
              <p className="text-primary-foreground/70 mt-4 max-w-xl text-lg leading-relaxed">
                Whether it's a routine checkup or a complete smile makeover, I combine expertise with cutting-edge technology to deliver results that exceed your expectations.
              </p>
              <Button asChild variant="accent" size="lg" className="rounded-full px-8 mt-6 group">
                <Link to="/services">
                  Explore Services
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            {/* Center image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-4 border-primary-foreground/20 shadow-2xl">
                <img
                  src={heroTooth}
                  alt="Advanced dental care"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <motion.div
                className="absolute inset-0 w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full border-2 border-dashed border-accent/40 mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Right side icons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden lg:flex flex-col gap-4"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center cursor-pointer hover:bg-accent/20 transition-colors"
                >
                  <Maximize2 className="w-5 h-5 text-primary-foreground" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee */}
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
