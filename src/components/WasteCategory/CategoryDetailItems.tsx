import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ItemsDetails = {
  id: string;
  name: string;
  imageURL: string;
  description: string;
};

const CategoryDetailItems = () => {
  const { categoryId, itemId } = useParams();
  const [itemsDetails, setItemsDetails] = useState<ItemsDetails>();

  const getDetailItems = async () => {
    if (!categoryId || !itemId) {
      return <>아이템이 없습니다.</>;
    }

    try {
      const categoryRef = doc(db, "WasteCategories", categoryId);
      const categorySnap = await getDoc(categoryRef);

      if (categorySnap.exists()) {
        const itmes = categorySnap.data().items;
        const item = itmes.find((item: ItemsDetails) => item.id === itemId);
        setItemsDetails(item);
      } else {
        console.log("카테고리가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("getDetailItems API 에러가 발생:", error);
    }
  };

  useEffect(() => {
    getDetailItems();
  }, [categoryId, itemId]);

  return (
    <div className="fixed w-full h-auto top-20">
      <h3 className="text-xl font-bold text-purple ml-[6vh]">
        {itemsDetails?.name}
      </h3>
      {itemsDetails?.imageURL && (
        <div className="w-[20rem] h-[12rem] bg-purpleLight rounded-lg flex justify-center items-center my-4 mx-auto">
          <img
            src={itemsDetails.imageURL}
            alt={itemsDetails.name}
            className="max-w-[40%] h-auto object-contain"
          />
        </div>
      )}
      <h3 className="text-xl font-bold text-purple ml-[6vh]">배출방법</h3>
      <p className="w-[20rem] mx-auto my-4 font-semibold ml-[6vh]">
        {itemsDetails?.description}
      </p>
    </div>
  );
};

export default CategoryDetailItems;
