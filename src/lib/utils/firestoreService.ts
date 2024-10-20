import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

/**
 * @description WasteCategories 컬렉션에 쓰레기 분류 카테고리를 저장합니다.
 */
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
        description:
          "물기에 젖지 않도록 하고 반듯하게 펴서 차곡차곡 쌓은 후 묶어서 배출합니다. 비닐코팅된 광고지, 비닐류, 기타 오물이 섞이지 않도록 해야 합니다.",
      },
      {
        id: "2",
        name: "쌀포대",
        imageURL: "ricebag",
        description: "쌀포대 버리는 방법",
      },
      {
        id: "3",
        name: "수첩",
        imageURL: "notebook",
        description: "스프링 등 종이류와 다른 재질은 제거한 후 배출해야합니다.",
      },
      {
        id: "4",
        name: "잡지",
        imageURL: "magazine",
        description: "스프링 등 종이류와 다른 재질은 제거한 후 배출해야합니다.",
      },
      {
        id: "5",
        name: "가격표",
        imageURL: "priceTag",
        description:
          "물기에 젖지 않도록 하고 반듯하게 펴서 차곡차곡 쌓은 후 묶어서 배출 해야 합니다. 또한, 비닐코팅된 광고지, 비닐류, 기타 오물이 섞이지 않도록 해야 합니다.",
      },
      {
        id: "6",
        name: "골판지",
        imageURL: "cardboard",
        description:
          "비닐코팅 부분, 상자에 붙어있는 테이프ㆍ철핀, 알루미늄박 등을 제거하고 접어서 배출 - 야외 별도 보관 장소마련 등 다른 종이류와 섞이지 않게 배출 해야 합니다.",
      },
      {
        id: "7",
        name: "전단지",
        imageURL: "flyer",
        description:
          "비닐 코팅된 종이, 공책의 스프링, 비닐포장지 등은 제거 후 배출 해야 합니다.",
      },
      {
        id: "8",
        name: "종이컵",
        imageURL: "paperCup",
        description:
          "내용물을 비우고 물로 헹군 후 압착하여 투명한 비닐에 넣어서 배출 해야 합니다.",
      },
      {
        id: "9",
        name: "명함",
        imageURL: "businessCard",
        description: "명함 버리는 방법",
      },
      {
        id: "10",
        name: "백과사전",
        imageURL: "encyclopedia",
        description:
          "비닐 코팅된 종이, 공책의 스프링, 비닐포장지 등은 제거 후 배출 해야 합니다.",
      },
      {
        id: "11",
        name: "종이상자",
        imageURL: "paperbox",
        description:
          "비닐코팅 부분, 상자에 붙어있는 테이프ㆍ철핀, 알루미늄박 등을 제거하고 접어서 배출 - 야외 별도 보관 장소마련 등 다른 종이류와 섞이지 않게 배출 해야 합니다.",
      },
      {
        id: "12",
        name: "책",
        imageURL: "book",
        description:
          "비닐 코팅된 종이, 공책의 스프링, 비닐포장지 등은 제거 후 배출 해야 합니다.",
      },
      {
        id: "13",
        name: "캘린더",
        imageURL: "calendar",
        description:
          "비닐 코팅된 종이, 공책의 스프링, 비닐포장지 등은 제거 후 배출 해야 합니다.",
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
        description:
          "내용물을 비우고, 물로 깨끗이 세척해서 배출 해야 합니다. 또한, 빨대, 비닐, 플라스틱 뚜껑 등 다른 재질은 분리해서 재질별로 분리 배출 해야 합니다.",
      },
    ],
  },
  {
    id: "3",
    name: "금속 캔",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fcan.svg?alt=media&token=daee1290-725d-435c-b14b-84b7d51759ef",
    items: [
      {
        id: "1",
        name: "스프레이",
        imageURL: "spray",
        description: "내용물을 제거한 후 배출 해야 합니다.",
      },
      {
        id: "2",
        name: "통조림",
        imageURL: "cannedFood",
        description:
          "내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출 해야 합니다. 담배꽁초 등 이물질을 넣지 않고 배출 해야 합니다. 플라스틱 뚜껑 등 금속캔과 다른 재질은 제거한 후 배출 해야 합니다.",
      },
    ],
  },
  {
    id: "4",
    name: "고철",
    imageURL: "scrapMetal",
    items: [{}],
  },
  { id: "5", name: "유리병", imageURL: "glassBottle", items: [{}] },
  { id: "6", name: "플라스틱", imageURL: "plastic", items: [{}] },
  { id: "7", name: "비닐", imageURL: "vinyl", items: [{}] },
  { id: "8", name: "발포합성", imageURL: "styrofoam", items: [{}] },
  { id: "9", name: "의류", imageURL: "clothes", items: [{}] },
  {
    id: "10",
    name: "가전제품",
    imageURL: "electronics",
    items: [
      {
        id: "1",
        name: "세탁기",
        imageURL: "washingmachine",
        description: "세탁기 버리는 방법",
      },
      {
        id: "2",
        name: "텔레비전",
        imageURL: "tv",
        description: "TV 버리는 방법",
      },
      {
        id: "3",
        name: "냉장고",
        imageURL: "refrigerator",
        description: "냉장고 버리는 방법",
      },
      {
        id: "4",
        name: "가습기",
        imageURL: "humidifier",
        description: "가습기 버리는 방법",
      },
      {
        id: "5",
        name: "오디오세트",
        imageURL: "audioSet",
        description: "오디오세트 버리는 방법",
      },
      {
        id: "6",
        name: "정수기",
        imageURL: "waterPurifier",
        description: "정수기 버리는 방법",
      },
      {
        id: "7",
        name: "스캐너",
        imageURL: "scanner",
        description: "스캐너 버리는 방법",
      },
      {
        id: "8",
        name: "스피커",
        imageURL: "speaker",
        description: "스피커 버리는 방법",
      },
      {
        id: "9",
        name: "식기세척기",
        imageURL: "dishwasher",
        description: "식기세척기 버리는 방법",
      },
      {
        id: "10",
        name: "선풍기",
        imageURL: "fan",
        description: "선풍기 버리는 방법",
      },
      {
        id: "11",
        name: "비디오카메라",
        imageURL: "videocamera",
        description: "비디오카메라 버리는 방법",
      },
      {
        id: "12",
        name: "비데",
        imageURL: "bidet",
        description: "비데 버리는 방법",
      },
      {
        id: "13",
        name: "스탠드",
        imageURL: "stand",
        description: "스탠드 버리는 방법",
      },
      {
        id: "14",
        name: "온풍기",
        imageURL: "heater",
        description: "온풍기 버리는 방법",
      },
      {
        id: "15",
        name: "와인셀러",
        imageURL: "wineCeller",
        description: "와인셀러 버리는 방법",
      },
      {
        id: "16",
        name: "에어컨",
        imageURL: "aircon",
        description: "에어컨 버리는 방법",
      },
      {
        id: "17",
        name: "전기밥솥",
        imageURL: "riceCooker",
        description: "전기밥솥 버리는 방법",
      },
      {
        id: "18",
        name: "전기포트",
        imageURL: "electricPot",
        description: "전기포트 버리는 방법",
      },
      {
        id: "19",
        name: "전자레인지",
        imageURL: "microwave",
        description: "전자레인지 버리는 방법",
      },
      {
        id: "20",
        name: "전자사전",
        imageURL: "electronicDictionary",
        description: "전자사전 버리는 방법",
      },
      {
        id: "21",
        name: "전화기",
        imageURL: "telephone",
        description: "전화기 버리는 방법",
      },
      {
        id: "22",
        name: "청소기",
        imageURL: "cleaner",
        description: "청소기 버리는 방법",
      },
      {
        id: "23",
        name: "키보드",
        imageURL: "keyboard",
        description: "키보드 버리는 방법",
      },
      {
        id: "24",
        name: "커피메이커",
        imageURL: "coffeeMaker",
        description: "커피메이커 버리는 방법",
      },
      {
        id: "25",
        name: "컴퓨터",
        imageURL: "computer",
        description: "컴퓨터 버리는 방법",
      },
      {
        id: "26",
        name: "토스터기",
        imageURL: "toasters",
        description: "토스터기 버리는 방법",
      },
      {
        id: "27",
        name: "프린터",
        imageURL: "printer",
        description: "프린터 버리는 방법",
      },
      {
        id: "28",
        name: "헤드폰",
        imageURL: "headphone",
        description: "헤드폰 버리는 방법",
      },
      {
        id: "29",
        name: "휴대용플레이어",
        imageURL: "portablePlayer",
        description: "휴대용플레이어 버리는 방법",
      },
    ],
  },
  {
    id: "11",
    name: "대형",
    imageURL: "largeWaste",
    items: [{}],
  },
  {
    id: "12",
    name: "음식물",
    imageURL: "foodWaste",
    items: [{}],
  },
  {
    id: "13",
    name: "유해",
    imageURL: "harmfulness",
    items: [{}],
  },
  {
    id: "14",
    name: "불연성 폐기물",
    imageURL: "noncombustibleWaste",
    items: [{}],
  },
  {
    id: "15",
    name: "종량제 봉투",
    imageURL: "garbage",
    items: [{}],
  },
];

export const saveWasteCategories = async () => {
  for (const category of wasteCategories) {
    const categoryRef = doc(db, "WasteCategories", category.id);

    await setDoc(categoryRef, {
      name: category.name,
      imageURL: category.imageURL,
      items: category.items,
    });
  }
  console.log("Categories 저장 완료 되었습니다.");
};
