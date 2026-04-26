"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import type { PostMeta } from "@/lib/posts";

const petalColors = ["#EFD3D7", "#E8C4D0", "#F5DDE3", "#FFE4E9", "#EFD3D7", "#E8C4D0", "#F5DDE3", "#FFE4E9"];
const petalLeft = ["5%", "18%", "30%", "45%", "58%", "72%", "85%", "95%"];
const petalDelay = ["0s", "1s", "2.5s", "0.8s", "3.2s", "1.8s", "0.5s", "2.2s"];
const petalDuration = ["5s", "6s", "7s", "8s", "5s", "6s", "7s", "8s"];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function BlogClient({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-[#FDF2F4] to-[#F0EDF5] dark:from-dark-bg dark:via-[#1e1e24] dark:to-[#23232a] font-['Noto_Sans_SC','Noto_Sans_JP',sans-serif] relative overflow-hidden transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none z-50">
        {petalColors.map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: petalLeft[i],
              top: "-30px",
              animation: `petalFall ${petalDuration[i]} ${petalDelay[i]} linear infinite`,
              zIndex: 9999,
            }}
          >
            <span className="text-xl" style={{ filter: `drop-shadow(0 0 3px ${petalColors[i]})` }}>🌸</span>
          </div>
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#EFD3D7] opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#CBC0D3] opacity-20 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-[#8E9AAF] opacity-10 blur-3xl" />
      </div>

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm font-medium tracking-[0.2em] text-[#8E9AAF] hover:text-[#CBC0D3] transition-colors">
              ← 返回首页
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-xs tracking-[0.2em] text-[#CBC0D3]">BLOG</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text tracking-tight">博客</h1>
        <p className="mt-3 text-sm text-gray-400 dark:text-dark-muted">记录一些想法和日常</p>
      </motion.header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
            >
              <Link href={"/blog/" + post.slug}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="group relative bg-white/40 dark:bg-dark-card backdrop-blur-xl rounded-2xl p-7 border border-white/60 dark:border-dark-border transition-colors duration-500 hover:shadow-xl hover:shadow-[#EFD3D7]/20 dark:hover:shadow-[#EFD3D7]/10"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                    className="absolute top-0 left-6 h-1 rounded-full"
                    style={{ backgroundColor: post.color, opacity: 0.5 }}
                  />
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-white/50 dark:bg-dark-card text-[#8E9AAF] tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text group-hover:text-[#8E9AAF] transition-colors mb-3">{post.title}</h2>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#CBC0D3] tracking-wider">{post.date}</span>
                    <motion.span
                      initial={{ x: -5, opacity: 0 }}
                      whileHover={{ x: 3, opacity: 1 }}
                      className="text-[#CBC0D3] text-sm"
                    >
                      →
                    </motion.span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{ background: `radial-gradient(600px circle at 50% 50%, ${post.color}15, transparent 40%)` }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 border-t border-[#CBC0D3]/20 dark:border-dark-border px-6 py-12"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs tracking-[0.2em] text-[#CBC0D3]">XKDX</span>
          <span className="text-[10px] tracking-[0.2em] text-[#CBC0D3]">© 2026</span>
        </div>
      </motion.footer>
    </div>
  );
}
