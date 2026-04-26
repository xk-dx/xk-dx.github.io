import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import ThemeToggle from "@/components/ThemeToggle";

const petalColors = ["#EFD3D7", "#E8C4D0", "#F5DDE3", "#FFE4E9", "#EFD3D7", "#E8C4D0", "#F5DDE3", "#FFE4E9"];
const petalLeft = ["5%", "18%", "30%", "45%", "58%", "72%", "85%", "95%"];
const petalDelay = ["0s", "1s", "2.5s", "0.8s", "3.2s", "1.8s", "0.5s", "2.2s"];
const petalDuration = ["5s", "6s", "7s", "8s", "5s", "6s", "7s", "8s"];

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-[#FDF2F4] to-[#F0EDF5] dark:from-dark-bg dark:via-[#1e1e24] dark:to-[#23232a] font-['Noto_Sans_SC','Noto_Sans_JP',sans-serif] relative overflow-hidden transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none z-50">
        {petalColors.map(function (_, i) {
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: petalLeft[i],
                top: "-30px",
                animation: "petalFall " + petalDuration[i] + " " + petalDelay[i] + " linear infinite",
                zIndex: 9999,
              }}
            >
              <span className="text-xl" style={{ filter: "drop-shadow(0 0 3px " + petalColors[i] + ")" }}>🌸</span>
            </div>
          );
        })}
      </div>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#EFD3D7] opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#CBC0D3] opacity-20 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-[#8E9AAF] opacity-10 blur-3xl" />
      </div>

      <nav className="relative z-10">
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
      </nav>

      <header className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text tracking-tight">博客</h1>
        <p className="mt-3 text-sm text-gray-400 dark:text-dark-muted">记录一些想法和日常</p>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {allPosts.map(function (post) {
            return (
              <div key={post.slug}>
                <Link href={"/blog/" + post.slug}>
                  <div className="group relative bg-white/40 dark:bg-dark-card backdrop-blur-xl rounded-2xl p-7 border border-white/60 dark:border-dark-border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#EFD3D7]/20 dark:hover:shadow-[#EFD3D7]/10">
                    <div className="absolute top-0 left-6 right-6 h-1 rounded-full" style={{ backgroundColor: post.color, opacity: 0.5 }} />
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(function (tag) {
                        return <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-white/50 dark:bg-dark-card text-[#8E9AAF] tracking-wider">{tag}</span>;
                      })}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text group-hover:text-[#8E9AAF] transition-colors mb-3">{post.title}</h2>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#CBC0D3] tracking-wider">{post.date}</span>
                      <span className="text-[#CBC0D3] text-sm opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                      style={{ background: "radial-gradient(600px circle at 50% 50%, " + post.color + "15, transparent 40%)" }}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="relative z-10 border-t border-[#CBC0D3]/20 dark:border-dark-border px-6 py-12">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs tracking-[0.2em] text-[#CBC0D3]">XKDX</span>
          <span className="text-[10px] tracking-[0.2em] text-[#CBC0D3]">© 2026</span>
        </div>
      </footer>
    </div>
  );
}
