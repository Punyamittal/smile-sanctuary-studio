import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import doc1 from "@/assets/doctor1.jpg";
import doc2 from "@/assets/doctor2.jpg";
import doc3 from "@/assets/doctor3.jpg";

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">Our Team</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Meet Our Expert Dentists</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden h-72">
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
                  {[Facebook, Twitter, Linkedin].map((Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="w-9 h-9 rounded-full bg-primary-foreground/90 flex items-center justify-center hover:bg-primary transition-colors"
                    >
                      <Icon className="w-4 h-4 text-foreground hover:text-primary-foreground" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-semibold text-lg text-foreground">{d.name}</h3>
                <p className="text-sm text-primary mt-1">{d.spec}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
