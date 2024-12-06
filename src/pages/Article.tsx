import { useState, useEffect } from 'react';
import { getArticles, Articles } from '@/apis/articleApi/article.ts';

const Article = () => {
  const [articles, setArticles] = useState<Articles>({
    id: '',
    title: '',
    content: [],
    video: '',
  });
  const articleId = '1';

  useEffect(() => {
    getArticles(articleId).then((articleItem) => {
      try {
        if (articleItem) {
          setArticles(articleItem);
        } else {
          console.error('해당 기사를 찾을 수 없습니다.');
        }
      } catch {
        console.error('Error fetching article:');
      }
    });
  }, [articleId]);

  if (!articles) {
    return <div>해당 기사를 찾을 수 없습니다.</div>;
  }

  return (
    <main className="min-h-[calc(100vh-8rem)] pb-[5rem]">
      <section>
        <h1 className="text-2xl font-bold">{articles.title}</h1>
        <div className="flex justify-center my-4">
          {articles.video && (
            <video controls width="500">
              <source src={articles.video} type="video/mp4" />
            </video>
          )}
        </div>
        {articles.content &&
          articles.content.map(
            (
              item: {
                text?: string;
                image?: string;
              },
              index: number,
            ) =>
              item.text ? (
                <p key={index} className="mb-4">
                  {item.text}
                </p>
              ) : item.image ? (
                <img
                  key={index}
                  src={item.image}
                  alt={`Article Content ${index}`}
                  className="my-4 w-full max-w-md mx-auto"
                />
              ) : null,
          )}
      </section>
    </main>
  );
};

export default Article;
