import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import useCountUp from "@/hooks/useCountUp";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Heart, Award, GraduationCap, Calendar, Users, CheckCircle2, Lightbulb, Smile, Stethoscope } from "lucide-react";
import doc2 from "@/assets/doctor2.jpg";
import floatingTooth from "@/assets/floating-tooth.png";
import toothShield from "@/assets/tooth-shield.png";
import toothbrush from "@/assets/toothbrush.png";

const stats = [
  { icon: Shield, label: "Years of Practice", value: 15, suffix: "+" },
  { icon: Heart, label: "Happy Patients", value: 5000, suffix: "+" },
  { icon: Award, label: "Certifications", value: 12, suffix: "+" },
  { icon: Users, label: "Procedures / Year", value: 800, suffix: "+" },
];

const StatCard = ({ icon: Icon, label, value, suffix, delay }: typeof stats[0] & { delay: number }) => {
  const { count, ref } = useCountUp(value);
  return (
    <ScrollReveal delay={delay}>
      <motion.div
        whileHover={{ y: -6, scale: 1.03 }}
        className="bg-card rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50"
      >
        <div className="w-14 h-14 rounded-full bg-blue-light mx-auto mb-4 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <p className="text-3xl font-bold text-accent mb-1 tabular-nums">
          <span ref={ref}>{count}</span>{suffix}
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </motion.div>
    </ScrollReveal>
  );
};

const timeline = [
  { year: "2008", title: "Graduated Columbia University", desc: "Doctor of Dental Surgery (DDS) with honors", icon: GraduationCap },
  { year: "2010", title: "Advanced Implant Training", desc: "Completed fellowship in implantology at NYU", icon: Award },
  { year: "2013", title: "Opened Private Practice", desc: "Established patient-first dental care clinic in NYC", icon: Calendar },
  { year: "2018", title: "Cosmetic Dentistry Certification", desc: "Board certified in aesthetic and cosmetic procedures", icon: Smile },
  { year: "2023", title: "5000+ Patients Milestone", desc: "Reached over 5,000 successfully treated patients", icon: Users },
];

const philosophy = [
  { icon: Lightbulb, title: "Education First", desc: "I believe informed patients make the best decisions. I take time to explain every procedure, option, and outcome." },
  { icon: Heart, title: "Gentle Approach", desc: "Dental anxiety is real. I use modern sedation techniques and a caring approach to ensure comfort at every visit." },
  { icon: Stethoscope, title: "Prevention Over Cure", desc: "Regular checkups and early intervention save teeth, time, and money. Prevention is the cornerstone of my practice." },
  { icon: CheckCircle2, title: "Quality Materials", desc: "I use only FDA-approved, biocompatible materials and partner with top dental labs for lasting results." },
];

const dentalFacts = [
  "The average person spends 38.5 days brushing their teeth over their lifetime.",
  "Tooth enamel is the hardest substance in the human body — even harder than bone.",
  "A snail's mouth is no larger than a pin head, yet it can contain over 25,000 teeth.",
  "The first toothbrush with bristles was manufactured in China in 1498.",
  "People who drink 3+ sugary sodas daily have 62% more tooth decay.",
  "Your mouth produces over 25,000 quarts of saliva in a lifetime — enough to fill two swimming pools.",
];

const About = () => {
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <>
      <PageHeader
        subtitle="About Dr. Mitchell"
        title="Passionate About Your Dental Health"
        description="Over 15 years of experience in creating beautiful, healthy smiles with a gentle, patient-first approach."
      />

      {/* Bio section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Floating images */}
        <motion.img
          src={floatingTooth}
          alt=""
          className="absolute top-16 right-[4%] w-24 md:w-32 opacity-[0.07] pointer-events-none"
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src={toothbrush}
          alt=""
          className="absolute bottom-20 left-[2%] w-20 md:w-28 opacity-[0.06] pointer-events-none"
          animate={{ y: [0, 10, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-xl"
                >
                  <img src={doc2} alt="Dr. Sarah Mitchell" className="w-full h-full object-cover" loading="lazy" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground rounded-2xl px-6 py-3 shadow-lg"
                >
                  <p className="font-bold text-lg">15+ Years</p>
                  <p className="text-xs opacity-80">of Excellence</p>
                </motion.div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">My Story</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Hi, I'm Dr. Sarah Mitchell
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                With over 15 years of experience in general and cosmetic dentistry, I've dedicated my career to creating beautiful, healthy smiles. My practice is built on a foundation of trust, comfort, and cutting-edge dental care.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I graduated from Columbia University College of Dental Medicine and have since completed advanced training in cosmetic procedures, implantology, and pediatric dentistry. Every patient who walks through my door is treated like family.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I stay at the forefront of dental science by attending international conferences and investing in the latest technology — from digital 3D scanners to laser treatment systems. My goal is simple: to provide you with the best care possible in a warm, welcoming environment.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={0.1 * i} />
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-background relative overflow-hidden">
        <motion.img
          src={toothShield}
          alt=""
          className="absolute top-10 left-[3%] w-24 md:w-32 opacity-[0.06] pointer-events-none"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">My Philosophy</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">What I Believe In</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-8">
            {philosophy.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="flex gap-5 items-start bg-card rounded-2xl p-8 border border-border/50 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-light flex items-center justify-center shrink-0">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-card relative overflow-hidden" ref={timelineRef}>
        <motion.img
          src={floatingTooth}
          alt=""
          className="absolute bottom-12 right-[5%] w-20 md:w-28 opacity-[0.05] pointer-events-none"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Career Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Professional Timeline</h2>
          </ScrollReveal>

          <div className="relative max-w-3xl mx-auto">
            <motion.div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px"
              initial={{ scaleY: 0 }}
              animate={timelineInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className={`relative flex items-start gap-6 mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="bg-background rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                    <span className="text-accent font-bold text-lg">{item.year}</span>
                    <h3 className="font-semibold text-foreground mt-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 z-10 shadow-lg">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun dental facts */}
      <section className="py-24 bg-background relative overflow-hidden">
        <motion.img
          src={toothbrush}
          alt=""
          className="absolute top-8 right-[3%] w-20 md:w-28 opacity-[0.06] pointer-events-none rotate-12"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Did You Know?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Fun Dental Facts</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dentalFacts.map((fact, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.04, rotate: 1 }}
                  className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-shadow h-full"
                >
                  <span className="text-4xl font-bold text-blue-light block mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-muted-foreground text-sm leading-relaxed">{fact}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
