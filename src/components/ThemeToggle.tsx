"use client";

import { useTheme } from "@/app/ThemeProvider";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/60 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-all"
      aria-label="切换主题"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-sm leading-none"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </motion.span>
    </button>
  );
}
