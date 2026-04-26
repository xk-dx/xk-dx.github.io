"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { HomeData } from "@/lib/home";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "作品", href: "#projects" },
  { label: "博客", href: "/blog" },
  { label: "关于", href: "#" },
];

export default function HomeClient({ data }: { data: HomeData }) {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-dark-bg font-['Noto_Sans_SC',sans-serif] transition-colors duration-300">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
      >
        <div className="flex items-center justify-between px-8 py-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm font-medium tracking-[0.2em] text-white"
          >
            XKDX
          </motion.span>
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hidden md:flex items-center gap-10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs tracking-[0.15em] text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </motion.nav>
        </div>
      </motion.header>

      <section ref={heroRef} className="relative h-screen flex items-center px-8 md:px-16 overflow-hidden bg-[#F9FAFB] dark:bg-dark-bg">
        <motion.div className="absolute inset-0" style={{ y: heroBgY }}>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-24 bottom-0 w-[55vw] h-[70vh] bg-[#EFD3D7] opacity-30"
            style={{ clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 100%)" }}
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-[20%] top-0 w-[4vw] h-full bg-[#CBC0D3] opacity-25"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute right-[8%] top-[12%] w-72 h-72 bg-[#8E9AAF] opacity-20"
          />
          <motion.div
            animate={{ rotate: [12, 20, 12] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-[15%] top-[20%] w-32 h-32 bg-[#EFD3D7] opacity-35"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
          <motion.div
            animate={{ scaleX: [1, 1.3, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute left-[10%] bottom-[20%] w-[40vw] h-1 bg-[#8E9AAF] opacity-15"
          />
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-40 -bottom-40 w-[40vw] h-[40vw] rounded-full bg-[#CBC0D3] opacity-15"
          />
        </motion.div>

        <motion.div className="relative z-10 max-w-5xl" style={{ y: heroTextY }}>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-sm tracking-[0.3em] text-[#8E9AAF] mb-6 font-medium"
          >
            {data.subtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9, ease: "easeOut" }}
            className="text-[clamp(3.5rem,14vw,9rem)] font-bold leading-[0.88] tracking-[-0.03em] text-gray-900 dark:text-dark-text"
          >
            {data.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-10 max-w-lg text-sm leading-relaxed text-gray-500 dark:text-dark-muted"
          >
            {data.bio}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-16 flex items-center gap-4"
          >
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[10px] tracking-[0.3em] text-[#CBC0D3] font-medium"
            >
              向下滚动
            </motion.span>
            <motion.div
              animate={{ scaleX: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-px bg-[#CBC0D3]"
            />
          </motion.div>
        </motion.div>
      </section>

      <section id="projects" className="px-8 md:px-16 py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 flex items-end justify-between"
          >
            <div>
              <p className="text-xs tracking-[0.3em] text-[#8E9AAF] font-medium mb-3">精选作品</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-dark-text tracking-tight">项目</h2>
            </div>
            <motion.div
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-[#CBC0D3] opacity-30"
            />
          </motion.div>

          <div className="space-y-1">
            {data.projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
                className="group relative border-t border-gray-300 dark:border-dark-border py-8 cursor-pointer last:border-b"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <motion.span
                      animate={activeProject === project.id ? { x: [0, -5, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      className="text-sm font-mono text-[#CBC0D3]"
                    >
                      {activeProject === project.id ? "▸" : project.id}
                    </motion.span>
                    <div>
                      <h3 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-dark-text group-hover:text-[#8E9AAF] transition-colors">{project.title}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#CBC0D3]">{project.category}</span>
                    <br />
                    <span className="text-xs text-[#CBC0D3]">{project.year}</span>
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 -z-10 rounded-none"
                  animate={{
                    backgroundColor: activeProject === project.id ? `${project.color}25` : "transparent",
                    scale: activeProject === project.id ? 1.01 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-8 md:px-16 py-32 overflow-hidden bg-[#F9FAFB] dark:bg-dark-bg">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-[#8E9AAF] opacity-5 rotate-3" />
          <motion.div
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[10%] top-[15%] w-24 h-24 bg-[#EFD3D7] opacity-25"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-2xl md:text-4xl font-bold leading-relaxed text-[#8E9AAF] tracking-tight"
          >
            &ldquo;{data.quote}&rdquo;
          </motion.p>
          {data.quoteAuthor && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6 text-xs tracking-[0.2em] text-[#CBC0D3] font-medium"
            >
              — {data.quoteAuthor}
            </motion.p>
          )}
        </motion.div>
      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-gray-300 dark:border-dark-border px-8 md:px-16 py-16 relative overflow-hidden"
      >
        <motion.div
          animate={{ height: ["100%", "60%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[15%] top-0 w-1 bg-[#EFD3D7] opacity-20"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] bottom-0 w-16 h-16 rounded-full bg-[#CBC0D3] opacity-15"
        />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.span
              whileHover={{ scale: 1.05, color: "#8E9AAF" }}
              className="text-lg font-bold tracking-[0.2em] text-[#CBC0D3] transition-colors"
            >
              XKDX
            </motion.span>
            <div className="flex gap-12">
              {["Email", "Instagram", "GitHub"].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  whileHover={{ y: -2, color: "#8E9AAF" }}
                  className="text-xs tracking-[0.15em] text-[#CBC0D3] transition-colors font-medium"
                >
                  {link}
                </motion.a>
              ))}
            </div>
            <p className="text-[10px] tracking-[0.2em] text-[#CBC0D3] font-medium">&copy; 2026</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
