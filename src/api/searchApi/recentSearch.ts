import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase";

import {} from "firebase/firestore";

/**
 * @description Firestore에 검색 기록 저장
 */
const postSearchHistory = async (
  userId: string,
  query: string,
  categoryId: string,
  itemId: string
) => {
  try {
    await addDoc(collection(db, "SearchHistory"), {
      userId,
      query,
      categoryId,
      itemId,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("검색 기록 저장 실패:", error);
  }
};

/**
 * @description Firestore에서 최근 검색 기록 가져오기
 * @param userId
 */
const getRecentSearchHistory = async (userId: string) => {
  try {
    const searchHistoryQuery = query(
      collection(db, "SearchHistory"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc"),
      limit(8)
    );
    const querySnapshot = await getDocs(searchHistoryQuery);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("최근 검색 기록 가져오기 실패:", error);
    return [];
  }
};

export { getRecentSearchHistory, postSearchHistory };
