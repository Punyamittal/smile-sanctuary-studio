import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FunnelChart } from "@/components/ui/funnel-chart";
import floatingTooth from "@/assets/floating-tooth.png";
import sparkleTooth from "@/assets/sparkle-tooth.png";

const testimonials = [
  { name: "Emily Johnson", role: "Cosmetic Patient", text: "Dr. Mitchell is incredible. She made me feel so relaxed during my root canal — I barely felt a thing. My smile has never looked better!", rating: 5 },
  { name: "Michael Chen", role: "Long-term Patient", text: "I've been terrified of dentists my whole life, but Dr. Mitchell changed that completely. She's patient, kind, and truly skilled. Highly recommend!", rating: 5 },
  { name: "Sarah Williams", role: "Whitening Patient", text: "The whitening results were amazing! Dr. Mitchell took the time to explain everything and made sure I was comfortable throughout. Absolutely love my new smile!", rating: 5 },
  { name: "David Park", role: "Implant Patient", text: "After losing a tooth in an accident, Dr. Mitchell gave me a perfect implant. You can't tell the difference. Her attention to detail is remarkable.", rating: 5 },
  { name: "Lisa Rodriguez", role: "Parent", text: "My kids actually look forward to their dental visits now! Dr. Mitchell has a magical way with children. The office is welcoming and kid-friendly.", rating: 5 },
  { name: "James Thompson", role: "Emergency Patient", text: "Had a dental emergency on a Saturday and Dr. Mitchell fit me in the same day. Professional, quick, and compassionate. A true lifesaver!", rating: 5 },
  { name: "Anna Kowalski", role: "Braces Patient", text: "Dr. Mitchell recommended Invisalign and the results exceeded my expectations. She monitored every step and always had time for my questions.", rating: 5 },
  { name: "Robert Martinez", role: "Preventive Care", text: "The most thorough dental exam I've ever had. Dr. Mitchell caught early signs of gum disease that my previous dentist missed. Grateful for her expertise.", rating: 5 },
  { name: "Grace Kim", role: "Veneers Patient", text: "I finally got the smile I always dreamed of. Dr. Mitchell's artistic eye for veneers is unmatched. The results look completely natural.", rating: 5 },
];

const overallStats = [
  { label: "Google Rating", value: "4.9/5" },
  { label: "Total Reviews", value: "500+" },
  { label: "Would Recommend", value: "99%" },
  { label: "Return Patients", value: "95%" },
];

const patientJourneyData = [
  { label: "Website Visits", value: 12400, displayValue: "12.4k", color: "hsl(var(--primary))" },
  { label: "Consultations", value: 6800, displayValue: "6.8k", color: "hsl(210 80% 55%)" },
  { label: "Treatments", value: 3200, displayValue: "3.2k", color: "hsl(var(--accent))" },
  { label: "Follow-ups", value: 1500, displayValue: "1.5k", color: "hsl(25 95% 55%)" },
  { label: "Loyal Patients", value: 620, displayValue: "620", color: "hsl(150 60% 45%)" },
];

const satisfactionData = [
  { label: "Visited", value: 5000, displayValue: "5,000", color: "hsl(var(--primary))" },
  { label: "Satisfied", value: 4850, displayValue: "4,850", color: "hsl(210 75% 50%)" },
  { label: "5-Star Review", value: 4200, displayValue: "4,200", color: "hsl(var(--accent))" },
  { label: "Referred Others", value: 3100, displayValue: "3,100", color: "hsl(25 90% 50%)" },
];

const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <PageHeader
        subtitle="Patient Stories"
        title="Real Smiles, Real Stories"
        description="Hear from the patients whose lives have been transformed by quality dental care."
      />

      {/* Stats bar */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {overallStats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Patient Journey Funnel */}
      <section className="py-24 bg-background relative overflow-hidden">
        <motion.img
          src={floatingTooth}
          alt=""
          className="absolute top-12 right-[4%] w-24 md:w-32 opacity-[0.06] pointer-events-none"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-light text-primary text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              Patient Analytics
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              The Patient Journey
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              From the first website visit to becoming a loyal patient — here's how our practice converts care into trust.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-card rounded-3xl border border-border/50 p-8 md:p-12 shadow-sm">
              <div className="h-[220px] md:h-[280px]">
                <FunnelChart
                  data={patientJourneyData}
                  orientation="horizontal"
                  layers={4}
                  edges="curved"
                  gap={6}
                  showPercentage
                  showValues
                  showLabels
                  staggerDelay={0.15}
                  className="w-full h-full"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Satisfaction Funnel (Vertical) */}
      <section className="py-24 bg-card relative overflow-hidden">
        <motion.img
          src={sparkleTooth}
          alt=""
          className="absolute bottom-10 left-[3%] w-20 md:w-28 opacity-[0.05] pointer-events-none"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Satisfaction Metrics</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Patient Satisfaction Funnel
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We don't just treat teeth — we build lasting relationships. Our patient satisfaction data speaks for itself: the vast majority of our patients leave 5-star reviews and recommend us to friends and family.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Satisfaction Rate", val: "97%" },
                  { label: "5-Star Reviews", val: "84%" },
                  { label: "Referral Rate", val: "62%" },
                  { label: "Return Visits", val: "95%" },
                ].map((item) => (
                  <div key={item.label} className="bg-background rounded-xl p-4 border border-border/50">
                    <p className="text-2xl font-bold text-accent">{item.val}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-background rounded-3xl border border-border/50 p-8 shadow-sm">
                <div className="h-[400px]">
                  <FunnelChart
                    data={satisfactionData}
                    orientation="vertical"
                    layers={3}
                    edges="curved"
                    gap={5}
                    showPercentage
                    showValues
                    showLabels
                    staggerDelay={0.18}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="py-24 bg-background" ref={ref}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Reviews</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Our Patients Say</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40, rotateY: 10 }}
                animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.03, y: -6 }}
                className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-border/50"
              >
                <Quote className="w-8 h-8 text-blue-light mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.08 + j * 0.06, type: "spring" }}
                    >
                      <Star className="w-4 h-4 fill-accent text-accent" />
                    </motion.div>
                  ))}
                </div>
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Join Our Happy Patients?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
              Your perfect smile is just one appointment away.
            </p>
            <Button asChild variant="accent" size="lg" className="rounded-full px-10 group">
              <Link to="/contact">
                Book Your Visit
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
