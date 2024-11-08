import { wasteCategories } from '@/lib/constants/wasteCategories';
import { wasteCategoryItemsImages } from '@/lib/constants/wasteCategoryItemsImages';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { chunkArray } from '@/lib/utils/chunkArray';
import { SlCarousel, SlCarouselItem } from '@shoelace-style/shoelace/dist/react';
import { NavLink } from 'react-router-dom';

const WasteCategoryItems = () => {
  const { categoryId } = useParams();
  const category = wasteCategories.find((category) => category.id === categoryId);

  if (!category || !category.items) {
    return <div>카테고리를 찾을 수 없습니다.</div>;
  }

  const chunkedItems = chunkArray(category.items, 9);

  return (
    <Layout>
      <div className="w-[56.3vh] h-[79.7vh] flex flex-col justify-center overflow-y-auto">
        <div className="w-[46vh] h-px my-[3vh] bg-purple mx-auto" />
        <span className="text-[2.3vh] font-bold text-purple mt-[0.6vh] ml-[5vh]">재활용품 세부 품목</span>
        <SlCarousel pagination mouse-dragging className="w-[46vh] h-[60vh] mx-auto">
          {chunkedItems.map((chunk) => (
            <SlCarouselItem key={chunk[0].id} className="mb-[1vh]">
              <div className="grid grid-cols-3 gap-y-[1.5vh] w-[45vh] mt-[2vh]">
                {chunk.map((item) => (
                  <div key={item.id}>
                    <NavLink to={`/${categoryId}/${item.id}`} className="text-gray-800 no-underline">
                      <div className="bg-yellowLight w-[11vh] h-[11vh] flex justify-center items-center rounded-[1.2vh] mx-auto cursor-pointer hover:bg-yellow">
                        {item.img && (
                          <img
                            src={wasteCategoryItemsImages[item.img]}
                            alt={item.name}
                            className="flex justify-center max-w-[60%] h-auto"
                          />
                        )}
                      </div>
                      <div className="mt-[0.7vh] text-[2vh] font-medium flex justify-center">{item.name}</div>
                    </NavLink>
                  </div>
                ))}
              </div>
            </SlCarouselItem>
          ))}
        </SlCarousel>
      </div>
    </Layout>
  );
};

export default WasteCategoryItems;
