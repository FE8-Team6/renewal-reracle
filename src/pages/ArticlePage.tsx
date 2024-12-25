import { useEffect, useState } from 'react';
import { getArticles, Articles } from '@/apis/articleApi/article';
import { Link } from 'react-router-dom';
import { KakaoAdfit320x100, KakaoAdfit320x50 } from '@/components/KakaoAdfit';
import { getFirstTextContent } from '@/constant/getFirstTextContent';

const ArticlePage = () => {
  const [articles, setArticles] = useState<Articles[]>([]);

  useEffect(() => {
    getArticles().then((article) => {
      try {
        setArticles(article);
      } catch (error) {
        console.error('기사를 가져오는 중 오류가 발생했습니다.', error);
      }
    });
  }, []);

  return (
    <main className="min-h-[calc(100vh-8rem)] pb-[5rem]" aria-label="기사 페이지">
      <KakaoAdfit320x50 />
      <KakaoAdfit320x100 />
      <section className="px-8 py-4" aria-labelledby="article-title">
        <h1 id="article-title" className="mb-6 text-2xl font-bold text-purple">
          기사 목록
        </h1>
        <ul className="space-y-4" role="list" aria-label="기사 목록">
          {articles.map((article) => (
            <li key={article.id} className="p-4 transition border rounded-lg shadow hover:bg-gray-50" role="article">
              <Link to={`/article/${article.id}`} aria-label={`${article.title} 기사 읽기`}>
                <article>
                  <h2 className="mb-2 text-xl font-semibold">{article.title}</h2>
                  <p className="text-sm text-gray-600" aria-label="기사 미리보기">
                    {getFirstTextContent(article.content).slice(0, 100)}
                  </p>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ArticlePage;
