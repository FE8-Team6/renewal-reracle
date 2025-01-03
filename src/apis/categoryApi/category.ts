import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export type CategoriesType = {
  id: string;
  name: string;
  imageURL: string;
};

const getCategories = async () => {
  try {
    const categoriesCollectionRef = collection(db, 'WasteCategories');
    const categoriesSnap = await getDocs(categoriesCollectionRef);

    const categoriesData = categoriesSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CategoriesType[];
    return categoriesData;
  } catch (error) {
    console.error('카테고리가 존재하지 않습니다.', error);
    throw error;
  }
};

const getCategoryItems = async (categoryId: string) => {
  try {
    const categoryRef = doc(db, 'WasteCategories', categoryId);
    const categorySnap = await getDoc(categoryRef);

    if (categorySnap.exists()) {
      return categorySnap.data().items as CategoriesType[];
    } else {
      console.log('카테고리가 존재하지 않습니다.');
    }
  } catch (error) {
    console.error('카테고리가 존재하지 않습니다.', error);
    throw error;
  }
};

export { getCategories, getCategoryItems };
