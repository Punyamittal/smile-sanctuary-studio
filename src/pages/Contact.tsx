import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Send, MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  { icon: MapPin, title: "Location", lines: ["456 Smile Street, Suite 200", "New York, NY 10001"] },
  { icon: Phone, title: "Phone", lines: ["(123) 456-7890", "Emergency: (123) 456-7891"] },
  { icon: Mail, title: "Email", lines: ["hello@drmitchell.com", "appointments@drmitchell.com"] },
  { icon: Clock, title: "Hours", lines: ["Mon – Fri: 9AM – 6PM", "Sat: 9AM – 1PM | Sun: Closed"] },
];

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Appointment request sent! Dr. Mitchell will get back to you shortly.");
    }, 1000);
  };

  return (
    <>
      <PageHeader
        subtitle="Get In Touch"
        title="Schedule Your Visit Today"
        description="Ready for a healthier, brighter smile? Reach out and I'll personally get back to you within 24 hours."
      />

      {/* Contact info cards */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-background rounded-2xl p-6 text-center border border-border/50 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-blue-light mx-auto mb-4 flex items-center justify-center">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{c.title}</h3>
                {c.lines.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">{line}</p>
                ))}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Form section */}
      <section className="py-24 bg-background" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left">
              <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Appointment</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Book Your Appointment
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Fill out the form and I'll personally get back to you within 24 hours to confirm your appointment. For emergencies, please call directly.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 bg-blue-light rounded-2xl">
                  <CalendarDays className="w-10 h-10 text-primary shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Flexible Scheduling</p>
                    <p className="text-sm text-muted-foreground">I offer early morning and Saturday appointments for your convenience.</p>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="rounded-2xl overflow-hidden border border-border/50 h-64 bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">456 Smile Street, Suite 200</p>
                    <p className="text-xs text-muted-foreground">New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 space-y-5 sticky top-32"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@email.com" required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="(123) 456-7890" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input id="date" type="date" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Service</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
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
              <div className="space-y-2">
                <Label htmlFor="message">Additional Notes</Label>
                <Textarea id="message" placeholder="Any concerns or questions..." rows={3} />
              </div>
              <Button type="submit" variant="accent" className="w-full rounded-full" size="lg" disabled={loading}>
                {loading ? "Sending..." : (
                  <>Submit Request <Send className="ml-2 w-4 h-4" /></>
                )}
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
