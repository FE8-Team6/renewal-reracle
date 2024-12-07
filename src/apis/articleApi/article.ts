import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export type Articles = {
  id: string;
  title: string;
  content: {
    text?: string;
    image?: string;
  }[];
  video: string;
};

const getArticles = async (): Promise<Articles[]> => {
  const articlesRef = collection(db, 'Article');
  const articleSnap = await getDocs(articlesRef);
  return articleSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Articles[];
};

export { getArticles };
