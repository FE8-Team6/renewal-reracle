import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import { chunkArray } from '@/lib/utils/chunkArray';
import { SlCarousel, SlCarouselItem } from '@shoelace-style/shoelace/dist/react';
import { SearchBar } from '@/lib/common/SearchBar';
import KakaoAdfit320x50 from '../KakaoAdfit320x50';

type Category = {
  id: string;
  name: string;
  imageURL: string;
};

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [containerWidth, setContainerWidth] = useState('w-[25rem]');

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
        setContainerWidth('w-[25rem]');
      }
    };

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []);

  return (
    <>
      <KakaoAdfit320x50 />
      <section className="w-full h-[72vh] flex flex-col justify-center overflow-y-auto">
        <div className="mx-auto mt-1">
          <SearchBar />
        </div>
        <h2 className="ml-[5vh] mt-[2vh] text-xl font-bold text-purple">재활용품 분류</h2>
        <SlCarousel mouse-dragging className="w-full h-[28rem] mx-auto">
          {chunkedCategories.map((chunk, index) => (
            <SlCarouselItem key={index}>
              <div className={`grid grid-cols-3 gap-y-2 ${containerWidth}`}>
                {chunk.map((category) => (
                  <div key={category.id}>
                    <NavLink to={`/category/${category.id}`} className="no-underline">
                      <div className="bg-yellowLight w-3/4 h-[6rem] flex justify-center items-center rounded-lg mx-auto hover:bg-yellow cursor-pointer">
                        <img src={category.imageURL} alt={category.name} className="w-[2.5rem] h-[2.5rem]" />
                      </div>
                      <p className="text-sm font-semibold text-center ">{category.name}</p>
                    </NavLink>
                  </div>
                ))}
              </div>
            </SlCarouselItem>
          ))}
        </SlCarousel>
      </section>
    </>
  );
};

export default Category;
