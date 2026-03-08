import { motion, useInView } from "framer-motion";
import { useRef, lazy, Suspense } from "react";
import {
  Sparkles, Sun, Wrench, Stethoscope, Baby, Scissors,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import R3FErrorBoundary from "@/components/R3FErrorBoundary";

const FloatingDentalElements = lazy(() => import("@/components/FloatingDentalElements"));

const services = [
  { icon: Sparkles, title: "Teeth Cleaning", desc: "Thorough professional cleaning to keep your teeth and gums healthy." },
  { icon: Sun, title: "Teeth Whitening", desc: "Professional whitening for a brighter, more confident smile." },
  { icon: Wrench, title: "Dental Implants", desc: "Permanent, natural-looking tooth replacement solutions." },
  { icon: Stethoscope, title: "Root Canal", desc: "Comfortable, pain-free root canal therapy to save your teeth." },
  { icon: Baby, title: "Pediatric Dentistry", desc: "Gentle, friendly dental care for your little ones." },
  { icon: Scissors, title: "Oral Surgery", desc: "Expert surgical procedures with a focus on patient comfort." },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-background relative" ref={ref}>
      <R3FErrorBoundary>
        <Suspense fallback={null}>
          <FloatingDentalElements className="absolute inset-0 opacity-20 pointer-events-none" />
        </Suspense>
      </R3FErrorBoundary>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">My Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Comprehensive Dental Care
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            From routine cleanings to advanced cosmetic procedures, I offer a full range of dental services tailored to your needs.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-card rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-border/50 cursor-pointer"
            >
              <motion.div
                className="w-14 h-14 rounded-xl bg-blue-light group-hover:bg-primary transition-colors duration-300 flex items-center justify-center mb-5"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <s.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
