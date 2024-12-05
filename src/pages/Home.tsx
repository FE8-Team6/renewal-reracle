import { Category } from '@/components/WasteCategory';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <meta property="og:title" content="홈페이지 - Recycle" />
        <meta property="og:description" content="쉽게 찾을 수 있는 분리수거 가이드 웹/앱 서비스" />
        <meta
          property="og:image"
          content="https://commons.wikimedia.org/wiki/File:Recycle001.svg#/media/File:U+2672.svg"
        />
        <meta property="og:url" content="https://reracle.netlify.app/" />
        <meta property="og:locale" content="ko_KR" />
      </Helmet>

      <main className="flex flex-col min-h-[calc(100vh-8rem)] pb-[5rem] ">
        <Category />
        <div className="flex items-center justify-center my-4">
          <button
            className="bg-purpleLight p-2 w-[40%] rounded-2 flex items-center justify-center gap-2"
            onClick={() => navigate('/game')}
          >
            <img src="/REracle.svg" alt="REracle 아이콘" className="w-9 h-9" />
            <span>분리수거 퍼즐 게임</span>
          </button>
        </div>
      </main>
    </>
  );
};
