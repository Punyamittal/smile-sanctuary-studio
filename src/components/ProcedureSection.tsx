import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Zap } from "lucide-react";
import procedureBg from "@/assets/procedure-bg.jpg";

const ProcedureSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden min-h-[400px]">
          <img
            src={procedureBg}
            alt="Advanced dental technology"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative z-10 p-10 md:p-16 max-w-xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Advanced Dental Technology
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              We use the latest equipment and techniques to ensure precise diagnostics, comfortable procedures, and outstanding results for every patient.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-primary-foreground">Cavity Protection</p>
                  <p className="text-xs text-primary-foreground/60">Preventive care</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-primary-foreground">Laser Treatment</p>
                  <p className="text-xs text-primary-foreground/60">Minimally invasive</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcedureSection;
