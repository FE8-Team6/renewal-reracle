import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NavLink } from "react-router-dom";

const Category = () => {
  const [categoriesArray, setCategoriesArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesCollectionRef = collection(db, "WasteCategories");
      const categoriesSnap = await getDocs(categoriesCollectionRef);

      const categoriesData = categoriesSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategoriesArray(categoriesData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <div>
        {categoriesArray.map((category) => (
          <div key={category.id}>
            <NavLink to={`/${category.id}`}>
              <h2>{category.name}</h2>
              <p>{category.id}</p>
              <p>{category.disposalMethod}</p>
              <img
                src={category.imageURL}
                alt={category.name}
                className="w-[4rem]"
              />
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
