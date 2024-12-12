import { Category } from '@/components/WasteCategory';
import { Helmet } from 'react-helmet-async';
// import { useNavigate } from 'react-router-dom';

export const Home = () => {
  // const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Recycle - 쉽게 찾는 분리수거 방법</title>
        <meta
          name="description"
          content="REracle 사용자들이 쉽고 정확하게 재활용품을 분리수거할 수 있도록 도와주는 웹 기반 서비스입니다."
        />

        <meta property="og:title" content="홈페이지 - Recycle" />
        <meta
          property="og:description"
          content="REracle 사용자들이 쉽고 정확하게 재활용품을 분리수거할 수 있도록 도와주는 웹 기반 서비스입니다."
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/reracleimage.png?alt=media&token=861a471b-ba61-4637-926a-a41fe3108f4c"
        />
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
