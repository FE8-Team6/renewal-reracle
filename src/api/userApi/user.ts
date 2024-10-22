import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * 사용자의 프로필 정보를 가져오는 함수
 * @param uid
 * @returns
 */
const getUserProfile = async (uid: string) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    throw new Error("사용자 데이터를 찾을 수 없습니다.");
  }
};

export { getUserProfile };
