import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import useCountUp from "@/hooks/useCountUp";
import { Shield, Heart, Award } from "lucide-react";
import doc2 from "@/assets/dr-gunjan.jpg";

const stats = [
  { icon: Shield, label: "Years of Practice", value: 15, suffix: "+" },
  { icon: Heart, label: "Happy Patients", value: 5000, suffix: "+" },
  { icon: Award, label: "Certifications", value: 12, suffix: "+" },
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
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Doctor photo */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="w-full max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={doc2}
                  alt="Dr. Gunjan Thakur"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground rounded-2xl px-6 py-3 shadow-lg">
                <p className="font-bold text-lg">15+ Years</p>
                <p className="text-xs opacity-80">of Experience</p>
              </div>
            </div>
          </ScrollReveal>

          {/* About text */}
          <ScrollReveal direction="right">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">About Me</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Hi, I'm Dr. Sarah Mitchell
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              With over 15 years of experience in general and cosmetic dentistry, I've dedicated my career to creating beautiful, healthy smiles. My practice is built on a foundation of trust, comfort, and cutting-edge dental care.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I graduated from Columbia University College of Dental Medicine and have since completed advanced training in cosmetic procedures, implantology, and pediatric dentistry. Every patient who walks through my door is treated like family.
            </p>
            <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
              <a href="#services">
                View My Services <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </ScrollReveal>
        </div>

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
