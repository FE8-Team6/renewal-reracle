import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

type CategoryItem = {
  id: string;
  name: string;
  imageURL: string;
}[];

const CategoryItems = () => {
  const { categoryId } = useParams();
  const [categoryItems, setCategoryItems] = useState<CategoryItem>([]);

  const getCategoryItems = async () => {
    try {
      if (!categoryId) {
        return <>아이템이 없습니다.</>;
      }
      const categoryRef = doc(db, "WasteCategories", categoryId);
      const categorySnap = await getDoc(categoryRef);

      if (categorySnap.exists()) {
        setCategoryItems(categorySnap.data().items);
      } else {
        console.log("카테고리가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  useEffect(() => {
    getCategoryItems();
  }, [categoryId]);

  return (
    <div>
      {categoryItems.map((item) => (
        <div key={item.id}>
          <NavLink to={`/category/${categoryId}/item/${item.id}`}>
            <h2>{item.name}</h2>
            <img
              src={item.imageURL}
              alt={item.name}
              className="w-[3rem] h-[3rem]"
            />
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default CategoryItems;