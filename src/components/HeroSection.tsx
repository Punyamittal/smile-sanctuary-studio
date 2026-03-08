import { motion } from "framer-motion";
import { ArrowRight, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import toothSplash from "@/assets/tooth-splash.png";

const stats = [
  { value: "150+", label: "Expert Dentists" },
  { value: "20+", label: "Dental Clinics across UK" },
  { value: "03+", label: "Countries presence" },
];

const marqueeItems = ["Braces", "Denta Care", "Dentist", "Dentures", "Implants", "Whitening", "Oral Surgery", "Root Canal"];

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden pt-20">
      {/* Background decorative circles */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-light -translate-x-1/3 -translate-y-1/4 opacity-60" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-blue-light translate-x-1/3 opacity-40" />

      <div className="container mx-auto px-4 flex-1 grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center relative z-10 py-12">
        {/* Left – headline + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] text-primary uppercase">
            <span className="italic">Every</span>
            <br />
            <span className="italic">Smile</span>
            <br />
            <span className="italic">Matters</span>
          </h1>

          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 max-w-sm shadow-sm border border-border/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our skilled dentists use advanced technology to offer complete care in a comfortable and friendly environment.
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Clock className="w-4 h-4 text-accent" />
              <span>We're Open: <strong className="text-foreground">10:00 AM – 07:00 PM</strong></span>
            </div>
          </div>

          <Button asChild variant="accent" size="lg" className="rounded-full px-8">
            <a href="#contact">
              Book Appointment <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </motion.div>

        {/* Center – tooth image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <img
            src={toothSplash}
            alt="3D tooth with water splash"
            className="w-[280px] md:w-[380px] lg:w-[420px] xl:w-[480px] drop-shadow-2xl"
            loading="eager"
          />
        </motion.div>

        {/* Right – stats */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="space-y-8 lg:pl-8"
        >
          {stats.map((s, i) => (
            <div key={i} className="border-l-2 border-accent pl-5">
              <p className="text-4xl md:text-5xl font-bold text-accent">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
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
