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
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fpaper.svg?alt=media&token=d480eeac-df0e-4d3e-95c0-fce061e70f25",
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
      {
        id: "3",
        name: "음료캔",
        imageURL: "beverageCan",
        description:
          "내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출 해야 합니다. 담배꽁초 등 이물질을 넣지 않고 배출 해야 합니다. 플라스틱 뚜껑 등 금속캔과 다른 재질은 제거한 후 배출 해야 합니다.",
      },
    ],
  },
  {
    id: "4",
    name: "고철",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2FscrapMetal.svg?alt=media&token=628fa921-5c4b-4380-a4bb-a924d13ff9d3",
    items: [{}],
  },
  {
    id: "5",
    name: "유리병",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2FglassBottle.svg?alt=media&token=6245a4da-8309-4f00-ae3e-787fafbd4434",
    items: [{}],
  },
  {
    id: "6",
    name: "플라스틱",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fplastic.svg?alt=media&token=03b1cb19-1537-4766-a5cf-2f2ed6519a94",
    items: [{}],
  },
  {
    id: "7",
    name: "비닐",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fvinyl.svg?alt=media&token=85092708-fa1b-449a-b2b1-2e355999ec0d",
    items: [{}],
  },
  {
    id: "8",
    name: "발포합성",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fstyrofoam.svg?alt=media&token=0c7dc678-b6b4-4751-a31e-6eb57d4bf0a9",
    items: [{}],
  },
  {
    id: "9",
    name: "의류",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fclothes.svg?alt=media&token=c7912347-56f8-4b44-adf7-efe41a7c5c48",
    items: [{}],
  },
  {
    id: "10",
    name: "가전제품",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Felectronics.svg?alt=media&token=4114f7c6-70e8-496c-b276-24a74c6df52b",
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
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Faircon.svg?alt=media&token=9c3a3bd7-1de2-4834-b2b3-9e7a74c936c2",
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
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2FlargeWaste.svg?alt=media&token=8c5d383f-0d67-416d-83a6-9787c60aab9f",
    items: [
      {
        id: "1",
        name: "가구류",
        imageURL: "furniture",
        description: "대형 생활 폐기물로 신고 한 후 스티커 부착",
      },
      {
        id: "2",
        name: "거울",
        imageURL: "mirror",
        description: "거울 버리는 방법",
      },
      {
        id: "3",
        name: "씽크대",
        imageURL: "sink",
        description: "대형 생활 폐기물로 신고 한 후 스티커 부착",
      },
      {
        id: "4",
        name: "나뭇가지",
        imageURL: "woodPiece",
        description: "나뭇가지 버리는 방법",
      },
      {
        id: "5",
        name: "낚싯대",
        imageURL: "fishingRod",
        description: "낚싯대 버리는 방법",
      },
      {
        id: "6",
        name: "골프백",
        imageURL: "golfBag",
        description: "골프백 버리는 방법",
      },
      {
        id: "7",
        name: "악기",
        imageURL: "instrument",
        description: "악기 버리는 방법",
      },
      {
        id: "8",
        name: "라켓",
        imageURL: "racket",
        description: "라켓 버리는 방법",
      },
      {
        id: "9",
        name: "목발",
        imageURL: "crutch",
        description: "목발 버리는 방법",
      },
      {
        id: "10",
        name: "목재",
        imageURL: "lumber",
        description: "목재 버리는 방법",
      },
      {
        id: "11",
        name: "문짝",
        imageURL: "door",
        description: "문짝 버리는 방법",
      },
      {
        id: "12",
        name: "매트",
        imageURL: "airMat",
        description: "매트 버리는 방법",
      },
      {
        id: "13",
        name: "바베큐그릴",
        imageURL: "bbqGrill",
        description: "바베큐그릴 버리는 방법",
      },
      {
        id: "14",
        name: "밥상",
        imageURL: "table",
        description: "밥상 버리는 방법",
      },
      {
        id: "15",
        name: "시계",
        imageURL: "clock",
        description: "시계 버리는 방법",
      },
      {
        id: "16",
        name: "블라인드",
        imageURL: "blind",
        description: "블라인드 버리는 방법",
      },
      {
        name: "사다리",
        id: "17",
        imageURL: "ladder",
        description: "사다리 버리는 방법",
      },
      {
        name: "삽",
        id: "18",
        imageURL: "shovel",
        description: "삽 버리는 방법",
      },
      {
        name: "쌀통",
        id: "19",
        imageURL: "riceContainer",
        description: "쌀통 버리는 방법",
      },
      {
        name: "서랍장",
        id: "20",
        imageURL: "drawers",
        description: "서랍장 버리는 방법",
      },
      {
        name: "세면대",
        id: "21",
        imageURL: "washbasin",
        description: "세면대 버리는 방법",
      },
      {
        name: "솜이불",
        id: "22",
        imageURL: "bedding",
        description: "솜이불 버리는 방법",
      },
      {
        name: "수족관, 어항",
        id: "23",
        imageURL: "aquarium",
        description: "수족관, 어항 버리는 방법",
      },
      {
        name: "스노우보드",
        id: "24",
        imageURL: "snowboard",
        description: "스노우보드 버리는 방법",
      },
      {
        name: "스키용구류",
        id: "25",
        imageURL: "skiEquipment",
        description: "스키용구류 버리는 방법",
      },
      {
        name: "식물",
        id: "26",
        imageURL: "plant",
        description: "식물, 나무 버리는 방법",
      },
      {
        name: "신발장",
        id: "27",
        imageURL: "shoeRack",
        description: "신발장 버리는 방법",
      },
      {
        name: "아기욕조",
        id: "28",
        imageURL: "babyBath",
        description: "아기욕조 버리는 방법",
      },
      {
        name: "침구류",
        id: "29",
        imageURL: "bedding",
        description: "침구류 버리는 방법",
      },
      {
        name: "침대",
        id: "30",
        imageURL: "bed",
        description: "침대 버리는 방법",
      },
      {
        name: "액자",
        id: "31",
        imageURL: "album",
        description: "액자 버리는 방법",
      },
      {
        name: "앨범",
        id: "32",
        imageURL: "album",
        description: "앨범 버리는 방법",
      },
      {
        name: "에어매트",
        id: "33",
        imageURL: "airMat",
        description: "에어매트 버리는 방법",
      },
      {
        name: "여행가방",
        id: "34",
        imageURL: "travelBag",
        description: "여행가방 버리는 방법",
      },
      {
        name: "유리판",
        id: "35",
        imageURL: "glassPlate",
        description: "유리판 버리는 방법",
      },
      {
        name: "유모차",
        id: "36",
        imageURL: "stroller",
        description: "유모차 버리는 방법",
      },
      {
        name: "의자",
        id: "37",
        imageURL: "chair",
        description: "의자 버리는 방법",
      },
      {
        name: "이불",
        id: "38",
        imageURL: "bedding",
        description: "이불 버리는 방법",
      },
      {
        name: "인형",
        id: "39",
        imageURL: "doll",
        description: "인형 버리는 방법",
      },
      {
        name: "자전거",
        id: "40",
        imageURL: "bicycle",
        description: "자전거 버리는 방법",
      },
      {
        name: "장난감류",
        id: "41",
        imageURL: "toys",
        description: "장난감류 버리는 방법",
      },
      {
        name: "대걸레",
        id: "42",
        imageURL: "mop",
        description: "자루걸레 버리는 방법",
      },
      {
        name: "장롱",
        id: "43",
        imageURL: "wardrobe",
        description: "장롱 버리는 방법",
      },
      {
        name: "장식장",
        id: "44",
        imageURL: "dresser",
        description: "장식장 버리는 방법",
      },
      {
        name: "장판",
        id: "45",
        imageURL: "vinylFlooring",
        description: "장판 버리는 방법",
      },
      {
        name: "전기장판",
        id: "46",
        imageURL: "vinylFlooring",
        description: "전기장판 버리는 방법",
      },
      {
        name: "피아노",
        id: "47",
        imageURL: "electronicPiano",
        description: "피아노 버리는 방법",
      },
      {
        name: "진열대",
        id: "48",
        imageURL: "shelf",
        description: "진열대 버리는 방법",
      },
      {
        name: "책상",
        id: "49",
        imageURL: "table",
        description: "책상 버리는 방법",
      },
      {
        name: "천체망원경",
        id: "50",
        imageURL: "telescope",
        description: "천체망원경 버리는 방법",
      },
      {
        name: "체중계",
        id: "51",
        imageURL: "weightMeasuringMachine",
        description: "체중계 버리는 방법",
      },
      {
        name: "카펫",
        id: "52",
        imageURL: "carpet",
        description: "카펫 버리는 방법",
      },
      {
        name: "캐비넷",
        id: "53",
        imageURL: "cabinet",
        description: "캐비넷 버리는 방법",
      },
      {
        name: "커튼",
        id: "54",
        imageURL: "curtain",
        description: "커튼 버리는 방법",
      },
      {
        name: "쿠션",
        id: "55",
        imageURL: "cushion",
        description: "쿠션 버리는 방법",
      },
      {
        name: "텐트",
        id: "56",
        imageURL: "tent",
        description: "텐트 버리는 방법",
      },
      {
        name: "항아리",
        id: "57",
        imageURL: "jar",
        description: "항아리 버리는 방법",
      },
      {
        name: "화로",
        id: "58",
        imageURL: "brazier",
        description: "화로 버리는 방법",
      },
      {
        name: "화장대",
        id: "59",
        imageURL: "vanity",
        description: "화장대 버리는 방법",
      },
    ],
  },
  {
    id: "12",
    name: "음식물",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2FfoodWaste.svg?alt=media&token=9460c168-e287-4042-a00a-2f77eab3b5f5",
    items: [
      {
        id: "1",
        name: "바나나껍질",
        imageURL: "bananaPeel",
        description: "음식물 쓰레기에 버리세요",
      },
      {
        id: "2",
        name: "상한음식",
        imageURL: "rottenFood",
        description: "음식물 쓰레기에 버리세요",
      },
      {
        id: "3",
        name: "생선",
        imageURL: "fish",
        description: "일반 쓰레기로 분류되어 종량제 봉투에 버리세요",
      },
      {
        id: "4",
        name: "오렌지껍질",
        imageURL: "orangePeel",
        description: "음식물 쓰레기에 버리세요",
      },
    ],
  },
  {
    id: "13",
    name: "유해",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fharmfulness.svg?alt=media&token=e43e02de-88d7-4e3a-a188-1df51f8d98fb",
    items: [
      {
        id: "1",
        name: "폐건전지",
        imageURL: "battery",
        description:
          "폐건전는 망간, 수은, 카드뮴 등 중그목 유해물질을 함유하고 있다. 환경오염 및 인체에 나쁜 영향을 일으킬 수 있으므로 전용수거함에 안전하게 배출 해야 합니다.",
      },
      {
        id: "2",
        name: "폐형광등",
        imageURL: "fluorescentLamp",
        description:
          "형광등 안에는 유해물질인 수은이 함유되어 있다. 인체에 위험한 수은이 노출되지 않도록 깨어지지 않게 주의하여 전용 수거함에 안전하게 배출 해야 합니다.",
      },
      {
        id: "3",
        name: "폐의약품",
        imageURL: "medicine",
        description:
          "가정 내 폐의약품이 매립되거나 도시하수로 배출될 경우 공기, 토양, 수질 등의 환경오염을 유발하고 생태계 고랸의 원인이 된다. 폐의약품은 모아서 약국에 비치된 전용수거함으로 배출 해야 합니다.",
      },
    ],
  },
  {
    id: "14",
    name: "불연성 폐기물",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2FnoncombustibleWaste.svg?alt=media&token=4affe1db-c866-4419-8acd-c668c3313c86",
    items: [
      {
        id: "1",
        name: "거울",
        imageURL: "mirror",
        description:
          "불연성폐기물로 배출 크기가 많이 큰 경우에 대형 폐기물로 배출",
      },
      {
        id: "2",
        name: "그릇",
        imageURL: "bowl",
        description: "불연성폐기물로 배출",
      },
      {
        id: "3",
        name: "깨진유리",
        imageURL: "brokenGlass",
        description: "",
      },
      {
        id: "4",
        name: "내열 식기류",
        imageURL: "heatResistantTableware",
        description: "불연성폐기물로 배출",
      },
      {
        id: "5",
        name: "도자기",
        imageURL: "ceramic",
        description: "불연성폐기물로 배출",
      },
      {
        id: "6",
        name: "뚝배기",
        imageURL: "earthenPot",
        description: "불연성폐기물로 배출",
      },
      {
        id: "7",
        name: "머그컵",
        imageURL: "mugCup",
        description: "불연성폐기물로 배출",
      },
      {
        id: "8",
        name: "백열전구",
        imageURL: "incandescentLightBulb",
        description: "불연성폐기물로 배출",
      },
      {
        id: "9",
        name: "벽돌",
        imageURL: "brick",
        description: "불연성폐기물로 배출",
      },
      {
        id: "10",
        name: "유리판,유리제품",
        imageURL: "glassPlate",
        description:
          "불연성폐기물로 배출 크기가 많이 큰 경우에 대형 폐기물로 배출",
      },
      {
        id: "11",
        name: "재떨이(도자기,유리)",
        imageURL: "ashtray",
        description: "불연성폐기물로 배출",
      },
      {
        id: "12",
        name: "찻잔(도자기류)",
        imageURL: "teacup",
        description: "불연성폐기물로 배출",
      },
      {
        id: "13",
        name: "컵(도자기,유리컵)",
        imageURL: "cup",
        description: "불연성폐기물로 배출",
      },
      {
        id: "14",
        name: "화분",
        imageURL: "pot",
        description: "불연성폐기물로 배출하되 재질에 맞게 배출",
      },
    ],
  },
  {
    id: "15",
    name: "종량제 봉투",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fgarbage.svg?alt=media&token=ecf5a432-7ad1-48d2-b047-faf3e1c1fc8d",
    items: [
      {
        id: "1",
        name: "가발",
        imageURL: "wig",
        description: "종량제 봉투로 배출",
      },
      {
        id: "2",
        name: "가위",
        imageURL: "scissors",
        description:
          "재질에 맞게 배출하되,여러재질이 섞인 경우,종량제 봉투로 배출",
      },
      {
        id: "3",
        name: "걸레",
        imageURL: "dishcloth",
        description: "종량제 봉투로 배출",
      },
      {
        id: "4",
        name: "계란껍질",
        imageURL: "eggshell",
        description: "종량제 봉투로 배출",
      },
      {
        id: "5",
        name: "고무장갑",
        imageURL: "rubberGlove",
        description: "종량제 봉투로 배출",
      },
      {
        id: "6",
        name: "골프공",
        imageURL: "golfBall",
        description: "종량제 봉투로 배출",
      },
      {
        id: "7",
        name: "나무국자",
        imageURL: "woodenLadle",
        description: "종량제 봉투로 배출",
      },
      {
        id: "8",
        name: "나무젓가락",
        imageURL: "woodenChopsticks",
        description: "종량제 봉투로 배출",
      },
      {
        id: "9",
        name: "나무조각",
        imageURL: "woodPiece",
        description: "종량제 봉투에 담을 수 없는경우 대형폐기물로 처리",
      },
      {
        id: "10",
        name: "나뭇가지",
        imageURL: "woodPiece",
        description: "종량제 봉투에 담을 수 없는경우 대형폐기물로 처리",
      },
      {
        id: "11",
        name: "나무줄기",
        imageURL: "treeTrunk",
        description: "종량제 봉투에 담을 수 없는경우 대형폐기물로 처리",
      },
      {
        id: "12",
        name: "나침반",
        imageURL: "compass",
        description: "종량제 봉투로 배출",
      },
      {
        id: "13",
        name: "낙엽",
        imageURL: "fallenLeaves",
        description: "종량제 봉투로 배출",
      },
      {
        id: "14",
        name: "낫손잡이",
        imageURL: "sickleHandle",
        description:
          "고철로 배출하되, 가능하다면 손잡이 부분(나무재질 등)을 분리하여 배출",
      },
      {
        id: "15",
        name: "냄비뚜껑(강화유리)",
        imageURL: "potLid",
        description: "종량제 봉투로 배출",
      },
      {
        id: "16",
        name: "도끼 손잡이",
        imageURL: "axHandle",
        description: "종량제 봉투로 배출",
      },
      {
        id: "17",
        name: "나무도마",
        imageURL: "woodenCuttingBoard",
        description: "종량제 봉투로 배출",
      },
      {
        id: "18",
        name: "돋보기",
        imageURL: "magnifyingGlasses",
        description: "종량제 봉투로 배출",
      },
      {
        id: "19",
        name: "라이터",
        imageURL: "lighter",
        description: "모두 사용한 후 종량제 봉투로 배출",
      },
      {
        id: "20",
        name: "라켓",
        imageURL: "racket",
        description: "종량제 봉투에 담을 수 없다면 대형으로처리",
      },
      {
        id: "21",
        name: "랩",
        imageURL: "lab",
        description: "사용한 랩은 쓰레기 종량제 봉투로 배출",
      },
      {
        id: "22",
        name: "마스크",
        imageURL: "mask",
        description: "종량제 봉투로 배출",
      },
      {
        id: "23",
        name: "마우스패드",
        imageURL: "mousePad",
        description: "종량제 봉투로 배출",
      },
      {
        id: "24",
        name: "만년필(마커펜)",
        imageURL: "fountainPen",
        description: "종량제 봉투로 배출",
      },
      {
        id: "25",
        name: "일회용면도기",
        imageURL: "disposableRazor",
        description: "종량제 봉투로 배출",
      },
      {
        id: "26",
        name: "면도칼",
        imageURL: "razor",
        description:
          "수거원이 다치지 않도록 종이 등으로 감싸서 종량제 봉투로 배출",
      },
      {
        id: "27",
        name: "면봉",
        imageURL: "cottonSwab",
        description: "종량제 봉투로 배출",
      },
      {
        id: "28",
        name: "명함",
        imageURL: "businessCard",
        description:
          "종이류로 배출하며, 플라스틱 합성지 등 다른 재질 포함시 종량제봉투에 배출",
      },
      {
        id: "29",
        name: "명함지갑",
        imageURL: "businessCardWallet",
        description: "종량제 봉투로 배출",
      },
      {
        id: "30",
        name: "모자",
        imageURL: "hat",
        description:
          "의류 및 원단류 배출 방법을 참고하여 배출하거나 종량제 봉투로 배출",
      },
      {
        id: "31",
        name: "목재",
        imageURL: "wood",
        description: "종량제 봉투에 담을 수 없는 경우 대형폐기물로 처리",
      },
      {
        id: "32",
        name: "물티슈",
        imageURL: "wetTissue",
        description: "종량제 봉투로 배출",
      },
      {
        id: "33",
        name: "밀짚모자",
        imageURL: "strawHat",
        description: "종량제 봉투로 배출",
      },
      {
        id: "34",
        name: "바둑판",
        imageURL: "checkerboard",
        description: "종량제 봉투에 담을 수 없는경우 대형폐기물로 처리",
      },
      {
        id: "35",
        name: "방석",
        imageURL: "cushion",
        description: "종량제 봉투로 배출",
      },
      {
        id: "36",
        name: "배트민턴공",
        imageURL: "badmintonBall",
        description: "종량제 봉투로 배출",
      },
      {
        id: "37",
        name: "벼루",
        imageURL: "inkStone",
        description: "종량제 봉투로 배출",
      },
      {
        id: "38",
        name: "보온병",
        imageURL: "thermos",
        description: "종량제 봉투로 배출",
      },
      {
        id: "39",
        name: "볼펜",
        imageURL: "pen",
        description: "종량제 봉투로 배출",
      },
      {
        id: "40",
        name: "붓",
        imageURL: "brush",
        description: "종량제 봉투로 배출",
      },
      {
        id: "41",
        name: "비닐장판",
        imageURL: "vinylFlooring",
        description: "종량제 봉투에 담을 수 없는경우 대형폐기물로 처리",
      },
      {
        id: "42",
        name: "비닐코팅종이",
        imageURL: "vinylCoatedPaper",
        description: "종량제 봉투로 배출",
      },
      {
        id: "43",
        name: "빗",
        imageURL: "comb",
        description:
          "재질에 맞게 배출하되 나무 빗 등은 쓰레기 종량제봉투로 배출",
      },
      {
        id: "44",
        name: "사인펜",
        imageURL: "markerPen",
        description: "종량제 봉투로 배출",
      },
      {
        id: "45",
        name: "사진",
        imageURL: "picture",
        description: "종량제 봉투로 배출",
      },
      {
        id: "46",
        name: "사진인화지",
        imageURL: "photoPaper",
        description: "종량제 봉투로 배출",
      },
      {
        id: "47",
        name: "생선뼈",
        imageURL: "fishBone",
        description: "종량제 봉투로 배출",
      },
      {
        id: "48",
        name: "샤프펜슬",
        imageURL: "mechanicalPencil",
        description: "종량제 봉투로 배출",
      },
      {
        id: "49",
        name: "성냥",
        imageURL: "matches",
        description: "물에 적신 후 종량제 봉투로 배출",
      },
      {
        id: "50",
        name: "솜",
        imageURL: "cotton",
        description: "종량제 봉투로 배출",
      },
      {
        id: "51",
        name: "송곳",
        imageURL: "awl",
        description: "종량제 봉투로 배출",
      },
      {
        id: "52",
        name: "수세미",
        imageURL: "scrubbers",
        description: "종량제 봉투로 배출",
      },
      {
        id: "53",
        name: "숯",
        imageURL: "charcoal",
        description: "종량제 봉투로 배출",
      },
      {
        id: "54",
        name: "스폰지",
        imageURL: "sponge",
        description: "종량제 봉투로 배출",
      },
      {
        id: "55",
        name: "시계",
        imageURL: "watch",
        description:
          "종량제 종투에 담을 수 없는 경우 대형폐기물로 처리, 건전지는 분리하여 전용수거함으로 배출",
      },
      {
        id: "56",
        name: "신발",
        imageURL: "shoes",
        description: "종량제 봉투로 배출",
      },
      {
        id: "57",
        name: "식물,나무",
        imageURL: "plant",
        description: "종량제 봉투에 담을 수 없는 경우 대형폐기물로 처리",
      },
      {
        id: "58",
        name: "아이스팩",
        imageURL: "icePack",
        description: "종량제 봉투로 배출",
      },
      {
        id: "59",
        name: "악기",
        imageURL: "instrument",
        description:
          "종량제 봉투에 담을 수 없는경우 대형페기물로 배출 ※ 악기는 폐가전 제품 무상방문 수거 대상품목이 아님",
      },
      {
        id: "60",
        name: "애완동물 용변 시트",
        imageURL: "petToiletSeat",
        description: "종량제 봉투로 배출",
      },
      {
        id: "61",
        name: "액자",
        imageURL: "photoFrame",
        description: "종량제 봉투에 담을 수 없는경우 대형폐기물로 처리",
      },
      {
        id: "62",
        name: "앨범",
        imageURL: "album",
        description: "종량제 봉투에 담을 수 없는경우 대형폐기물로 처리",
      },
      {
        id: "63",
        name: "야구공",
        imageURL: "baseballBall",
        description: "종량제 봉투로 배출",
      },
      {
        id: "64",
        name: "야구글러브",
        imageURL: "baseballGlove",
        description: "종량제 봉투로 배출",
      },
      {
        id: "65",
        name: "나무야구배트",
        imageURL: "woodenBaseballBat",
        description: "종량제 봉투로 배출",
      },
      {
        id: "66",
        name: "양초",
        imageURL: "candle",
        description: "종량제 봉투로 배출",
      },
      {
        id: "67",
        name: "에어매트",
        imageURL: "airMat",
        description: "종량제 봉투에 담을 수 없는경우 대형폐기물로 처리",
      },
      {
        id: "68",
        name: "연필(색연필)",
        imageURL: "pencil",
        description: "종량제 봉투로 배출",
      },
      {
        id: "69",
        name: "연필깎이",
        imageURL: "pencilSharpener",
        description: "종량제 봉투로 배출",
      },
      {
        id: "70",
        name: "요가매트",
        imageURL: "yogaMat",
        description: "종량제 봉투로 배출",
      },
      {
        id: "71",
        name: "우산",
        imageURL: "umbrella",
        description:
          "뼈대와 비닐을 분리하여, 각각의 분리수거함으로 배출,분리가 어렵다면 종량제봉투로 배출",
      },
      {
        id: "72",
        name: "이불",
        imageURL: "bedding",
        description: "종량제 봉투에 담을 수 없는경우 대형폐기물로 처리",
      },
      {
        id: "73",
        name: "인형",
        imageURL: "doll",
        description: "종량제 봉투에 담을 수 없는경우 대형폐기물로 처리",
      },
      {
        id: "74",
        name: "자석",
        imageURL: "magnet",
        description: "종량제 봉투로 배출",
      },
      {
        id: "75",
        name: "장난감",
        imageURL: "toys",
        description:
          "크기에 따라 대형폐기물 또는 재질에 맞게 배출(여러재질이 섞인 경우 종량제 봉투로 배출)",
      },
      {
        id: "76",
        name: "전기코드",
        imageURL: "electricalCord",
        description: "종량제 봉투로 배출",
      },
      {
        id: "77",
        name: "전동칫솔",
        imageURL: "electricToothbrush",
        description: "종량제 봉투로 배출",
      },
      {
        id: "78",
        name: "전자피아노",
        imageURL: "electronicPiano",
        description:
          "종량제 봉투에 담을 수 없는경우 대형폐기물로 처리 ※ 악기는 폐가전 제품 무상방문 수거 대상품목이 아님",
      },
      {
        id: "79",
        name: "접착제",
        imageURL: "glue",
        description: "종량제 봉투로 배출",
      },
      {
        id: "80",
        name: "젖꼭지(아기용품)",
        imageURL: "nipple",
        description: "종량제 봉투로 배출",
      },
      {
        id: "81",
        name: "조각칼",
        imageURL: "carvingKnife",
        description: "수거원이 다치지 않도록 종이 등으로 감싸서 배출",
      },
      {
        id: "82",
        name: "종이기저귀",
        imageURL: "paperDiapers",
        description: "종량제 봉투로 배출",
      },
      {
        id: "83",
        name: "줄자",
        imageURL: "tapeMeasure",
        description: "재질에 맞게 배출 또는 종량제 봉투로 배출",
      },
      {
        id: "84",
        name: "지우개",
        imageURL: "eraser",
        description: "종량제 봉투로 배출",
      },
      {
        id: "85",
        name: "차 찌꺼기",
        imageURL: "teaIngredients",
        description: "종량제 봉투로 배출",
      },
      {
        id: "86",
        name: "체온계",
        imageURL: "thermometer",
        description: "건전지는 분리하여 전용수거함으로 배출",
      },
      {
        id: "87",
        name: "체중계",
        imageURL: "weightMeasuringMachine",
        description: "종량제 봉투에 담을 수 없는 경우 대형폐기물로 처리",
      },
      {
        id: "88",
        name: "축구공",
        imageURL: "soccer",
        description: "종량제 봉투로 배출",
      },
      {
        id: "89",
        name: "침구류",
        imageURL: "bedding",
        description: "종량제 봉투에 담을 수 없는 경우 대형폐기물로 처리",
      },
      {
        id: "90",
        name: "칫솔",
        imageURL: "electricToothbrush",
        description: "종량제 봉투로 배출",
      },
      {
        id: "91",
        name: "카펫(융단)",
        imageURL: "carpet",
        description: "종량제 봉투에 담을 수 없는 경우 대형폐기물로 처리",
      },
      {
        id: "92",
        name: "커튼(커튼레일)",
        imageURL: "curtain",
        description: "종량제 봉투에 담을 수 없는 경우 대형폐기물로 처리",
      },
      {
        id: "93",
        name: "커피원두 찌꺼기",
        imageURL: "coffeeBeanIngredients",
        description: "종량제 봉투로 배출",
      },
      {
        id: "94",
        name: "코르크따개",
        imageURL: "corkscrew",
        description:
          " 수거원이 다치지 않도록 종이 등으로 감싸서 배출, 재질에 맞게 해당 분리수거함으로 배출",
      },
      {
        id: "95",
        name: "코르크마개",
        imageURL: "corkStopper",
        description: "종량제 봉투로 배출",
      },
      {
        id: "96",
        name: "종이(코팅)",
        imageURL: "coatedPaper",
        description: "종량제 봉투로 배출",
      },
      {
        id: "97",
        name: "콘센트",
        imageURL: "powerSocket",
        description: "종량제 봉투로 배출",
      },
      {
        id: "98",
        name: "콘텍트렌즈",
        imageURL: "contactLenses",
        description: "종량제 봉투로 배출",
      },
      {
        id: "99",
        name: "쿠션",
        imageURL: "cushion",
        description: "종량제 봉투에 담을 수 없는 경우 대형폐기물로 처리",
      },
      {
        id: "100",
        name: "크레용",
        imageURL: "crayon",
        description: "종량제 봉투로 배출",
      },
      {
        id: "101",
        name: "텐트",
        imageURL: "tent",
        description: "종량제 봉투에 담을 수 없는 경우 대형폐기물로 처리",
      },
      {
        id: "102",
        name: "틀니",
        imageURL: "denture",
        description: "종량제 봉투로 배출",
      },
      {
        id: "103",
        name: "티백(녹차)",
        imageURL: "teaBag",
        description: "종량제 봉투로 배출",
      },
      {
        id: "104",
        name: "파인애플껍질",
        imageURL: "pineapplePeel",
        description: "종량제 봉투로 배출",
      },
      {
        id: "105",
        name: "필름(사진용)",
        imageURL: "photoFilm",
        description: "종량제 봉투로 배출",
      },
      {
        id: "106",
        name: "핫팩",
        imageURL: "hotPack",
        description: "종량제 봉투로 배출",
      },
      {
        id: "107",
        name: "헝겊",
        imageURL: "hotPack",
        description: "종량제 봉투로 배출",
      },
      {
        id: "108",
        name: "헬멧",
        imageURL: "helmet",
        description: "분리하여 재질별로 분리배출 가능",
      },
      {
        id: "109",
        name: "호일",
        imageURL: "lab",
        description: "종량제 봉투로 배출",
      },
    ],
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
