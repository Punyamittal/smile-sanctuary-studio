import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "#home" },
  { label: "About", to: "#about" },
  { label: "Services", to: "#services" },
  { label: "Testimonials", to: "#testimonials" },
  { label: "Contact", to: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = navLinks.map((l) => l.to.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((hash: string) => {
    setMobileOpen(false);
    const el = document.getElementById(hash.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <button onClick={() => scrollTo("#home")} className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-wider text-primary">
            Dr. Sarah <span className="text-accent">Mitchell</span>
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l.to}
              onClick={() => scrollTo(l.to)}
              className={`text-sm font-medium transition-colors uppercase tracking-wide ${
                activeSection === l.to
                  ? "text-accent"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <Button variant="accent" className="hidden lg:inline-flex rounded-full px-6" onClick={() => scrollTo("#contact")}>
          Book Appointment
        </Button>

        <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
              {navLinks.map((l) => (
                <button
                  key={l.to}
                  onClick={() => scrollTo(l.to)}
                  className={`text-sm font-medium transition-colors uppercase text-left ${
                    activeSection === l.to ? "text-accent" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <Button variant="accent" className="w-full rounded-full" onClick={() => scrollTo("#contact")}>
                Book Appointment
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
