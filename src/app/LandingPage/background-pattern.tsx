"use client";

import { motion } from "framer-motion";

export const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-950">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 4,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 -z-10 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 dark:from-primary/10 dark:to-primary/5"
      />
    </div>
  );
};