import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryDetailItems = () => {
  const { categoryId, itemId } = useParams();
  const [itemsDetails, setItemsDetails] = useState();

  const getDetailItems = async () => {
    try {
      if (!categoryId || !itemId) {
        return <>아이템이 없습니다.</>;
      }
      const categoryRef = doc(db, "WasteCategories", categoryId);
      const categorySnap = await getDoc(categoryRef);

      if (categorySnap.exists()) {
        const itmes = categorySnap.data().items;
        const item = itmes.find((item) => item.id === itemId);
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
    <div>
      <h1>{itemsDetails?.name}</h1>
      <img
        src={itemsDetails?.imageURL}
        alt={itemsDetails?.name}
        className="w-[10rem] h-[10rem]"
      />
      <p>{itemsDetails?.description}</p>
    </div>
  );
};

export default CategoryDetailItems;
