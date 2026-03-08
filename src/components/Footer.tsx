import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const quickLinks = ["Home", "About", "Services", "Doctors", "Testimonials", "Contact"];

const Footer = () => (
  <footer className="bg-primary text-primary-foreground pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <span className="font-display text-xl font-bold uppercase tracking-wider mb-4 block">
            Denta <span className="text-accent">Care</span>
          </span>
          <p className="text-primary-foreground/60 text-sm leading-relaxed">
            Providing exceptional dental care with a personal touch since 2010.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/60">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              123 Dental Avenue, Suite 100, New York, NY 10001
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent shrink-0" />
              (123) 456-7890
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent shrink-0" />
              hello@dentacare.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-6 text-center">
        <p className="text-sm text-primary-foreground/40">© 2026 Denta Care. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
