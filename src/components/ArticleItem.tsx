import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticleById } from '@/apis/articleApi/article.ts';
import { KakaoAdfit320x100, KakaoAdfit320x50 } from '@/components/KakaoAdfit';

const ArticleItem = () => {
  const { id } = useParams<{ id: string }>();
  const [articles, setArticles] = useState({
    title: '',
    content: [{ text: '', image: '' }],
    video: '',
  });

  useEffect(() => {
    if (id) {
      getArticleById(id).then((articleItems) => {
        setArticles(articleItems);
      });
    }
  }, [id]);

  if (!articles) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-[calc(100vh-8rem)] pb-[5rem] ">
      <KakaoAdfit320x50 />
      <KakaoAdfit320x100 />
      <section className="p-8">
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
                  className="w-full max-w-md mx-auto my-4"
                />
              ) : null,
          )}
      </section>
    </main>
  );
};
export default ArticleItem;
