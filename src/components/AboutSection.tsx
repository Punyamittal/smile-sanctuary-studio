import { useRef } from "react";
import { Shield, Heart, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import useCountUp from "@/hooks/useCountUp";

const stats = [
  { icon: Shield, label: "Advanced Technology", value: 100, suffix: "+" },
  { icon: Heart, label: "Happy Patients", value: 25, suffix: "K+" },
  { icon: Award, label: "Awards Won", value: 35, suffix: "+" },
];

const StatCard = ({ icon: Icon, label, value, suffix, delay }: typeof stats[0] & { delay: number }) => {
  const { count, ref } = useCountUp(value);
  return (
    <ScrollReveal delay={delay}>
      <div className="bg-background rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        <div className="w-14 h-14 rounded-full bg-blue-light mx-auto mb-4 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <p className="text-3xl font-bold text-accent mb-1 tabular-nums">
          <span ref={ref}>{count}</span>{suffix}
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </ScrollReveal>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Committed to Your Dental Health
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            At Denta Care, we believe everyone deserves a beautiful, healthy smile. Our state-of-the-art facility combines the latest dental technology with compassionate care.
          </p>
          <Button variant="outline" className="mt-6 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
            <a href="#services">
              Read More <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={0.15 * i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
