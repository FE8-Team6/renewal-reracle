import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import KakaoAdfit320x50 from '../KakaoAdfit320x50';

type ItemsDetails = {
  id: string;
  name: string;
  imageURL: string;
  description: string;
  description2: string;
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
        const itmes = categorySnap.data().items;
        const item = itmes.find((item: ItemsDetails) => item.id === itemId);
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
    <section className="flex flex-col justify-center w-full overflow-y-auto ">
      <KakaoAdfit320x50 />
      <div className="h-[70vh] flex flex-col items-center">
        <h3 className="text-xl font-bold text-purple">{itemsDetails?.name}</h3>
        {itemsDetails?.imageURL && (
          <div className="w-[20rem] h-[12rem] bg-purpleLight rounded-lg flex justify-center items-center my-2">
            <img src={itemsDetails.imageURL} alt={itemsDetails.name} className="max-w-[40%] h-auto object-contain" />
          </div>
        )}
        <h3 className="text-xl font-bold text-purple">배출방법</h3>
        <div className="w-[20rem]">
          <p className="my-2 font-semibold">{itemsDetails?.description}</p>
          <p className="my-2 font-semibold">{itemsDetails?.description2}</p>
        </div>
      </div>
    </section>
  );
};

export default CategoryDetailItems;
