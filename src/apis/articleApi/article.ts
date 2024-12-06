import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

export type Articles = {
  id: string;
  title: string;
  content: {
    text?: string;
    image?: string;
  }[];
  video: string;
};

const getArticles = async (id: string) => {
  try {
    const articleRef = doc(db, 'Articles', id);
    const articleSnap = await getDoc(articleRef);

    if (articleSnap.exists()) {
      return articleSnap.data() as Articles;
    } else {
      console.error('문서를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('Firestore 데이터 요청 중 오류:', error);
    throw error;
  }
};

export { getArticles };
