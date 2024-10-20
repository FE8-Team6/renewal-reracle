import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NavLink } from "react-router-dom";
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

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    try {
      const categoriesCollectionRef = collection(db, "WasteCategories");
      const categoriesSnap = await getDocs(categoriesCollectionRef);

      const categoriesData = categoriesSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];

      setCategories(categoriesData);
    } catch (error) {
      console.error("카테고리가 존재하지 않습니다.", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const chunkedCategories = chunkArray(categories, 9);

  return (
    <section className="w-full h-[76vh] flex flex-col justify-center overflow-y-auto">
      <h2 className="ml-[5vh] text-xl font-bold text-purple">재활용품 분류</h2>
      <SlCarousel
        pagination
        mouse-dragging
        className="w-[100%] h-[28rem] mx-auto"
      >
        {chunkedCategories.map((chunk, index) => (
          <SlCarouselItem key={index}>
            <div className="grid grid-cols-3 gap-y-2 w-[23rem]">
              {chunk.map((category) => (
                <div key={category.id}>
                  <NavLink
                    to={`/category/${category.id}`}
                    className="text-gray-800 no-underline"
                  >
                    <div className="bg-yellowLight w-3/4 h-[6rem] flex justify-center items-center rounded-lg mx-auto hover:bg-yellow cursor-pointer">
                      <img
                        src={category.imageURL}
                        alt={category.name}
                        className="w-[2.5rem] h-[2.5rem]"
                      />
                    </div>
                    <p className="text-sm font-semibold text-center ">
                      {category.name}
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

export default Category;
