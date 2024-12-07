import { useEffect, useState } from 'react';
import { getArticles, Articles } from '@/apis/articleApi/article';
import { Link } from 'react-router-dom';
import { KakaoAdfit320x100, KakaoAdfit320x50 } from '@/components/KakaoAdfit';

const ArticleList = () => {
  const [articles, setArticles] = useState<Articles[]>([]);

  useEffect(() => {
    getArticles().then((data) => setArticles(data));
  }, []);

  return (
    <main className="min-h-[calc(100vh-8rem)] pb-[5rem]">
      <KakaoAdfit320x50 />
      <KakaoAdfit320x100 />
      <h1 className="text-2xl font-bold">기사 목록</h1>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.id} className="border p-4 rounded-lg shadow">
            <Link to={`/articles/${article.id}`}>
              <h2 className="text-xl font-semibold">{article.title}</h2>
              {/*<p className="text-sm text-gray-600">*/}
              {/*  {article.content[0]?.text.slice(0, 100) || '요약 내용 없음...'}*/}
              {/*</p>*/}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ArticleList;
