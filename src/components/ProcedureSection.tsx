import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Zap, Microscope } from "lucide-react";
import procedureBg from "@/assets/procedure-bg.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import toothShield from "@/assets/tooth-shield.png";

const ProcedureSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-card relative overflow-hidden" ref={ref}>
      {/* Floating shield image */}
      <motion.img
        src={toothShield}
        alt=""
        className="absolute -top-4 -left-8 w-28 md:w-36 opacity-10 pointer-events-none"
        animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden min-h-[450px]">
          <img
            src={procedureBg}
            alt="Advanced dental technology"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative z-10 p-10 md:p-16 max-w-2xl"
          >
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">My Clinic</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              State-of-the-Art Technology
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              I invest in the latest dental technology to provide you with the most accurate diagnoses, comfortable treatments, and exceptional results — all in a warm, welcoming environment.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: ShieldCheck, title: "Cavity Protection", sub: "Preventive care" },
                { icon: Zap, title: "Laser Treatment", sub: "Pain-free procedures" },
                { icon: Microscope, title: "Digital X-Rays", sub: "Precise diagnostics" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-primary-foreground/60">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcedureSection;
