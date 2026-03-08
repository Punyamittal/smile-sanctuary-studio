import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, useInView } from "framer-motion";
import { useRef, lazy, Suspense } from "react";
import {
  Sparkles, Sun, Wrench, Stethoscope, Baby, Scissors,
  CheckCircle2, ArrowRight, HelpCircle,
} from "lucide-react";
import R3FErrorBoundary from "@/components/R3FErrorBoundary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FloatingDentalElements = lazy(() => import("@/components/FloatingDentalElements"));

const services = [
  {
    icon: Sparkles,
    title: "Teeth Cleaning",
    desc: "Professional cleaning removes plaque and tartar buildup that regular brushing can't reach, preventing gum disease and cavities.",
    benefits: ["Prevents gum disease", "Removes surface stains", "Freshens breath", "Early problem detection"],
    duration: "45-60 min",
  },
  {
    icon: Sun,
    title: "Teeth Whitening",
    desc: "In-office professional whitening can brighten your teeth up to 8 shades in a single visit using safe, clinically-proven methods.",
    benefits: ["Up to 8 shades whiter", "Safe for enamel", "Long-lasting results", "Boosts confidence"],
    duration: "60-90 min",
  },
  {
    icon: Wrench,
    title: "Dental Implants",
    desc: "Titanium implants fused to your jawbone provide a permanent, natural-looking foundation for replacement teeth.",
    benefits: ["Permanent solution", "Preserves jawbone", "Natural appearance", "Eat anything comfortably"],
    duration: "1-2 hours",
  },
  {
    icon: Stethoscope,
    title: "Root Canal Therapy",
    desc: "Modern root canals are virtually painless. I remove infected pulp, clean the canal, and seal it to save your natural tooth.",
    benefits: ["Saves natural teeth", "Pain-free with anesthesia", "Prevents infection spread", "Quick recovery"],
    duration: "60-90 min",
  },
  {
    icon: Baby,
    title: "Pediatric Dentistry",
    desc: "Specialized gentle care for children, building positive dental habits from an early age in a fun, stress-free environment.",
    benefits: ["Kid-friendly environment", "Preventive sealants", "Fluoride treatments", "Growth monitoring"],
    duration: "30-45 min",
  },
  {
    icon: Scissors,
    title: "Oral Surgery",
    desc: "From wisdom teeth removal to corrective jaw surgery, performed with precision and advanced sedation for maximum comfort.",
    benefits: ["IV sedation available", "Minimally invasive", "Fast healing protocols", "Post-op care included"],
    duration: "Varies",
  },
];

const faqs = [
  { q: "How often should I visit the dentist?", a: "The American Dental Association recommends visiting your dentist at least twice a year for regular checkups and cleanings. However, if you have specific conditions like gum disease, you may need more frequent visits." },
  { q: "Does teeth whitening damage enamel?", a: "Professional teeth whitening, when performed by a qualified dentist, is completely safe for your enamel. I use clinically tested products that whiten teeth without damaging the enamel structure." },
  { q: "What should I do in a dental emergency?", a: "For a knocked-out tooth, keep it moist and see me within 30 minutes. For severe pain, rinse with warm salt water and apply a cold compress. Call my office immediately — I offer same-day emergency appointments." },
  { q: "Are dental X-rays safe?", a: "Modern digital X-rays use up to 90% less radiation than traditional film X-rays. The amount of radiation is minimal — less than what you'd receive from a day in the sun. We use lead aprons for additional protection." },
  { q: "How can I prevent cavities?", a: "Brush twice daily with fluoride toothpaste, floss daily, limit sugary snacks, drink water after meals, and visit me regularly for cleanings and early detection. Dental sealants are also excellent for cavity-prone teeth." },
  { q: "What's the difference between a crown and a veneer?", a: "A crown covers the entire tooth and is used for damaged or weakened teeth. A veneer covers only the front surface and is primarily cosmetic. I'll recommend the best option based on your specific situation." },
];

const processSteps = [
  { step: "01", title: "Consultation", desc: "Comprehensive oral exam with digital X-rays to assess your dental health." },
  { step: "02", title: "Treatment Plan", desc: "Personalized plan discussing options, timeline, and transparent pricing." },
  { step: "03", title: "Procedure", desc: "Comfortable, precise treatment using the latest dental technology." },
  { step: "04", title: "Follow-Up", desc: "Post-treatment care instructions and follow-up to ensure optimal results." },
];

const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <PageHeader
        subtitle="What I Offer"
        title="Comprehensive Dental Services"
        description="From routine cleanings to advanced cosmetic procedures — personalized care tailored to your unique needs."
      />

      {/* Services grid */}
      <section className="py-24 bg-background relative" ref={ref}>
        <R3FErrorBoundary>
          <Suspense fallback={null}>
            <FloatingDentalElements className="absolute inset-0 opacity-10 pointer-events-none" />
          </Suspense>
        </R3FErrorBoundary>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group bg-card rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50"
              >
                <motion.div
                  className="w-14 h-14 rounded-xl bg-blue-light group-hover:bg-primary transition-colors duration-300 flex items-center justify-center mb-5"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  <s.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <div className="text-xs text-accent font-medium mb-4">⏱ {s.duration}</div>
                <ul className="space-y-2">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">My Treatment Process</h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="relative bg-background rounded-2xl p-8 text-center border border-border/50 hover:shadow-lg transition-all"
                >
                  <span className="text-5xl font-bold text-blue-light block mb-4">{s.step}</span>
                  <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  {i < processSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-accent z-10" />
                  )}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left">
              <div className="sticky top-32">
                <div className="w-14 h-14 rounded-xl bg-blue-light flex items-center justify-center mb-6">
                  <HelpCircle className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">FAQ</p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  I believe educated patients make the best decisions about their health. Here are answers to the questions I hear most often.
                </p>
                <Button asChild variant="accent" className="rounded-full px-8 group">
                  <Link to="/contact">
                    Still Have Questions?
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-2xl border border-border/50 px-6 overflow-hidden">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
