import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import { chunkArray } from '@/lib/utils/chunkArray';
import { SearchBar } from '@/lib/common/SearchBar';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import KakaoAdfit320x50 from '@/components/KakaoAdfit320x50.tsx';

type Category = {
  id: string;
  name: string;
  imageURL: string;
};

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [containerWidth, setContainerWidth] = useState('w-[23rem]');

  const chunkedCategories = chunkArray(categories, 9);

  const getCategories = async () => {
    try {
      const categoriesCollectionRef = collection(db, 'WasteCategories');
      const categoriesSnap = await getDocs(categoriesCollectionRef);

      const categoriesData = categoriesSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];

      setCategories(categoriesData);
    } catch (error) {
      console.error('카테고리가 존재하지 않습니다.', error);
    }
  };

  useEffect(() => {
    getCategories();

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
    <main className="flex flex-col h-[calc(100vh-8rem)]">
      <section className="flex-grow overflow-y-auto">
        <KakaoAdfit320x50 />
        <div className="flex justify-center w-full mx-auto mt-2 mb-6">
          <SearchBar className="mx-auto" />
        </div>
        <h2 className="mt-4 ml-5 text-xl font-bold text-purple">재활용품 분류</h2>
        <Carousel className="w-full h-full mt-4">
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
        </Carousel>
      </section>
    </main>
  );
};

export default Category;
