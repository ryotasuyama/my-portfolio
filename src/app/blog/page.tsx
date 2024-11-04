"use client";

import { useState } from "react";

interface BlogPost {
  title: string;
  content: string[];
  date: string; // "YYYY-MM-DD"形式
  tags: ("アプリ開発" | "読書" | "勉強")[];
}

const blogPosts: BlogPost[] = [
  {
    title: "はじめてのポートフォリオサイト！！",
    content: [
        "Next.jsを用いたポートフォリオサイトの作成をはじめました!!",
        "ヘッダーのリンクからブログページに遷移する処理を作成するとき、パスの設定について理解を深めました。",
        "next.jsでのパスの指定では、/blogでは、blog.tsxを指定しているのでなく、blogディレクトリのpage.tsxを選択していることを知りました。GPTにも聞きながら、",
        "公式ドキュメントの説明は詳しくてわかりやすかったです。",
        "　　　　これからの開発でも公式ドキュメントを参考できるようにトレーニングしていきたいと思います。",
    ],
    date: "2024-11-04",
    tags: ["アプリ開発"],
  },

]

const TAGS = ["全て", "アプリ開発", "勉強", "読書"] as const;

export default function Blog() {
  // 選択中のタグを管理する状態
  const [selectedTag, setSelectedTag] = useState<(typeof TAGS)[number]>("全て");

  // 絞り込み処理
  const filteredBlogPosts = blogPosts
    .filter((post) =>
      selectedTag === "全て" ? true : post.tags.includes(selectedTag)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">ブログ</h1>

      {/* タグのフィルタリングメニュー */}
      <div className="mb-4 flex gap-4">
        {TAGS.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 rounded ${
              selectedTag === tag
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 絞り込み後のブログ記事表示 */}
      <ul className="space-y-8">
        {filteredBlogPosts.map((post, index) => (
          <li key={index} className="border border-gray-300 rounded p-4">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{post.date}</p>
            <div className="flex gap-2 mb-4">
              {post.tags.map((tag, i) => (
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
