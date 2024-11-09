import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import KakaoAdfit320x50 from '../KakaoAdfit320x50';

type ItemsDetails = {
  id: string;
  name: string;
  imageURL: string;
  recyclingInstructions: string[];
};

const CategoryDetailItems = () => {
  const { categoryId, itemId } = useParams();
  const [itemsDetails, setItemsDetails] = useState<ItemsDetails>();

  const getDetailItems = async () => {
    if (!categoryId || !itemId) {
      return <>아이템이 없습니다.</>;
    }

    try {
      const categoryRef = doc(db, 'WasteCategories', categoryId);
      const categorySnap = await getDoc(categoryRef);

      if (categorySnap.exists()) {
        const items = categorySnap.data().items;
        const item = items.find((item: ItemsDetails) => item.id === itemId);
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
    <section className="flex flex-col h-full">
      <div className="flex-grow pb-32 overflow-y-auto">
        <KakaoAdfit320x50 />
        <div className="flex flex-col items-center px-4">
          <h3 className="w-full mt-4 text-xl font-bold text-purple">{itemsDetails?.name}</h3>
          {itemsDetails?.imageURL && (
            <div className="flex items-center justify-center w-full h-48 my-4 rounded-lg bg-purpleLight">
              <img
                src={itemsDetails.imageURL}
                alt={itemsDetails.name}
                className="max-w-[60%] max-h-[80%] object-contain"
              />
            </div>
          )}
          <h3 className="w-full mt-4 text-xl font-bold text-purple">배출방법</h3>
          <div className="w-full">
            {itemsDetails?.recyclingInstructions.map((instruction, index) => (
              <span key={index} className="my-2 font-semibold">
                {instruction}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryDetailItems;
