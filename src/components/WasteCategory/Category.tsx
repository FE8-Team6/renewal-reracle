import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NavLink } from "react-router-dom";

type Category = {
  id: string;
  name: string;
  imageURL: string;
}[];

const Category = () => {
  const [categories, setCategories] = useState<Category>([]);

  const fetchData = async () => {
    const categoriesCollectionRef = collection(db, "WasteCategories");
    const categoriesSnap = await getDocs(categoriesCollectionRef);

    const categoriesData = categoriesSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCategories(categoriesData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      {categories.map((category) => (
        <div key={category.id}>
          <NavLink to={`/category/${category.id}`}>
            <h2>{category.name}</h2>
            <p>{category.id}</p>
            <img
              src={category.imageURL}
              alt={category.name}
              className="w-[3rem] h-[3rem]"
            />
          </NavLink>
        </div>
      ))}
    </section>
  );
};

export default Category;
