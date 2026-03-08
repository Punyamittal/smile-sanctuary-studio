import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const testimonials = [
  {
    name: "Emily Johnson",
    text: "Dr. Mitchell is incredible. She made me feel so relaxed during my root canal — I barely felt a thing. My smile has never looked better!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    text: "I've been terrified of dentists my whole life, but Dr. Mitchell changed that completely. She's patient, kind, and truly skilled. Highly recommend!",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    text: "The whitening results were amazing! Dr. Mitchell took the time to explain everything and made sure I was comfortable throughout. Absolutely love my new smile!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
