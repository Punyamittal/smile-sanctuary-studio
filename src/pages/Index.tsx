import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcedureSection from "@/components/ProcedureSection";
import DoctorsSection from "@/components/DoctorsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AppointmentSection from "@/components/AppointmentSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProcedureSection />
    <DoctorsSection />
    <TestimonialsSection />
    <AppointmentSection />
    <Footer />
  </div>
);

export default Index;
