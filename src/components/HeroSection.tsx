import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-smile.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background circles */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-accent/50 -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-teal-light animate-float" />
      <div className="absolute top-40 left-1/3 w-16 h-16 rounded-full bg-sky-light animate-pulse-soft" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <p className="text-sm font-medium text-primary tracking-widest uppercase">
            We have a friendly way to
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
            Keep your smile{" "}
            <span className="text-gradient">clean & great.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
            Experience world-class dental care with our team of expert professionals. We combine cutting-edge technology with gentle, personalized treatment.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="rounded-full px-8">
              <a href="#contact">
                Book Appointment <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-8">
              <a href="#services">Our Services</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 pt-4">
            <div>
              <p className="text-3xl font-bold text-foreground">12,398</p>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">5 star reviews from patients</p>
            </div>
            <div className="w-px h-14 bg-border" />
            <div>
              <p className="text-3xl font-bold text-foreground">15+</p>
              <p className="text-xs text-muted-foreground mt-1">Years of experience</p>
            </div>
          </div>
        </motion.div>

        {/* Right – circular image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-8 border-accent shadow-2xl">
            <img
              src={heroImg}
              alt="Smiling patient with perfect teeth"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card rounded-2xl shadow-lg px-6 py-3 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Top Rated</p>
              <p className="text-xs text-muted-foreground">Dental Clinic 2026</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
