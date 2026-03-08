import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProcedureSection from "@/components/ProcedureSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Sparkles, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import floatingTooth from "@/assets/floating-tooth.png";
import sparkleTooth from "@/assets/sparkle-tooth.png";

const quickFacts = [
  { icon: Sparkles, title: "Modern Technology", desc: "Digital X-rays, laser treatments, and 3D imaging for precise care." },
  { icon: Shield, title: "Safe & Sterile", desc: "Hospital-grade sterilization protocols for your peace of mind." },
  { icon: Heart, title: "Patient-First Care", desc: "Every treatment plan is personalized to your unique needs." },
];

const Index = () => (
  <>
    <HeroSection />

    {/* Quick facts band */}
    <section className="py-16 bg-card border-y border-border relative overflow-hidden">
      <motion.img
        src={floatingTooth}
        alt=""
        className="absolute -bottom-6 right-[8%] w-20 opacity-[0.07] pointer-events-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 relative z-10">
        {quickFacts.map((f, i) => (
          <ScrollReveal key={f.title} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -4 }}
              className="flex gap-5 items-start"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-light flex items-center justify-center shrink-0">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>

    <ServicesSection />
    <ProcedureSection />
    <TestimonialsSection />

    {/* CTA Band */}
    <section className="py-20 bg-primary relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundImage: "radial-gradient(circle, hsl(var(--accent)) 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />
      {/* Floating tooth in CTA */}
      <motion.img
        src={sparkleTooth}
        alt=""
        className="absolute top-6 left-[6%] w-20 md:w-28 opacity-15 pointer-events-none"
        animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={floatingTooth}
        alt=""
        className="absolute bottom-4 right-[8%] w-16 md:w-24 opacity-10 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready for a Healthier Smile?
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Schedule your appointment today and take the first step towards the smile you've always wanted.
          </p>
          <Button asChild variant="accent" size="lg" className="rounded-full px-10 group">
            <Link to="/contact">
              Book Appointment
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  </>
);

export default Index;
