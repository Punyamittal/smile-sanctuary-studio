import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles, Sun, Wrench, Stethoscope, Baby, Scissors,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  { icon: Sparkles, title: "Teeth Cleaning", desc: "Professional cleaning to remove plaque and tartar for a healthier smile." },
  { icon: Sun, title: "Teeth Whitening", desc: "Brighten your smile with our advanced whitening treatments." },
  { icon: Wrench, title: "Dental Implants", desc: "Permanent tooth replacement that looks and feels natural." },
  { icon: Stethoscope, title: "Root Canal", desc: "Pain-free root canal therapy to save and restore damaged teeth." },
  { icon: Baby, title: "Pediatric Dentistry", desc: "Gentle dental care designed specifically for children." },
  { icon: Scissors, title: "Oral Surgery", desc: "Expert surgical procedures for complex dental conditions." },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Enjoy Specialized Dental Services
          </h2>
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
