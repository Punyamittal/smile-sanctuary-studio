import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, Plus, Sparkles, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCountUp from "@/hooks/useCountUp";
import toothSplash from "@/assets/tooth-splash.png";
import heroTooth from "@/assets/hero-tooth.png";
import dentalMirror from "@/assets/dental-mirror.png";
import toothbrush from "@/assets/toothbrush.png";
import sparkleTooth from "@/assets/sparkle-tooth.png";
import floatingTooth from "@/assets/floating-tooth.png";

const statsData = [
  { value: 15, suffix: "+", label: "Years of Experience", icon: Shield },
  { value: 5000, suffix: "+", label: "Happy Patients", icon: Heart },
  { value: 12, suffix: "+", label: "Certifications", icon: Sparkles },
];

const marqueeItems = ["Braces", "Teeth Cleaning", "Whitening", "Implants", "Root Canal", "Oral Surgery", "Cosmetic Dentistry", "Pediatric Care"];

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 10 + Math.random() * 80,
  y: 10 + Math.random() * 80,
  size: 2 + Math.random() * 3,
  delay: Math.random() * 2,
  dur: 4 + Math.random() * 3,
}));

const StatItem = ({ value, suffix, label, icon: Icon, delay }: { value: number; suffix: string; label: string; icon: typeof Shield; delay: number }) => {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      whileHover={{ x: 6, scale: 1.02 }}
      className="border-l-2 border-accent pl-5 py-2 cursor-default group"
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
          <Icon className="w-3.5 h-3.5 text-accent" />
        </div>
        <p className="text-4xl md:text-5xl font-bold text-accent tabular-nums">
          <span ref={ref}>{String(count).padStart(String(value).length, "0")}</span>
          {suffix}
        </p>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
};

const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
const scrollToServices = () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });

const HeroSection = () => {
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

  const words = ["Your", "Smile", "My", "Priority"];

  const wordVariants = {
    hidden: { y: "120%", rotateX: -90, opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        delay: 0.15 + i * 0.12,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section className="relative flex flex-col overflow-hidden pt-20">
      {/* Gradient background blobs with parallax */}
      <motion.div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-light -translate-x-1/3 -translate-y-1/4 opacity-60" style={{ x: mouse.x * -0.3, y: mouse.y * -0.3 }} animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-blue-light translate-x-1/3 opacity-40" style={{ x: mouse.x * 0.2, y: mouse.y * 0.2 }} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.08), transparent 70%)" }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full bg-accent/20" style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }} animate={{ y: [0, -25, 0], opacity: [0, 0.7, 0] }} transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }} />
      ))}

      {/* Floating dental images with mouse parallax */}
      <motion.img src={dentalMirror} alt="" className="absolute top-32 right-[8%] w-20 md:w-28 opacity-[0.12] pointer-events-none hidden lg:block" style={{ x: mouse.x * 0.5, y: mouse.y * 0.5 }} animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.img src={toothbrush} alt="" className="absolute bottom-[35%] left-[3%] w-16 md:w-24 opacity-[0.08] pointer-events-none hidden lg:block" style={{ x: mouse.x * -0.4, y: mouse.y * -0.4 }} animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <motion.img src={sparkleTooth} alt="" className="absolute top-[60%] right-[15%] w-12 md:w-16 opacity-[0.06] pointer-events-none hidden xl:block" style={{ x: mouse.x * 0.3, y: mouse.y * 0.3 }} animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

      {/* Upper hero */}
      <div className="container mx-auto px-4 flex-1 grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center relative z-10 py-12 md:py-16">
        <div className="space-y-6">
          <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
            <motion.div className="h-px bg-accent" initial={{ width: 0 }} animate={{ width: 32 }} transition={{ duration: 0.8, delay: 0.2 }} />
            <motion.span className="text-xs font-medium text-accent tracking-[0.15em] uppercase" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>Dental Excellence</motion.span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] text-primary uppercase perspective-[600px]">
            {words.map((word, i) => (
              <div key={word + i} className="overflow-hidden">
                <motion.span className="italic block" custom={i} variants={wordVariants} initial="hidden" animate="visible">{word}</motion.span>
              </div>
            ))}
          </h1>

          <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }} className="bg-card/80 backdrop-blur-md rounded-2xl p-5 max-w-sm shadow-lg border border-border/50">
            <p className="text-sm text-muted-foreground leading-relaxed">I'm <strong className="text-foreground">Dr. Gunjan Thakur</strong>, a dedicated dentist committed to giving you the healthiest, most beautiful smile using the latest technology and a gentle touch.</p>
            <motion.div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
              <Clock className="w-4 h-4 text-accent" /><span>Clinic Hours: <strong className="text-foreground">9:00 AM – 6:00 PM</strong></span>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 }}>
            <Button variant="accent" size="lg" className="rounded-full px-8 group shadow-lg shadow-accent/20" onClick={scrollToContact}>
              Book Appointment
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Center – tooth image */}
        <motion.div initial={{ opacity: 0, scale: 0.6, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 80 }} className="flex justify-center relative">
          <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[440px] lg:h-[440px] rounded-full border border-dashed border-primary/10" />
          </motion.div>
          <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            <div className="w-[340px] h-[340px] md:w-[450px] md:h-[450px] lg:w-[490px] lg:h-[490px] rounded-full border border-primary/[0.04]" />
          </motion.div>
          <motion.img src={toothSplash} alt="Dental care illustration" className="w-[280px] md:w-[380px] lg:w-[420px] xl:w-[480px] drop-shadow-2xl relative z-10" style={{ x: mouse.x * 0.15, y: mouse.y * 0.15 }} animate={{ y: [0, -14, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>

        {/* Right – stats */}
        <div className="space-y-8 lg:pl-8">
          {statsData.map((s, i) => <StatItem key={i} {...s} delay={0.5 + i * 0.2} />)}
        </div>
      </div>

      {/* Lower banner */}
      <div className="relative z-10 bg-primary mt-8 overflow-hidden">
        <motion.div className="absolute inset-0 opacity-20" animate={{ background: ["radial-gradient(ellipse 60% 50% at 20% 50%, hsl(var(--accent) / 0.2), transparent)", "radial-gradient(ellipse 60% 50% at 80% 50%, hsl(var(--accent) / 0.2), transparent)", "radial-gradient(ellipse 60% 50% at 20% 50%, hsl(var(--accent) / 0.2), transparent)"] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.img src={toothbrush} alt="" className="absolute -top-6 -right-4 w-32 md:w-44 opacity-[0.08] pointer-events-none rotate-45" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
        <motion.img src={floatingTooth} alt="" className="absolute bottom-4 left-[5%] w-20 opacity-[0.06] pointer-events-none" animate={{ y: [0, 8, 0], rotate: [-3, 3, -3] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />

        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center lg:text-left">
                <motion.div className="flex items-center gap-3 mb-4 justify-center lg:justify-start" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <motion.div className="h-px bg-accent" initial={{ width: 0 }} whileInView={{ width: 30 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} />
                  <span className="text-accent text-xs tracking-[0.15em] uppercase font-medium">Beyond Expectations</span>
                </motion.div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground uppercase leading-tight">
                  Smile Beyond <br className="hidden md:block" />
                  <motion.span className="text-accent inline-block" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }}>Expectations</motion.span>
                </h2>
                <motion.p className="text-primary-foreground/70 mt-4 max-w-xl text-lg leading-relaxed" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}>
                  Whether it's a routine checkup or a complete smile makeover, I combine expertise with cutting-edge technology to deliver results that exceed your expectations.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
                  <Button variant="accent" size="lg" className="rounded-full px-8 mt-6 group shadow-lg shadow-accent/25" onClick={scrollToServices}>
                    Explore Services
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -5 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2, type: "spring" }} className="relative flex justify-center">
              <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                <div className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full border-2 border-dashed border-accent/30" />
              </motion.div>
              <div className="w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-4 border-primary-foreground/20 shadow-2xl relative">
                <img src={heroTooth} alt="Advanced dental care" className="w-full h-full object-cover" />
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" initial={{ x: "-100%" }} animate={{ x: "200%" }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }} />
              </div>
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
