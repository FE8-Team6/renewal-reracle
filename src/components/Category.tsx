import { useEffect, useState } from "react";
import { db } from "@/firebase"; // Firebase 설정 파일
import { collection, getDocs } from "firebase/firestore";
import { NavLink } from "react-router-dom";

const Category = () => {
  const [categoriesArray, setCategoriesArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Firestore에서 카테고리 문서 가져오기
      const categoriesCollectionRef = collection(db, "WasteCategories");
      const categoriesSnap = await getDocs(categoriesCollectionRef);

      const categoriesData = categoriesSnap.docs.map((doc) => ({
        id: doc.id, // 문서의 ID도 함께 저장
        ...doc.data(), // 문서의 데이터
      }));

      setCategoriesArray(categoriesData); // 상태에 저장
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <div>
        {categoriesArray.map((item) => (
          <div key={item.id}>
            <NavLink to={`/${item.id}`}>
              <h2>{item.name}</h2>
              <p>{item.id}</p>
              <p>{item.disposalMethod}</p>
              <img src={item.imageURL} alt={item.name} className="w-[4rem]" />
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
