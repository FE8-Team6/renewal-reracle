import { db } from "@/firebase"; // Firebase 설정 파일
import { doc, setDoc } from "firebase/firestore";

const wasteCategories = [
  {
    id: "1",
    name: "종이",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fpaper.svg?alt=media&token=faf41e4e-39a7-447e-ae77-75465a022dd0",
    items: [
      {
        id: "1",
        name: "신문지",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fnewspaper.svg?alt=media&token=3d789c90-5ae7-41a2-bec1-eb61ea0ebf37",
        disposalMethod:
          "1. 물기에 젖지 않도록 하고 반듯하게 펴서 차곡차곡 쌓은 후 묶어서 배출 2. 비닐코팅된 광고지, 비닐류, 기타 오물이 섞이지 않도록 합니다.",
      },
      {
        id: "2",
        name: "쌀포대",
        imageURL: "ricebag",
        disposalMethod: "쌀포대 버리는 방법",
      },
      {
        id: "3",
        name: "수첩",
        imageURL: "notebook",
        disposalMethod: "스프링 등 종이류와 다른 재질은 제거한 후 배출한다.",
      },
    ],
  },
  {
    id: "2",
    name: "종이팩",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fpaperpack.svg?alt=media&token=9045901c-c2de-44cf-8a79-76c0367d7438",
    items: [
      {
        id: "1",
        name: "우유팩",
        imageURL: "milkpack",
        disposalMethod:
          "내용물을 비우고, 물로 깨끗이 세척해서 배출 - 빨대, 비닐, 플라스틱 뚜껑 등 다른 재질은 분리해서 재질별로 분리 배출",
      },
    ],
  },
  {
    id: "3",
    name: "캔",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fcan.svg?alt=media&token=daee1290-725d-435c-b14b-84b7d51759ef",
    items: [{}],
  },
];

export const saveWasteCategories = async () => {
  for (const category of wasteCategories) {
    const categoryRef = doc(db, "WasteCategories", category.id); // 문서 ID로 id 사용

    await setDoc(categoryRef, {
      name: category.name,
      imageURL: category.imageURL,
      items: category.items,
    });
  }
  console.log("Categories saved successfully!");
};
