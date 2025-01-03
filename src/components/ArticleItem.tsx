import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArticlesType, getArticleById } from '@/apis/articleApi/article';
import { KakaoAdfit320x100, KakaoAdfit320x50 } from '@/components/KakaoAdfit';

const ArticleItem = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticlesType>({
    id: '',
    title: '',
    content: [{ id: '', text: '', image: '', video: '' }],
    sourceLink: '',
  });

  useEffect(() => {
    if (id) {
      getArticleById(id).then((articleItem) => {
        if (articleItem && typeof articleItem === 'object' && 'title' in articleItem && 'content' in articleItem) {
          setArticle(articleItem as ArticlesType);
        } else {
          setArticle({
            id: '',
            title: '',
            content: [{ id: '', text: '', image: '', video: '' }],
            sourceLink: '',
          });
        }
      });
    }
  }, [id]);

  if (!article) {
    return <div>로딩 중...</div>;
  }

  return (
    <main className="min-h-[calc(100vh-8rem)] pb-[5rem]">
      <KakaoAdfit320x50 />
      <KakaoAdfit320x100 />
      <section className="p-8 bg-white shadow-md" aria-label="기사">
        <h1 tabIndex={0} aria-label={`기사 제목: ${article.title}`} className="mb-6 text-3xl font-bold text-purple">
          {article.title}
        </h1>
        {article.content.map((item) =>
          item.text ? (
            <p
              key={item.id}
              className="mb-4 text-lg select-text"
              tabIndex={0}
              role="article"
              aria-label={`기사 내용: ${item.text}`}
            >
              {item.text}
            </p>
          ) : item.image ? (
            <img
              key={item.id}
              tabIndex={0}
              src={item.image}
              role="article"
              alt={`${article.title}에 대한 이미지`}
              className="w-full max-w-md mx-auto my-4 rounded-lg shadow-md"
            />
          ) : item.video ? (
            <div className="flex justify-center my-4" key={item.id}>
              <video controls width="500" className="rounded-lg shadow-md" aria-label={`${article.title} 관련 영상`}>
                <source src={item.video} type="video/mp4" />
                <track kind="captions" src="" label="한국어" srcLang="ko" default />이 브라우저는 비디오 태그를 지원하지
                않습니다.
              </video>
            </div>
          ) : null,
        )}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md" aria-label={`${article.title} 출처`} tabIndex={0}>
          <h2 className="mb-4 text-xl font-bold">출처</h2>
          <a
            href={article.sourceLink}
            target="_blank"
            className="text-blue-500 underline"
            aria-label={`${article.title} 원문 보기 (새 창에서 열림)`}
          >
            원문 보기
          </a>
        </div>
      </section>
    </main>
  );
};

export default ArticleItem;
