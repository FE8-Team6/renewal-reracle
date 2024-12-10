import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Articles, getArticleById } from '@/apis/articleApi/article';
import { KakaoAdfit320x100, KakaoAdfit320x50 } from '@/components/KakaoAdfit';

const ArticleItem = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Articles>({
    id: '',
    title: '',
    content: [{ text: '', image: '' }],
    video: '',
  });

  useEffect(() => {
    if (id) {
      getArticleById(id).then((articleItem) => {
        if (
          articleItem &&
          typeof articleItem === 'object' &&
          'title' in articleItem &&
          'content' in articleItem &&
          'video' in articleItem
        ) {
          setArticle(articleItem as Articles);
        } else {
          setArticle({
            id: '',
            title: '',
            content: [{ text: '', image: '' }],
            video: '',
          });
        }
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
        <h1 className="mb-6 text-3xl font-bold">{article.title}</h1>
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
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-bold">출처</h2>
          <a href="https://mediahub.seoul.go.kr/archives/2010772" target="_blank" className="text-blue-500 underline">
            원문 보기
          </a>
        </div>
      </section>
    </main>
  );
};

export default ArticleItem;
