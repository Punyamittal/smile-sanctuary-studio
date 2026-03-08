import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import { useState, type ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-background flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </motion.div>
    </>
  );
};

export default Layout;
