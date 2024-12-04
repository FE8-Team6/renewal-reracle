import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export type CategoryType = {
  id: string;
  name: string;
  imageURL: string;
};

export const getCategories = async () => {
  try {
    const categoriesCollectionRef = collection(db, 'WasteCategories');
    const categoriesSnap = await getDocs(categoriesCollectionRef);

    const categoriesData = categoriesSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CategoryType[];
    return categoriesData;
  } catch (error) {
    console.error('카테고리가 존재하지 않습니다.', error);
    throw error;
  }
};
