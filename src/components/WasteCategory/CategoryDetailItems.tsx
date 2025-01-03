import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { KakaoAdfit320x50 } from '../KakaoAdfit';
import { ItemsDetailsType } from '@/types/category';

export const CategoryDetailItems = () => {
  const { categoryId, itemId } = useParams();
  const [itemsDetails, setItemsDetails] = useState<ItemsDetailsType>();

  const getDetailItems = async () => {
    if (!categoryId || !itemId) {
      return <p role="alert">아이템이 없습니다.</p>;
    }

    try {
      const categoryRef = doc(db, 'WasteCategories', categoryId);
      const categorySnap = await getDoc(categoryRef);

      if (categorySnap.exists()) {
        const items = categorySnap.data().items;
        const item = items.find((item: ItemsDetailsType) => item.id === itemId);
        setItemsDetails(item);
      } else {
        console.log('카테고리가 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('getDetailItems API 에러가 발생:', error);
    }
  };

  useEffect(() => {
    getDetailItems();
  }, [categoryId, itemId]);

  return (
    <article className="flex flex-col min-h-[calc(100vh-8rem)] pb-[5rem]" aria-labelledby="item-title">
      <KakaoAdfit320x50 />
      <div className="flex flex-col items-center px-4">
        <header className="w-full mt-4">
          <h1 id="item-title" className="text-2xl font-bold text-purple" tabIndex={0}>
            {itemsDetails?.name}
          </h1>
        </header>
        {itemsDetails?.imageURL && (
          <figure
            className="flex items-center justify-center w-full h-48 my-4 rounded-lg bg-purpleLight"
            aria-label={`${itemsDetails.name} 아이콘`}
            tabIndex={0}
          >
            <img
              src={itemsDetails.imageURL}
              alt={`${itemsDetails.name} 아이콘`}
              className="max-w-[60%] max-h-[80%] object-contain"
            />
          </figure>
        )}
        <section className="w-full mt-4" aria-labelledby="recycling-instructions">
          <h2 id="recycling-instructions" className="text-xl font-bold text-purple" tabIndex={0}>
            배출방법
          </h2>
          <ul className="w-full">
            {itemsDetails?.recyclingInstructions.map((instruction, index) => (
              <li key={index} className="my-2 font-semibold select-text" tabIndex={0}>
                {instruction}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
};
