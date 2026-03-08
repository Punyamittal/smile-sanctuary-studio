import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import sparkleTooth from "@/assets/sparkle-tooth.png";

const testimonials = [
  { name: "Emily Johnson", text: "Dr. Mitchell is incredible. She made me feel so relaxed during my root canal — I barely felt a thing!", rating: 5 },
  { name: "Michael Chen", text: "I've been terrified of dentists my whole life, but Dr. Mitchell changed that completely. Highly recommend!", rating: 5 },
  { name: "Sarah Williams", text: "The whitening results were amazing! Absolutely love my new smile!", rating: 5 },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-card relative overflow-hidden" ref={ref}>
      {/* Floating sparkle tooth */}
      <motion.img
        src={sparkleTooth}
        alt=""
        className="absolute top-10 right-[4%] w-20 md:w-28 opacity-10 pointer-events-none"
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={sparkleTooth}
        alt=""
        className="absolute bottom-8 left-[5%] w-14 md:w-20 opacity-[0.06] pointer-events-none -scale-x-100"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Patient Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">What My Patients Say</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40, rotateY: 15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
            >
              <Quote className="w-8 h-8 text-blue-light mb-4" />
              <p className="text-muted-foreground leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.15 + j * 0.08, type: "spring" }}
                  >
                    <Star className="w-4 h-4 fill-accent text-accent" />
                  </motion.div>
                ))}
              </div>
              <p className="font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">Verified Patient</p>
            </motion.div>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 group">
            <Link to="/testimonials">
              Read More Reviews
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
