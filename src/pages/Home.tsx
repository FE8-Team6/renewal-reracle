import Category from '@/components/WasteCategory/Category';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col min-h-[calc(100vh-8rem)] pb-[5rem] ">
      <Category />
      <div className="my-4 flex items-center justify-center">
        <button
          className="bg-purpleLight p-2 w-[40%] rounded-2 flex items-center justify-center gap-2"
          onClick={() => navigate('/game')}
        >
          <img src="/REracle.svg" alt="REracle 아이콘" className="w-9 h-9" />
          <span>분리수거 퍼즐 게임</span>
        </button>
      </div>
    </main>
  );
};
