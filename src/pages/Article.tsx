import { useEffect, useState } from 'react';
import { getArticles, Articles } from '@/apis/articleApi/article';
import { Link } from 'react-router-dom';
import { KakaoAdfit320x100, KakaoAdfit320x50 } from '@/components/KakaoAdfit';

const Article = () => {
  const [articles, setArticles] = useState<Articles[]>([]);

  useEffect(() => {
    getArticles().then((article) => setArticles(article));
  }, []);

  return (
    <main className="min-h-[calc(100vh-8rem)] pb-[5rem] ">
      <KakaoAdfit320x50 />
      <KakaoAdfit320x100 />
      <div className="px-8 py-4">
        <h1 className="mb-6 text-2xl font-bold text-purple">기사 목록</h1>
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.id} className="p-4 transition border rounded-lg shadow hover:bg-gray-50">
              <Link to={`/article/${article.id}`}>
                <h2 className="mb-2 text-xl font-semibold">{article.title}</h2>
                <p className="text-sm text-gray-600">
                  {(article.content[0].text && article.content[0]?.text.slice(0, 100)) || '요약 내용 없음...'}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Article;
