import HeroSection from "@/components/HeroSection";
import ProcedureSection from "@/components/ProcedureSection";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight, Sparkles, Shield, Heart, Award, GraduationCap, Calendar,
  Users, CheckCircle2, Lightbulb, Smile, Stethoscope, Sun, Wrench,
  Baby, Scissors, HelpCircle, Star, Quote, TrendingUp, Send,
  MapPin, Phone, Mail, Clock, CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ConnoisseurStack } from "@/components/ui/connoisseur-stack-interactor";
import { FunnelChart } from "@/components/ui/funnel-chart";
import useCountUp from "@/hooks/useCountUp";

import floatingTooth from "@/assets/floating-tooth.png";
import sparkleTooth from "@/assets/sparkle-tooth.png";
import toothShield from "@/assets/tooth-shield.png";
import toothbrush from "@/assets/toothbrush.png";
import dentalMirror from "@/assets/dental-mirror.png";
import doc2 from "@/assets/doctor2.jpg";

// ─── DATA ────────────────────────────────────────────────────────────────────

const quickFacts = [
  { icon: Sparkles, title: "Modern Technology", desc: "Digital X-rays, laser treatments, and 3D imaging for precise care." },
  { icon: Shield, title: "Safe & Sterile", desc: "Hospital-grade sterilization protocols for your peace of mind." },
  { icon: Heart, title: "Patient-First Care", desc: "Every treatment plan is personalized to your unique needs." },
];

const aboutStats = [
  { icon: Shield, label: "Years of Practice", value: 15, suffix: "+" },
  { icon: Heart, label: "Happy Patients", value: 5000, suffix: "+" },
  { icon: Award, label: "Certifications", value: 12, suffix: "+" },
  { icon: Users, label: "Procedures / Year", value: 800, suffix: "+" },
];

const philosophy = [
  { icon: Lightbulb, title: "Education First", desc: "I believe informed patients make the best decisions. I take time to explain every procedure, option, and outcome." },
  { icon: Heart, title: "Gentle Approach", desc: "Dental anxiety is real. I use modern sedation techniques and a caring approach to ensure comfort at every visit." },
  { icon: Stethoscope, title: "Prevention Over Cure", desc: "Regular checkups and early intervention save teeth, time, and money. Prevention is the cornerstone of my practice." },
  { icon: CheckCircle2, title: "Quality Materials", desc: "I use only FDA-approved, biocompatible materials and partner with top dental labs for lasting results." },
];

const timeline = [
  { year: "2008", title: "Graduated Columbia University", desc: "Doctor of Dental Surgery (DDS) with honors", icon: GraduationCap },
  { year: "2010", title: "Advanced Implant Training", desc: "Completed fellowship in implantology at NYU", icon: Award },
  { year: "2013", title: "Opened Private Practice", desc: "Established patient-first dental care clinic in NYC", icon: Calendar },
  { year: "2018", title: "Cosmetic Dentistry Certification", desc: "Board certified in aesthetic and cosmetic procedures", icon: Smile },
  { year: "2023", title: "5000+ Patients Milestone", desc: "Reached over 5,000 successfully treated patients", icon: Users },
];

const dentalFacts = [
  "The average person spends 38.5 days brushing their teeth over their lifetime.",
  "Tooth enamel is the hardest substance in the human body — even harder than bone.",
  "A snail's mouth is no larger than a pin head, yet it can contain over 25,000 teeth.",
  "The first toothbrush with bristles was manufactured in China in 1498.",
  "People who drink 3+ sugary sodas daily have 62% more tooth decay.",
  "Your mouth produces over 25,000 quarts of saliva in a lifetime — enough to fill two swimming pools.",
];

const dentalShowcase = [
  { num: "01", name: "Teeth Whitening", clipId: "clip-original", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80" },
  { num: "02", name: "Dental Implants", clipId: "clip-hexagons", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80" },
  { num: "03", name: "Smile Makeover", clipId: "clip-pixels", image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80" },
];

const services = [
  { icon: Sparkles, title: "Teeth Cleaning", desc: "Professional cleaning removes plaque and tartar buildup that regular brushing can't reach, preventing gum disease and cavities.", benefits: ["Prevents gum disease", "Removes surface stains", "Freshens breath", "Early problem detection"], duration: "45-60 min" },
  { icon: Sun, title: "Teeth Whitening", desc: "In-office professional whitening can brighten your teeth up to 8 shades in a single visit using safe, clinically-proven methods.", benefits: ["Up to 8 shades whiter", "Safe for enamel", "Long-lasting results", "Boosts confidence"], duration: "60-90 min" },
  { icon: Wrench, title: "Dental Implants", desc: "Titanium implants fused to your jawbone provide a permanent, natural-looking foundation for replacement teeth.", benefits: ["Permanent solution", "Preserves jawbone", "Natural appearance", "Eat anything comfortably"], duration: "1-2 hours" },
  { icon: Stethoscope, title: "Root Canal Therapy", desc: "Modern root canals are virtually painless. I remove infected pulp, clean the canal, and seal it to save your natural tooth.", benefits: ["Saves natural teeth", "Pain-free with anesthesia", "Prevents infection spread", "Quick recovery"], duration: "60-90 min" },
  { icon: Baby, title: "Pediatric Dentistry", desc: "Specialized gentle care for children, building positive dental habits from an early age in a fun, stress-free environment.", benefits: ["Kid-friendly environment", "Preventive sealants", "Fluoride treatments", "Growth monitoring"], duration: "30-45 min" },
  { icon: Scissors, title: "Oral Surgery", desc: "From wisdom teeth removal to corrective jaw surgery, performed with precision and advanced sedation for maximum comfort.", benefits: ["IV sedation available", "Minimally invasive", "Fast healing protocols", "Post-op care included"], duration: "Varies" },
];

const processSteps = [
  { step: "01", title: "Consultation", desc: "Comprehensive oral exam with digital X-rays to assess your dental health." },
  { step: "02", title: "Treatment Plan", desc: "Personalized plan discussing options, timeline, and transparent pricing." },
  { step: "03", title: "Procedure", desc: "Comfortable, precise treatment using the latest dental technology." },
  { step: "04", title: "Follow-Up", desc: "Post-treatment care instructions and follow-up to ensure optimal results." },
];

const faqs = [
  { q: "How often should I visit the dentist?", a: "The American Dental Association recommends visiting your dentist at least twice a year for regular checkups and cleanings. However, if you have specific conditions like gum disease, you may need more frequent visits." },
  { q: "Does teeth whitening damage enamel?", a: "Professional teeth whitening, when performed by a qualified dentist, is completely safe for your enamel. I use clinically tested products that whiten teeth without damaging the enamel structure." },
  { q: "What should I do in a dental emergency?", a: "For a knocked-out tooth, keep it moist and see me within 30 minutes. For severe pain, rinse with warm salt water and apply a cold compress. Call my office immediately — I offer same-day emergency appointments." },
  { q: "Are dental X-rays safe?", a: "Modern digital X-rays use up to 90% less radiation than traditional film X-rays. The amount of radiation is minimal — less than what you'd receive from a day in the sun. We use lead aprons for additional protection." },
  { q: "How can I prevent cavities?", a: "Brush twice daily with fluoride toothpaste, floss daily, limit sugary snacks, drink water after meals, and visit me regularly for cleanings and early detection. Dental sealants are also excellent for cavity-prone teeth." },
  { q: "What's the difference between a crown and a veneer?", a: "A crown covers the entire tooth and is used for damaged or weakened teeth. A veneer covers only the front surface and is primarily cosmetic. I'll recommend the best option based on your specific situation." },
];

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

const contactInfo = [
  { icon: MapPin, title: "Location", lines: ["456 Smile Street, Suite 200", "New York, NY 10001"] },
  { icon: Phone, title: "Phone", lines: ["(123) 456-7890", "Emergency: (123) 456-7891"] },
  { icon: Mail, title: "Email", lines: ["hello@drmitchell.com", "appointments@drmitchell.com"] },
  { icon: Clock, title: "Hours", lines: ["Mon – Fri: 9AM – 6PM", "Sat: 9AM – 1PM | Sun: Closed"] },
];

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, label, value, suffix, delay }: typeof aboutStats[0] & { delay: number }) => {
  const { count, ref } = useCountUp(value);
  return (
    <ScrollReveal delay={delay}>
      <motion.div whileHover={{ y: -6, scale: 1.03 }} className="bg-card rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50">
        <div className="w-14 h-14 rounded-full bg-blue-light mx-auto mb-4 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <p className="text-3xl font-bold text-accent mb-1 tabular-nums"><span ref={ref}>{count}</span>{suffix}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </motion.div>
    </ScrollReveal>
  );
};

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

const Index = () => {
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const testimonialsRef = useRef(null);
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });
  const contactRef = useRef(null);
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });
  const [contactLoading, setContactLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setTimeout(() => {
      setContactLoading(false);
      toast.success("Appointment request sent! Dr. Mitchell will get back to you shortly.");
    }, 1000);
  };

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <div id="home">
        <HeroSection />
      </div>


      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="py-24 bg-background relative overflow-hidden">
        <motion.img src={floatingTooth} alt="" className="absolute top-16 right-[4%] w-24 md:w-32 opacity-[0.07] pointer-events-none" animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <motion.img src={toothbrush} alt="" className="absolute bottom-20 left-[2%] w-20 md:w-28 opacity-[0.06] pointer-events-none" animate={{ y: [0, 10, 0], rotate: [-3, 3, -3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} className="w-full max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
                  <img src={doc2} alt="Dr. Sarah Mitchell" className="w-full h-full object-cover" loading="lazy" />
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground rounded-2xl px-6 py-3 shadow-lg">
                  <p className="font-bold text-lg">15+ Years</p>
                  <p className="text-xs opacity-80">of Excellence</p>
                </motion.div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">My Story</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Hi, I'm Dr. Sarah Mitchell</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">With over 15 years of experience in general and cosmetic dentistry, I've dedicated my career to creating beautiful, healthy smiles. My practice is built on a foundation of trust, comfort, and cutting-edge dental care.</p>
              <p className="text-muted-foreground leading-relaxed mb-4">I graduated from Columbia University College of Dental Medicine and have since completed advanced training in cosmetic procedures, implantology, and pediatric dentistry. Every patient who walks through my door is treated like family.</p>
              <p className="text-muted-foreground leading-relaxed">I stay at the forefront of dental science by attending international conferences and investing in the latest technology — from digital 3D scanners to laser treatment systems.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Interactive Dental Showcase */}
      <section className="py-24 bg-card relative overflow-hidden">
        <motion.img src={toothShield} alt="" className="absolute top-8 right-[3%] w-24 md:w-32 opacity-[0.05] pointer-events-none" animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Explore</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Signature Treatments</h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Hover over each treatment to discover the transformative results we deliver every day.</p>
          </ScrollReveal>
          <ConnoisseurStack items={dentalShowcase} />
        </div>
      </section>

      {/* About Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutStats.map((s, i) => <StatCard key={s.label} {...s} delay={0.1 * i} />)}
        </div>
      </section>


      {/* Timeline */}
      <section className="py-24 bg-background relative overflow-hidden" ref={timelineRef}>
        <motion.img src={floatingTooth} alt="" className="absolute bottom-12 right-[5%] w-20 md:w-28 opacity-[0.05] pointer-events-none" animate={{ y: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Career Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Professional Timeline</h2>
          </ScrollReveal>
          <div className="relative max-w-3xl mx-auto">
            <motion.div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" initial={{ scaleY: 0 }} animate={timelineInView ? { scaleY: 1 } : {}} transition={{ duration: 1.2, ease: "easeOut" }} style={{ transformOrigin: "top" }} />
            {timeline.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} animate={timelineInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }} className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                    <span className="text-accent font-bold text-lg">{item.year}</span>
                    <h3 className="font-semibold text-foreground mt-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 z-10 shadow-lg"><item.icon className="w-5 h-5 text-primary-foreground" /></div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dental Facts */}
      <section className="py-24 bg-card relative overflow-hidden">
        <motion.img src={toothbrush} alt="" className="absolute top-8 right-[3%] w-20 md:w-28 opacity-[0.06] pointer-events-none rotate-12" animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Did You Know?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Fun Dental Facts</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dentalFacts.map((fact, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div whileHover={{ scale: 1.04, rotate: 1 }} className="bg-background rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-shadow h-full">
                  <span className="text-4xl font-bold text-blue-light block mb-3">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-muted-foreground text-sm leading-relaxed">{fact}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section id="services" className="py-24 bg-background relative overflow-hidden" ref={servicesRef}>
        <motion.img src={floatingTooth} alt="" className="absolute top-12 right-[4%] w-24 md:w-32 opacity-[0.07] pointer-events-none" animate={{ y: [0, -16, 0], rotate: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <motion.img src={dentalMirror} alt="" className="absolute bottom-16 left-[3%] w-20 md:w-28 opacity-[0.06] pointer-events-none" animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">What I Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Comprehensive Dental Services</h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">From routine cleanings to advanced cosmetic procedures — personalized care tailored to your unique needs.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={servicesInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -8 }} className="group bg-card rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50">
                <motion.div className="w-14 h-14 rounded-xl bg-blue-light group-hover:bg-primary transition-colors duration-300 flex items-center justify-center mb-5" whileHover={{ rotate: [0, -10, 10, 0] }}>
                  <s.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <div className="text-xs text-accent font-medium mb-4">⏱ {s.duration}</div>
                <ul className="space-y-2">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-accent shrink-0" />{b}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-card relative overflow-hidden">
        <motion.img src={sparkleTooth} alt="" className="absolute top-8 left-[4%] w-20 md:w-28 opacity-[0.06] pointer-events-none" animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">My Treatment Process</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.12}>
                <motion.div whileHover={{ y: -6, scale: 1.03 }} className="relative bg-background rounded-2xl p-8 text-center border border-border/50 hover:shadow-lg transition-all">
                  <span className="text-5xl font-bold text-blue-light block mb-4">{s.step}</span>
                  <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  {i < processSteps.length - 1 && <ArrowRight className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-accent z-10" />}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Procedure / Technology */}
      <ProcedureSection />

      {/* FAQ */}
      <section className="py-24 bg-background relative overflow-hidden">
        <motion.img src={floatingTooth} alt="" className="absolute bottom-12 right-[5%] w-20 md:w-28 opacity-[0.05] pointer-events-none" animate={{ y: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left">
              <div className="sticky top-32">
                <div className="w-14 h-14 rounded-xl bg-blue-light flex items-center justify-center mb-6"><HelpCircle className="w-6 h-6 text-primary" /></div>
                <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">FAQ</p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">I believe educated patients make the best decisions about their health. Here are answers to the questions I hear most often.</p>
                <Button variant="accent" className="rounded-full px-8 group" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                  Still Have Questions?
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-2xl border border-border/50 px-6 overflow-hidden">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section id="testimonials" className="py-12 bg-card border-y border-border">
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
        <motion.img src={floatingTooth} alt="" className="absolute top-12 right-[4%] w-24 md:w-32 opacity-[0.06] pointer-events-none" animate={{ y: [0, -14, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-light text-primary text-sm font-medium mb-4"><TrendingUp className="w-4 h-4" />Patient Analytics</div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">The Patient Journey</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">From the first website visit to becoming a loyal patient — here's how our practice converts care into trust.</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-card rounded-3xl border border-border/50 p-8 md:p-12 shadow-sm">
              <div className="h-[220px] md:h-[280px]">
                <FunnelChart data={patientJourneyData} orientation="horizontal" layers={4} edges="curved" gap={6} showPercentage showValues showLabels staggerDelay={0.15} className="w-full h-full" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Satisfaction Funnel */}
      <section className="py-24 bg-card relative overflow-hidden">
        <motion.img src={sparkleTooth} alt="" className="absolute bottom-10 left-[3%] w-20 md:w-28 opacity-[0.05] pointer-events-none" animate={{ y: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Satisfaction Metrics</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Patient Satisfaction Funnel</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">We don't just treat teeth — we build lasting relationships. Our patient satisfaction data speaks for itself.</p>
              <div className="grid grid-cols-2 gap-4">
                {[{ label: "Satisfaction Rate", val: "97%" }, { label: "5-Star Reviews", val: "84%" }, { label: "Referral Rate", val: "62%" }, { label: "Return Visits", val: "95%" }].map((item) => (
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
                  <FunnelChart data={satisfactionData} orientation="vertical" layers={3} edges="curved" gap={5} showPercentage showValues showLabels staggerDelay={0.18} className="w-full h-full" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-background" ref={testimonialsRef}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Reviews</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Our Patients Say</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 40, rotateY: 10 }} animate={testimonialsInView ? { opacity: 1, y: 0, rotateY: 0 } : {}} transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }} whileHover={{ scale: 1.03, y: -6 }} className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-border/50">
                <Quote className="w-8 h-8 text-blue-light mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <motion.div key={j} initial={{ scale: 0 }} animate={testimonialsInView ? { scale: 1 } : {}} transition={{ delay: 0.3 + i * 0.08 + j * 0.06, type: "spring" }}>
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

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.1}>
              <motion.div whileHover={{ y: -4 }} className="bg-background rounded-2xl p-6 text-center border border-border/50 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-light mx-auto mb-4 flex items-center justify-center"><c.icon className="w-5 h-5 text-primary" /></div>
                <h3 className="font-semibold text-foreground mb-2">{c.title}</h3>
                {c.lines.map((line) => <p key={line} className="text-sm text-muted-foreground">{line}</p>)}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="py-24 bg-background relative overflow-hidden" ref={contactRef}>
        <motion.img src={toothShield} alt="" className="absolute top-16 right-[4%] w-24 md:w-32 opacity-[0.06] pointer-events-none" animate={{ y: [0, -14, 0], rotate: [0, 5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <motion.img src={floatingTooth} alt="" className="absolute bottom-12 left-[3%] w-20 md:w-28 opacity-[0.05] pointer-events-none" animate={{ y: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left">
              <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Appointment</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Book Your Appointment</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">Fill out the form and I'll personally get back to you within 24 hours to confirm your appointment. For emergencies, please call directly.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 bg-blue-light rounded-2xl">
                  <CalendarDays className="w-10 h-10 text-primary shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Flexible Scheduling</p>
                    <p className="text-sm text-muted-foreground">I offer early morning and Saturday appointments for your convenience.</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-border/50 h-64 bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">456 Smile Street, Suite 200</p>
                    <p className="text-xs text-muted-foreground">New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 30 }} animate={contactInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 space-y-5 sticky top-32">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" placeholder="John Doe" required /></div>
                <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="john@email.com" required /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" type="tel" placeholder="(123) 456-7890" required /></div>
                <div className="space-y-2"><Label htmlFor="date">Preferred Date</Label><Input id="date" type="date" required /></div>
              </div>
              <div className="space-y-2">
                <Label>Service</Label>
                <Select required>
                  <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cleaning">Teeth Cleaning</SelectItem>
                    <SelectItem value="whitening">Teeth Whitening</SelectItem>
                    <SelectItem value="implants">Dental Implants</SelectItem>
                    <SelectItem value="rootcanal">Root Canal</SelectItem>
                    <SelectItem value="pediatric">Pediatric Dentistry</SelectItem>
                    <SelectItem value="surgery">Oral Surgery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label htmlFor="message">Additional Notes</Label><Textarea id="message" placeholder="Any concerns or questions..." rows={3} /></div>
              <Button type="submit" variant="accent" className="w-full rounded-full" size="lg" disabled={contactLoading}>
                {contactLoading ? "Sending..." : <><span>Submit Request</span> <Send className="ml-2 w-4 h-4" /></>}
              </Button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA BAND ═══════════ */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <motion.div className="absolute inset-0 opacity-10" animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }} transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }} style={{ backgroundImage: "radial-gradient(circle, hsl(var(--accent)) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <motion.img src={sparkleTooth} alt="" className="absolute top-6 left-[6%] w-20 md:w-28 opacity-15 pointer-events-none" animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.img src={floatingTooth} alt="" className="absolute bottom-4 right-[8%] w-16 md:w-24 opacity-10 pointer-events-none" animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready for a Healthier Smile?</h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">Schedule your appointment today and take the first step towards the smile you've always wanted.</p>
            <Button variant="accent" size="lg" className="rounded-full px-10 group" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Book Appointment
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Index;
