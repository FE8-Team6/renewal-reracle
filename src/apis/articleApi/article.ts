import { db } from '@/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export type Articles = {
  id: string;
  title: string;
  content: {
    text?: string;
    image?: string;
    video: string;
  }[];
  sourceLink?: string;
};

const getArticles = async (): Promise<Articles[]> => {
  const articlesRef = collection(db, 'Article');
  const articleSnap = await getDocs(articlesRef);
  return articleSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Articles[];
};

const getArticleById = async (id: string) => {
  try {
    const articleRef = doc(db, 'Article', id);
    const articleSnap = await getDoc(articleRef);

    if (articleSnap.exists()) {
      return { id: articleSnap.id, ...articleSnap.data() };
    } else {
      console.log('아티클이 존재하지 않습니다.');
    }
  } catch (error) {
    console.error('getArticleById API 에러가 발생:', error);
    throw error;
  }
};

export { getArticles, getArticleById };
