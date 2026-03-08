import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/ui/hover-footer";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" },
];

const services = [
  { label: "Teeth Cleaning", to: "/services" },
  { label: "Teeth Whitening", to: "/services" },
  { label: "Dental Implants", to: "/services" },
  { label: "Root Canal", to: "/services" },
  { label: "Pediatric Care", to: "/services" },
];

const contactInfo = [
  { icon: Mail, text: "hello@drmitchell.com", href: "mailto:hello@drmitchell.com" },
  { icon: Phone, text: "(123) 456-7890", href: "tel:+11234567890" },
  { icon: MapPin, text: "456 Smile Street, NYC" },
  { icon: Clock, text: "Mon–Fri: 9AM – 6PM" },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

const Footer = () => (
  <footer className="relative bg-primary text-primary-foreground pt-16 pb-0 overflow-hidden">
    <FooterBackgroundGradient />

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <Link to="/" className="inline-flex items-center gap-2 font-display text-xl font-bold tracking-wider mb-4">
            <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-accent-foreground text-sm">♥</span>
            Dr. Sarah <span className="text-accent">Mitchell</span>
          </Link>
          <p className="text-primary-foreground/60 text-sm leading-relaxed">
            Providing personalized dental care with a gentle touch. Your smile is my passion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-primary-foreground/90">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-primary-foreground/50 hover:text-accent transition-colors duration-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-4 text-primary-foreground/90">Services</h4>
          <ul className="space-y-2.5">
            {services.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="text-sm text-primary-foreground/50 hover:text-accent transition-colors duration-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4 text-primary-foreground/90">Contact Us</h4>
          <ul className="space-y-3">
            {contactInfo.map((item, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <item.icon size={16} className="text-accent shrink-0" />
                {item.href ? (
                  <a href={item.href} className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">
                    {item.text}
                  </a>
                ) : (
                  <span className="text-sm text-primary-foreground/50">{item.text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-primary-foreground/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Social icons */}
        <div className="flex gap-3">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-colors duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <p className="text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Dr. Sarah Mitchell Dental Practice. All rights reserved.
        </p>
      </div>
    </div>

    {/* Text hover effect */}
    <div className="relative z-10 h-28 md:h-36 flex items-center justify-center mt-4">
      <TextHoverEffect text="SMILE" />
    </div>
  </footer>
);

export default Footer;
