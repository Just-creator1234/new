"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText =
    "Your premier destination for African entertainment news, celebrity updates, and showbiz stories from across the continent.";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30); // Adjust typing speed here

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <motion.div
        className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg flex flex-col items-center max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          {/* Logo with fade-in animation */}
          <motion.img
            src="/logo.png"
            alt="AfricShowbizz Logo"
            width={60}
            height={60}
            className="object-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2,
            }}
            whileHover={{ scale: 1.05 }}
          />

          <motion.h2
            className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent ml-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            AfricShowbizz
          </motion.h2>
        </div>

        {/* Typewriter effect for description */}
        <motion.p
          className="text-sm text-gray-600 leading-relaxed text-center min-h-[60px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {displayText}
          <motion.span
            className="inline-block w-1 h-4 bg-orange-500 ml-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.p>

        {/* Optional loading spinner */}
        <motion.div
          className="mt-4 w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
