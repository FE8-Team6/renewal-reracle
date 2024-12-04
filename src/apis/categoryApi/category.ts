import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export type Categories = {
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
    })) as Categories[];
    return categoriesData;
  } catch (error) {
    console.error('카테고리가 존재하지 않습니다.', error);
    throw error;
  }
};

const getCategoryItems = async (categoryId: string): Promise<Categories[]> => {
  try {
    const categoryRef = doc(db, 'WasteCategories', categoryId);
    const categorySnap = await getDoc(categoryRef);

    if (categorySnap.exists()) {
      return categorySnap.data().items as Categories[];
    } else {
      console.log('카테고리가 존재하지 않습니다.');
      return [];
    }
  } catch (error) {
    console.error('카테고리가 존재하지 않습니다.', error);
    throw error;
  }
};

export { getCategories, getCategoryItems };
