import { KakaoAdfit320x100, KakaoAdfit320x50 } from '@/components/KakaoAdfit';

const Article = () => {
  return (
    <main className="min-h-[calc(100vh-8rem)] pb-[5rem] ">
      <KakaoAdfit320x50 />
      <KakaoAdfit320x100 />
      <section>
        <p>article</p>
      </section>
    </main>
  );
};

export default Article;
