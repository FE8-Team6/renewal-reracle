import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { chunkArray } from '@/utils/chunkArray';
import { Carousel, CarouselContent, CarouselItem, CarouselPagination } from '@/components/ui/carousel';
import { KakaoAdfit320x100, KakaoAdfit320x50 } from '@/components/KakaoAdfit';
import { getCategoryItems, Categories } from '@/apis/categoryApi/category';

export const CategoryItems = () => {
  const { categoryId } = useParams();
  const [categoryItems, setCategoryItems] = useState<Categories[]>([]);
  const [containerWidth, setContainerWidth] = useState('w-[23rem]');

  useEffect(() => {
    if (!categoryId) {
      console.log('카테고리 ID가 존재하지 않습니다.');
      return;
    }
    getCategoryItems(categoryId).then((categoryItem) => {
      try {
        if (categoryItem) {
          setCategoryItems(categoryItem);
        } else {
          console.error('아이템을 가져오는 중 오류가 발생했습니다. categoryItem이 undefined입니다.');
        }
      } catch (error) {
        console.error('아이템을 가져오는 중 오류가 발생했습니다.', error);
      }
    });

    const updateContainerWidth = () => {
      if (window.innerWidth <= 395) {
        setContainerWidth('w-[21rem]');
      } else {
        setContainerWidth('w-[23rem]');
      }
    };

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, [categoryId]);

  const chunkedItems = chunkArray(categoryItems, 9);

  return (
    <main className="flex flex-col min-h-[calc(100vh-8rem)] pb-[5rem]">
      <KakaoAdfit320x100 />
      <section>
        <KakaoAdfit320x50 />
        <h2 className="mt-4 ml-5 text-xl font-bold text-purple">재활용품 세부 품목</h2>
        <Carousel className="h-[30rem] mt-4">
          <CarouselContent>
            {chunkedItems.map((chunk, index) => (
              <CarouselItem key={index}>
                <div className={`grid grid-cols-3 gap-4 ${containerWidth} mx-auto`}>
                  {chunk.map((item) => (
                    <div key={item.id} className="flex flex-col items-center">
                      <NavLink to={`/category/${categoryId}/item/${item.id}`} className="no-underline">
                        <div className="flex items-center justify-center w-24 h-24 rounded-lg cursor-pointer bg-yellowLight hover:bg-yellow">
                          {item.imageURL && <img src={item.imageURL} alt={item.name} className="w-12 h-12" />}
                        </div>
                        <p className="mt-2 text-sm font-semibold text-center text-gray-800">{item.name}</p>
                      </NavLink>
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPagination />
        </Carousel>
      </section>
    </main>
  );
};
