import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticleById } from '@/apis/articleApi/article';
import { KakaoAdfit320x100, KakaoAdfit320x50 } from '@/components/KakaoAdfit';

const ArticleItem = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState({
    title: '',
    content: [{ text: '', image: '' }],
    video: '',
  });

  useEffect(() => {
    if (id) {
      getArticleById(id).then((articleItem) => {
        setArticle(articleItem);
      });
    }
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-[calc(100vh-8rem)] pb-[5rem]">
      <KakaoAdfit320x50 />
      <KakaoAdfit320x100 />
      <section className="p-8 bg-white shadow-md rounded-">
        <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
        <div className="flex justify-center my-4">
          {article.video && (
            <video controls width="500" className="rounded-lg shadow-md">
              <source src={article.video} type="video/mp4" />
            </video>
          )}
        </div>
        {article.content &&
          article.content.map(
            (
              item: {
                text?: string;
                image?: string;
              },
              index: number,
            ) =>
              item.text ? (
                <p key={index} className="mb-4 text-lg leading-relaxed">
                  {item.text}
                </p>
              ) : item.image ? (
                <img
                  key={index}
                  src={item.image}
                  alt={`Article Content ${index}`}
                  className="w-full max-w-md mx-auto my-4 rounded-lg shadow-md"
                />
              ) : null,
          )}
      </section>
    </main>
  );
};

export default ArticleItem;
