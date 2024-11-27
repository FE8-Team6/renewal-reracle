import Category from '@/components/WasteCategory/Category';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col min-h-[calc(100vh-8rem)] pb-[5rem] ">
      <Category />
      <button className="bg-purple text-white p-2 w-1/2 rounded-2" onClick={() => navigate('/game')}>
        ReraclePuzzle 게임하러가기
      </button>
    </main>
  );
};
