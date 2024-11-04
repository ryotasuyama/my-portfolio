interface GithubRepo {
  name: string;
  url: string;
  stack: string[];
  details: string[];
}

interface Profile {
  name: string;
  bio: string[];
  skills: string[];
  githubRepos: GithubRepo[];
}

const profile = {
  name: "うみんちゅ",
  bio: [
    'はじめまして、2003年生まれのエンジニア志望の大学生うみんちゅと申します。',
    "大学では情報工学を専攻しており、独学でlaravelやreactを学んでいます。",
    "web系の自社開発企業を志望しています。",
    "どうぞよろしくお願いします。",
  ],
  skills: ["HTML/CSS 1年半", "JavaScript 1年半", "PHP 1年半", "laravel 1年", "TypeScript 3ヶ月", "React 3ヶ月", "Next.js 3ヶ月"],
  githubRepos: [
    {
      name: "就活管理アプリ",
      url: "https://github.com/ryotasuyama/todo_laravel",
      stack: ["Laravel", "PHP", "MySQL", "JavaScript", "TailwindCSS"],
      details: [
        "このアプリでは、",
        "日々のタスク管理から、応募企業のバリデーション機能や就活スケジュールのカレンダー機能を持っています。",
      ]
    },
    {
      name: "React 学習その1",
      url: "https://github.com/ryotasuyama/react-1101",
      stack: ["react"],
      details: [
        "このアプリでは、",
        "",
      ]
    },
    {
      name: "Next.jsポートフォリオサイト",
      url: "https://github.com/ryotasuyama/my-portfolio",
      stack: ["next.js", "Typescript"],
      details: [
        "このアプリでは、",
        "日々のタスク管理から、応募企業のバリデーション機能や就活スケジュールのカレンダー機能を持っています。",
      ]
    },
  ],
};

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
        <p className="text-lg text-gray-600">web系エンジニアを目指す学生</p>
        <p className="text-lg text-gray-600">最終更新日 2024-11-04</p>

      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">自己紹介</h2>
        <p className="text-mb text-gray-700 max-w-2xl ">{profile.bio}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">経験のある言語・フレームワーク</h2>
        <ul className="flex flex-wrap gap-4">
          {profile.skills.map((skill, index) => (
            <li
              key={index}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">GitHubのリポジトリ紹介</h2>
        <ul className="space-y-4">
          {profile.githubRepos.map((repo, index) => (
            <li key={index} className="border border-gray-300 rounded p-4">
              <h3 className="text-lg font-bold mb-2">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {repo.name}
                </a>
              </h3>

              <h4 className="font-semibold">技術スタック:</h4>
              <ul className="flex flex-wrap gap-2 mb-2">
                {repo.stack.map((tech, i) => (
                  <li key={i} className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                    {tech}
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold">開発の詳細:</h4>
              <p className="text-gray-700">{repo.details}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
