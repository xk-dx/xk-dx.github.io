"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ThemeToggle from "@/components/ThemeToggle";
import type { PostMeta } from "@/lib/posts";

export default function PostClient({ post }: { post: { meta: PostMeta; content: string } }) {
  const { meta, content } = post;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-[#FDF2F4] to-[#F0EDF5] dark:from-dark-bg dark:via-[#1e1e24] dark:to-[#23232a] font-['Noto_Sans_SC','Noto_Sans_JP',sans-serif] transition-colors duration-300">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="max-w-3xl mx-auto px-6 pt-8 pb-4">
          <div className="flex items-center justify-between">
            <Link href="/blog" className="text-sm font-medium tracking-[0.2em] text-[#8E9AAF] hover:text-[#CBC0D3] transition-colors">
              ← 返回
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>

      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto px-6 pb-24"
      >
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {meta.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-3 py-1.5 rounded-full bg-white/60 dark:bg-dark-card backdrop-blur-sm text-[#8E9AAF] tracking-wider">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-dark-text tracking-tight mb-4"
          >
            {meta.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex items-center gap-4 text-xs text-[#CBC0D3] tracking-wider"
          >
            <span>{meta.date}</span>
            <span className="w-px h-3 bg-[#CBC0D3]/30" />
            <span>阅读</span>
          </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-white/40 dark:bg-dark-card backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/60 dark:border-dark-border"
        >
          <MarkdownRenderer content={content} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-dark-card backdrop-blur-sm rounded-full text-xs tracking-[0.15em] text-[#8E9AAF] hover:bg-white/80 dark:hover:bg-dark-card/80 transition-all border border-white/60 dark:border-dark-border">
            ← 全部文章
          </Link>
        </motion.div>
      </motion.article>
    </div>
  );
}
