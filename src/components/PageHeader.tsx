import { motion } from "framer-motion";

interface PageHeaderProps {
  subtitle: string;
  title: string;
  description?: string;
}

const PageHeader = ({ subtitle, title, description }: PageHeaderProps) => (
  <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
    {/* Animated circles */}
    <motion.div
      className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-primary-foreground/10"
      animate={{ scale: [1, 1.2, 1], rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full border border-primary-foreground/5"
      animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    />

    <div className="container mx-auto px-4 relative z-10">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-accent text-sm font-medium tracking-widest uppercase mb-4"
      >
        {subtitle}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground max-w-3xl"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-primary-foreground/70 text-lg mt-6 max-w-xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  </section>
);

export default PageHeader;
