import { Category } from '@/components/WasteCategory';
import { Helmet } from 'react-helmet-async';
// import { useNavigate } from 'react-router-dom';

export const Home = () => {
  // const navigate = useNavigate();

  const siteUrl = 'https://reracle.netlify.app';

  return (
    <>
      <Helmet>
        <title>Recycle - 쉽게 찾는 분리수거 방법</title>

        {/* 기본 메타태그 */}
        <meta
          name="description"
          content="REracle 사용자들이 쉽고 정확하게 재활용품을 분리수거할 수 있도록 도와주는 웹 기반 서비스입니다."
        />
        <meta name="keywords" content="재활용,분리수거,리사이클,환경보호" />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph 메타태그 */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="Recycle - 쉽게 찾는 분리수거 방법" />
        <meta
          property="og:description"
          content="REracle 사용자들이 쉽고 정확하게 재활용품을 분리수거할 수 있도록 도와주는 웹 기반 서비스입니다."
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/reracleimage.png?alt=media&token=861a471b-ba61-4637-926a-a41fe3108f4c"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter 카드 메타태그 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Recycle - 쉽게 찾는 분리수거 방법" />
        <meta
          name="twitter:description"
          content="REracle 사용자들이 쉽고 정확하게 재활용품을 분리수거할 수 있도록 도와주는 웹 기반 서비스입니다."
        />
        <meta
          name="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/reracleimage.png?alt=media&token=861a471b-ba61-4637-926a-a41fe3108f4c"
        />

        {/* 추가 SEO 메타태그 */}
        <meta name="robots" content="index,follow" />
        <meta name="author" content="REracle" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <main className="flex flex-col min-h-[calc(100vh-8rem)] pb-[5rem] ">
        <Category />
        {/* <div className="flex items-center justify-center my-4">
          <button
            className="bg-purpleLight p-2 w-[40%] rounded-2 flex items-center justify-center gap-2"
            onClick={() => navigate('/game')}
          >
            <img src="/REracle.svg" alt="REracle 아이콘" className="w-9 h-9" />
            <span>분리수거 퍼즐 게임</span>
          </button>
        </div> */}
      </main>
    </>
  );
};
