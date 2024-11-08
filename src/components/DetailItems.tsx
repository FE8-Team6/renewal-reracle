import { useNavigate, useParams } from 'react-router-dom';
import { GoChevronLeft } from 'react-icons/go';
import { wasteCategories } from '@/lib/constants/wasteCategories';
import { Layout } from './layout/Layout';
import { wasteCategoryItemsImages } from '@/lib/constants/wasteCategoryItemsImages';

const DetailItems = () => {
  const navigate = useNavigate();
  const { categoryId, itemId } = useParams<{
    categoryId: string;
    itemId: string;
  }>();
  const category = wasteCategories.find((category) => category.id === categoryId);

  if (!category) {
    return <div>카테고리를 찾을 수 없습니다.</div>;
  }

  const item = category.items && category.items.find((item) => item.id === itemId);
  if (!item) {
    return <div>아이템을 찾을 수 없다.</div>;
  }

  const handleGoBack = () => {
    if (category) {
      navigate(`/${category.id}`);
    }
  };

  return (
    <Layout>
      <div className="w-[56.3vh] h-[13.95vh] fixed bottom-0">
        <button
          onClick={handleGoBack}
          className="absolute mt-[2.4vh] ml-[0.3vh] h-[5.5vh] w-[5.5vh] bg-transparent border-none flex justify-center items-center text-[5.5vh] cursor-pointer">
          <GoChevronLeft />
        </button>
        <div className="w-[46vh] h-px my-[3vh] bg-purple mx-auto" />
        <span className="text-[2.3vh] font-bold text-purple mt-[0.6vh] ml-[5vh]">{item.name}</span>
        {item.img && (
          <div className="w-[46vh] h-[23vh] bg-purpleLight rounded-lg flex justify-center items-center my-[3vh] mx-auto">
            <img
              src={wasteCategoryItemsImages[item.img]}
              alt={item.name}
              className="max-w-[40%] h-auto object-contain"
            />
          </div>
        )}
        <div className="w-[46vh] h-px my-[3vh] bg-purple mx-auto" />
        <span className="text-[2.3vh] font-bold text-purple mt-[0.6vh] ml-[5vh]">배출방법</span>
        <p className="w-[46vh] my-[3vh] leading-[3.2vh] text-[2.2vh] font-regular mx-auto">{item.disposalMethod}</p>
      </div>
    </Layout>
  );
};

export default DetailItems;
