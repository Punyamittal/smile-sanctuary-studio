import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import doc1 from "@/assets/doctor1.jpg";
import doc2 from "@/assets/doctor2.jpg";
import doc3 from "@/assets/doctor3.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const doctors = [
  { name: "Dr. James Carter", spec: "Orthodontist", img: doc1 },
  { name: "Dr. Sarah Mitchell", spec: "Cosmetic Dentist", img: doc2 },
  { name: "Dr. Robert Hayes", spec: "Oral Surgeon", img: doc3 },
];

const DoctorsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="doctors" className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Our Team</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Meet Our Expert Dentists</h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * i, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative overflow-hidden h-72">
                <motion.img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />
                {/* Reveal overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6 gap-3">
                  {[Facebook, Twitter, Linkedin].map((Icon, idx) => (
                    <motion.a
                      key={idx}
                      href="#"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      className="w-10 h-10 rounded-full bg-primary-foreground/90 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Icon className="w-4 h-4 text-foreground" />
                    </motion.a>
                  ))}
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-semibold text-lg text-foreground">{d.name}</h3>
                <p className="text-sm text-accent mt-1">{d.spec}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
