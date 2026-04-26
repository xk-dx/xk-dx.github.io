import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  color: string;
}

const tagColors: Record<string, string> = {
  随笔: "#EFD3D7",
  日常: "#EFD3D7",
  设计: "#CBC0D3",
  思考: "#CBC0D3",
  代码: "#8E9AAF",
  创意: "#8E9AAF",
  摄影: "#EFD3D7",
  旅行: "#EFD3D7",
  生活: "#CBC0D3",
};

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(".md", "");
    const source = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data } = matter(source);
    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      tags: data.tags || [],
      color: data.tags?.[0] ? tagColors[data.tags[0]] || "#CBC0D3" : "#CBC0D3",
    };
  });
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPost(slug: string): { meta: PostMeta; content: string } | null {
  try {
    const source = fs.readFileSync(path.join(postsDir, `${slug}.md`), "utf8");
    const { data, content } = matter(source);
    return {
      meta: {
        slug,
        title: data.title || slug,
        date: data.date || "",
        tags: data.tags || [],
        color: data.tags?.[0] ? tagColors[data.tags[0]] || "#CBC0D3" : "#CBC0D3",
      },
      content,
    };
  } catch {
    return null;
  }
}
