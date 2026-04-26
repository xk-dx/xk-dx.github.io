import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  color: string;
  shape: string;
}

export interface HomeData {
  title: string;
  subtitle: string;
  bio: string;
  quote: string;
  quoteAuthor: string;
  projects: Project[];
}

export function getHomeData(): HomeData {
  const source = fs.readFileSync(
    path.join(process.cwd(), "content/pages/index.md"),
    "utf8"
  );
  const { data } = matter(source);
  return {
    title: data.title || "静寂与流动",
    subtitle: data.subtitle || "作品集 · 2026",
    bio: data.bio || "",
    quote: data.quote || "静寂之中，自有答案",
    quoteAuthor: data.quoteAuthor || "",
    projects: data.projects || [],
  };
}
