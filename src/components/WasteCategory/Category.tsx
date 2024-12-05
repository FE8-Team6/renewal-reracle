import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { chunkArray } from '@/utils/chunkArray';
import { SearchBar } from '@/lib/common/SearchBar';
import { Carousel, CarouselContent, CarouselItem, CarouselPagination } from '@/components/ui/carousel';
import { KakaoAdfit320x50 } from '@/components/KakaoAdfit';
import { Categories } from '@/apis/categoryApi/category';
import { getCategories } from '@/apis/categoryApi/category';

export const Category = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [containerWidth, setContainerWidth] = useState<string>('w-[23rem]');

  const chunkedCategories = chunkArray(categories, 9);

  useEffect(() => {
    getCategories().then((categoryItem) => {
      try {
        setCategories(categoryItem);
      } catch (error) {
        console.error('카테고리를 가져오는 중 오류가 발생했습니다.', error);
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
  }, []);

  return (
    <section>
      <KakaoAdfit320x50 />
      <div className="flex justify-center w-full mx-auto mt-2 mb-6">
        <SearchBar className="mx-auto" />
      </div>
      <h2 className="mt-4 ml-10 text-xl font-bold text-purple">재활용품 분류</h2>
      <Carousel className="h-[30rem] mt-4">
        <CarouselContent>
          {chunkedCategories.map((chunk, index) => (
            <CarouselItem key={index}>
              <div className={`grid grid-cols-3 gap-4 ${containerWidth} mx-auto`}>
                {chunk.map((category) => (
                  <div key={category.id} className="flex flex-col items-center">
                    <NavLink to={`/category/${category.id}`} className="no-underline">
                      <div className="flex items-center justify-center w-24 h-24 rounded-lg cursor-pointer bg-yellowLight hover:bg-yellow">
                        <img src={category.imageURL} alt={category.name} className="w-12 h-12" />
                      </div>
                      <p className="mt-2 text-sm font-semibold text-center">{category.name}</p>
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
  );
};
