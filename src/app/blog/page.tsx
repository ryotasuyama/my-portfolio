"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  date: string;
  tags: ("開発" | "読書" | "勉強")[];
}

const TAGS = ["全て", "開発", "勉強", "読書"] as const;

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState<(typeof TAGS)[number]>("全て");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const POSTS_QUERY = `*[_type == "post"]|order(publishedAt desc){
        _id,
        title,
        "content": body[0].children[0].text,
        "date": publishedAt,
        tags
      }`;

      const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);
      const formattedPosts = posts.map((post) => ({
        _id: post._id,
        title: post.title,
        content: post.content,
        date: post.date,
        tags: post.tags,
      }));

      setBlogPosts(formattedPosts);
    };

    fetchPosts();
  }, []);

  const filteredBlogPosts = blogPosts
    .filter((post) =>
      selectedTag === "全て" ? true : post.tags.includes(selectedTag)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">ブログ</h1>

      <div className="mb-4 flex gap-4">
        {TAGS.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 rounded ${selectedTag === tag
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
              }`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <ul className="space-y-8">
        {filteredBlogPosts.map((post) => (
          <li key={post._id} className="border border-gray-300 rounded p-4">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{new Date(post.date).toLocaleDateString()}</p>
            <div className="flex gap-2 mb-4">
              {(Array.isArray(post.tags) ? post.tags : []).map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-700">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
