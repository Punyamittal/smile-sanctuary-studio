import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Emily Johnson",
    text: "The best dental experience I've ever had. The team was incredibly gentle and professional. My smile has never looked better!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    text: "I was terrified of dentists until I came here. The staff made me feel so comfortable and explained every step. Highly recommend!",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    text: "Outstanding service from start to finish. The whitening treatment exceeded my expectations. I can't stop smiling!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Our Patients Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-accent mb-4" />
              <p className="text-muted-foreground leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
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
