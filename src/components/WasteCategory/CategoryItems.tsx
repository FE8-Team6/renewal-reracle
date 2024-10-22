import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { chunkArray } from "@/lib/utils/chunkArray";
import {
  SlCarousel,
  SlCarouselItem,
} from "@shoelace-style/shoelace/dist/react";

type Category = {
  id: string;
  name: string;
  imageURL: string;
};

const CategoryItems = () => {
  const { categoryId } = useParams();
  const [categoryItems, setCategoryItems] = useState<Category[]>([]);

  const getCategoryItems = async () => {
    try {
      if (!categoryId) {
        console.log("카테고리 ID가 존재하지 않습니다.");
        return;
      }
      const categoryRef = doc(db, "WasteCategories", categoryId);
      const categorySnap = await getDoc(categoryRef);

      if (categorySnap.exists()) {
        setCategoryItems(categorySnap.data().items);
      } else {
        console.log("카테고리가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("카테고리가 존재하지 않습니다.", error);
    }
  };

  const chunkedItems = chunkArray(categoryItems, 9);

  useEffect(() => {
    getCategoryItems();
  }, [categoryId]);

  return (
    <section className="w-full h-[76vh] flex flex-col justify-center overflow-y-auto">
      <h2 className="ml-[5vh] text-xl font-bold text-purple">
        재활용품 세부 품목
      </h2>
      <SlCarousel
        pagination
        mouse-dragging
        className="w-[100%] h-[28rem] mx-auto"
      >
        {chunkedItems.map((chunk, index) => (
          <SlCarouselItem key={index}>
            <div className="grid grid-cols-3 gap-y-2 w-[23rem]">
              {chunk.map((item) => (
                <div key={item.id}>
                  <NavLink
                    to={`/category/${categoryId}/item/${item.id}`}
                    className="text-gray-800 no-underline"
                  >
                    <div className="bg-yellowLight w-3/4 h-[6rem] flex justify-center items-center rounded-lg mx-auto hover:bg-yellow cursor-pointer">
                      {item.imageURL && (
                        <img
                          src={categoryItems.imageURL}
                          alt={item.name}
                          className="w-[2.5rem] h-[2.5rem]"
                        />
                      )}
                    </div>
                    <p className="text-sm font-semibold text-center">
                      {item.name}
                    </p>
                  </NavLink>
                </div>
              ))}
            </div>
          </SlCarouselItem>
        ))}
      </SlCarousel>
    </section>
  );
};

export default CategoryItems;
