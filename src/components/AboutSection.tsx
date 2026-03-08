import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Heart, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Shield, label: "Advanced Technology", value: "100+" },
  { icon: Heart, label: "Happy Patients", value: "25K+" },
  { icon: Award, label: "Awards Won", value: "35+" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Committed to Your Dental Health
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            At Dentica, we believe everyone deserves a beautiful, healthy smile. Our state-of-the-art facility combines the latest dental technology with compassionate care to provide an exceptional experience for every patient.
          </p>
          <Button variant="outline" className="mt-6 rounded-full" asChild>
            <a href="#services">
              Read More <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="bg-card rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-accent mx-auto mb-4 flex items-center justify-center">
                <s.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
