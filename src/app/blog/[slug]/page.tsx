import Link from "next/link";
import { getPost, getAllPosts } from "@/lib/posts";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ThemeToggle from "@/components/ThemeToggle";
import PostClient from "./PostClient";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-[#FDF2F4] to-[#F0EDF5] dark:from-dark-bg dark:via-[#1e1e24] dark:to-[#23232a] flex items-center justify-center px-6 transition-colors duration-300">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">文章不存在</h1>
          <Link href="/blog" className="text-sm text-[#8E9AAF] hover:text-[#CBC0D3] transition-colors">
            ← 返回博客列表
          </Link>
        </div>
      </div>
    );
  }

  return <PostClient post={post} />;
}
