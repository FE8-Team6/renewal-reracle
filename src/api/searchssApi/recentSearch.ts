import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { RecentSearchHistory } from "@/lib/types/search";

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
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as RecentSearchHistory;
  } catch (error) {
    console.error("최근 검색 기록 가져오기 실패:", error);
    return [];
  }
};

/**
 * @description Firestore에서 검색 기록 삭제
 */
const deleteSearchHistory = async (docId: string) => {
  try {
    const searchHistoryDocRef = doc(db, "SearchHistory", docId);
    await deleteDoc(searchHistoryDocRef);
  } catch (error) {
    console.error("검색 기록 삭제 실패:", error);
  }
};

export { getRecentSearchHistory, postSearchHistory, deleteSearchHistory };
