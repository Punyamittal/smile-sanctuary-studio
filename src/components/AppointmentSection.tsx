import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Send } from "lucide-react";
import { toast } from "sonner";

const AppointmentSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Appointment request sent! We'll contact you shortly.");
    }, 1000);
  };

  return (
    <section id="contact" className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">Book Now</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Schedule Your Appointment
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Take the first step towards a healthier, brighter smile. Fill out the form and our team will get back to you within 24 hours.
            </p>
            <div className="flex items-center gap-4 p-4 bg-accent rounded-2xl">
              <CalendarDays className="w-10 h-10 text-accent-foreground" />
              <div>
                <p className="font-semibold text-foreground">Working Hours</p>
                <p className="text-sm text-muted-foreground">Mon – Fri: 9:00 AM – 7:00 PM</p>
                <p className="text-sm text-muted-foreground">Sat: 9:00 AM – 3:00 PM</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 space-y-5"
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
            <Button type="submit" className="w-full rounded-full" size="lg" disabled={loading}>
              {loading ? "Sending..." : (
                <>Submit Request <Send className="ml-2 w-4 h-4" /></>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
