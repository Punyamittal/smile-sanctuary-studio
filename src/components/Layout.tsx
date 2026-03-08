import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import { useState } from "react";

const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

const Layout = () => {
  const location = useLocation();
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
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <Footer />
      </motion.div>
    </>
  );
};

export default Layout;
