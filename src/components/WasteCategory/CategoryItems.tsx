import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { chunkArray } from '@/lib/utils/chunkArray';
import KakaoAdfit320x50 from '../KakaoAdfit320x50';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import KakaoAdfit320x100 from '../KakaoAdfit320x100';

type Category = {
  id: string;
  name: string;
  imageURL: string;
};

const CategoryItems = () => {
  const { categoryId } = useParams();
  const [categoryItems, setCategoryItems] = useState<Category[]>([]);
  const [containerWidth, setContainerWidth] = useState('w-[23rem]');

  const getCategoryItems = async () => {
    try {
      if (!categoryId) {
        console.log('카테고리 ID가 존재하지 않습니다.');
        return;
      }
      const categoryRef = doc(db, 'WasteCategories', categoryId);
      const categorySnap = await getDoc(categoryRef);

      if (categorySnap.exists()) {
        setCategoryItems(categorySnap.data().items);
      } else {
        console.log('카테고리가 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('카테고리가 존재하지 않습니다.', error);
    }
  };

  const chunkedItems = chunkArray(categoryItems, 9);

  useEffect(() => {
    getCategoryItems();

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

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <KakaoAdfit320x100 />
      <main className="flex-grow overflow-y-auto">
        <KakaoAdfit320x50 />
        <header className="mt-2 ml-5">
          <h2 className="text-xl font-bold text-purple">재활용품 세부 품목</h2>
        </header>
        <section className="w-full h-full mt-4">
          <Carousel>
            <CarouselContent>
              {chunkedItems.map((chunk, index) => (
                <CarouselItem key={index}>
                  <div className={`grid grid-cols-3 gap-4 ${containerWidth} mx-auto`}>
                    {chunk.map((item) => (
                      <article key={item.id} className="flex flex-col items-center">
                        <NavLink to={`/category/${categoryId}/item/${item.id}`} className="no-underline">
                          <div className="flex items-center justify-center w-24 h-24 rounded-lg cursor-pointer bg-yellowLight hover:bg-yellow">
                            {item.imageURL && <img src={item.imageURL} alt={item.name} className="w-12 h-12" />}
                          </div>
                          <p className="mt-2 text-sm font-semibold text-center text-gray-800">{item.name}</p>
                        </NavLink>
                      </article>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </main>
    </div>
  );
};

export default CategoryItems;
