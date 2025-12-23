'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function PageWrapper({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // 1s loader
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-white flex items-center justify-center z-50 overflow-y-scroll"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative flex items-center justify-center">
              {/* Logo */}
              <img src="/logo.png" alt="Logo" className="w-16 h-16 z-10" />

              {/* Circular Loader around logo */}
              <div className="absolute w-24 h-24 border-2 border-[#f2801c] border-t-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.05 }} // thoda delay, smooth transition
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
