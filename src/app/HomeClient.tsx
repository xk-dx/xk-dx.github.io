"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { HomeData } from "@/lib/home";

const navLinks = [
  { label: "作品", href: "#projects" },
  { label: "博客", href: "/blog" },
  { label: "关于", href: "#" },
];

export default function HomeClient({ data }: { data: HomeData }) {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-['Noto_Sans_SC',sans-serif]">
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-8 py-6">
          <span className="text-sm font-medium tracking-[0.2em] text-white">XKDX</span>
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs tracking-[0.15em] text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <section className="relative h-screen flex items-center px-8 md:px-16 overflow-hidden bg-[#F9FAFB]">
        <div className="absolute inset-0">
          <div className="absolute -left-24 bottom-0 w-[55vw] h-[70vh] bg-[#EFD3D7] opacity-30" style={{ clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 100%)" }} />
          <div className="absolute right-[20%] top-0 w-[4vw] h-full bg-[#CBC0D3] opacity-25" />
          <div className="absolute right-[8%] top-[12%] w-72 h-72 bg-[#8E9AAF] opacity-20" />
          <div className="absolute right-[15%] top-[20%] w-32 h-32 bg-[#EFD3D7] opacity-35 rotate-12" />
          <div className="absolute left-[10%] bottom-[20%] w-[40vw] h-1 bg-[#8E9AAF] opacity-15" />
          <div className="absolute -right-40 -bottom-40 w-[40vw] h-[40vw] rounded-full bg-[#CBC0D3] opacity-15" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <p className="text-sm tracking-[0.3em] text-[#8E9AAF] mb-6 font-medium">{data.subtitle}</p>
          <h1 className="text-[clamp(3.5rem,14vw,9rem)] font-bold leading-[0.88] tracking-[-0.03em] text-gray-900">{data.title}</h1>
          <p className="mt-10 max-w-lg text-sm leading-relaxed text-gray-500">{data.bio}</p>
          <div className="mt-16 flex items-center gap-4">
            <span className="text-[10px] tracking-[0.3em] text-[#CBC0D3] font-medium">向下滚动</span>
            <div className="w-12 h-px bg-[#CBC0D3]" />
          </div>
        </div>
      </section>

      <section className="px-8 md:px-16 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.3em] text-[#8E9AAF] font-medium mb-3">精选作品</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">项目</h2>
            </div>
            <div className="w-10 h-10 bg-[#CBC0D3] opacity-30" />
          </div>

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
                className="group relative border-t border-gray-300 py-8 cursor-pointer last:border-b"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <span className="text-sm font-mono text-[#CBC0D3]">{project.id}</span>
                    <div>
                      <h3 className="text-xl md:text-3xl font-bold text-gray-900 group-hover:text-[#8E9AAF] transition-colors">{project.title}</h3>
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

      <section className="relative px-8 md:px-16 py-32 overflow-hidden bg-[#F9FAFB]">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-[#8E9AAF] opacity-5 rotate-3" />
          <div className="absolute right-[10%] top-[15%] w-24 h-24 bg-[#EFD3D7] opacity-25" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-4xl font-bold leading-relaxed text-[#8E9AAF] tracking-tight">
            &ldquo;{data.quote}&rdquo;
          </p>
          {data.quoteAuthor && (
            <p className="mt-6 text-xs tracking-[0.2em] text-[#CBC0D3] font-medium">— {data.quoteAuthor}</p>
          )}
        </div>
      </section>

      <footer className="border-t border-gray-300 px-8 md:px-16 py-16 relative overflow-hidden">
        <div className="absolute right-[15%] top-0 w-1 h-full bg-[#EFD3D7] opacity-20" />
        <div className="absolute left-[8%] bottom-0 w-16 h-16 rounded-full bg-[#CBC0D3] opacity-15" />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <span className="text-lg font-bold tracking-[0.2em] text-[#CBC0D3]">XKDX</span>
            <div className="flex gap-12">
              {["Email", "Instagram", "GitHub"].map((link) => (
                <a key={link} href="#" className="text-xs tracking-[0.15em] text-[#CBC0D3] hover:text-[#8E9AAF] transition-colors font-medium">{link}</a>
              ))}
            </div>
            <p className="text-[10px] tracking-[0.2em] text-[#CBC0D3] font-medium">&copy; 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
