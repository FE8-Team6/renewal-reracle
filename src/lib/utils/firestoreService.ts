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
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fricebag.svg?alt=media&token=6bb3365a-3708-4ad5-b88a-019f1d0f3702",
        description:
          "종이 쌀포대는 재활용이 가능합니다. 분리배출표시가 없다면 한쪽 면만 코팅된 종이포대는 종이류로, 양면이 모두 코팅된 종이류는 비닐류로 배출하시기 바랍니다.",
      },
      {
        id: "3",
        name: "수첩",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fnotebook.svg?alt=media&token=7d79f77d-e55e-4705-bb28-d4dec92f3e7d",
        description: "스프링 등 종이류와 다른 재질은 제거한 후 배출해야합니다.",
      },
      {
        id: "4",
        name: "잡지",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmagazine.svg?alt=media&token=501b8ba1-af6e-46b0-9593-40683c4806fb",
        description: "스프링 등 종이류와 다른 재질은 제거한 후 배출해야합니다.",
      },
      {
        id: "5",
        name: "가격표",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FpriceTag.svg?alt=media&token=264cbb16-733d-417c-a6be-5e8dead0bb76",
        description:
          "물기에 젖지 않도록 하고 반듯하게 펴서 차곡차곡 쌓은 후 묶어서 배출 해야 합니다. 또한, 비닐코팅된 광고지, 비닐류, 기타 오물이 섞이지 않도록 해야 합니다.",
      },
      {
        id: "6",
        name: "골판지",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcardboard.svg?alt=media&token=67e38859-2882-468a-8aa0-b86d44996f7b",
        description:
          "비닐코팅 부분, 상자에 붙어있는 테이프ㆍ철핀, 알루미늄박 등을 제거하고 접어서 배출 - 야외 별도 보관 장소마련 등 다른 종이류와 섞이지 않게 배출 해야 합니다.",
      },
      {
        id: "7",
        name: "전단지",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fflyer.svg?alt=media&token=93f78d20-0438-4d02-8ef5-041571b3f459",
        description:
          "비닐 코팅된 종이, 공책의 스프링, 비닐포장지 등은 제거 후 배출 해야 합니다.",
      },
      {
        id: "8",
        name: "종이컵",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FpaperCup.svg?alt=media&token=79ccda7c-bd9e-4df0-b20a-614f4f01ae53",
        description:
          "내용물을 비우고 물로 헹군 후 압착하여 투명한 비닐에 넣어서 배출 해야 합니다.",
      },
      {
        id: "9",
        name: "명함",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbusinessCard.svg?alt=media&token=2ed838e5-a7f8-4d8f-a7c8-9482e72c643b",
        description:
          "일반 쓰레기로 배출하면 됩니다. 하지만, 개인정보 유출 우려가 있을 경우 파쇄 후 배출 해야 합니다.",
      },
      {
        id: "10",
        name: "백과사전",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbusinessCard.svg?alt=media&token=2ed838e5-a7f8-4d8f-a7c8-9482e72c643b",
        description:
          "비닐 코팅된 종이, 공책의 스프링, 비닐포장지 등은 제거 후 배출 해야 합니다.",
      },
      {
        id: "11",
        name: "종이상자",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fpaperbox.svg?alt=media&token=65dc632b-7a81-477a-a01f-59ca61994f92",
        description:
          "비닐코팅 부분, 상자에 붙어있는 테이프ㆍ철핀, 알루미늄박 등을 제거하고 접어서 배출 - 야외 별도 보관 장소마련 등 다른 종이류와 섞이지 않게 배출 해야 합니다.",
      },
      {
        id: "12",
        name: "책",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbook.svg?alt=media&token=2e7d7a18-b744-4c5b-be34-a13b7176a58d",
        description:
          "비닐 코팅된 종이, 공책의 스프링, 비닐포장지 등은 제거 후 배출 해야 합니다.",
      },
      {
        id: "13",
        name: "캘린더",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcalendar.svg?alt=media&token=38362a56-7201-451a-b661-328121d038bb",
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
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmilkpack.svg?alt=media&token=8f216eae-030a-4b5d-90d2-ba6247ade1c7",
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
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fspray.svg?alt=media&token=568c16eb-c7ef-44c3-9c05-fc3dedc6fff5",
        description: "내용물을 제거한 후 배출 해야 합니다.",
      },
      {
        id: "2",
        name: "통조림",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FcannedFood.svg?alt=media&token=e41ec9a4-eaca-466e-8b5a-b2256107166f",
        description:
          "내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출 해야 합니다. 담배꽁초 등 이물질을 넣지 않고 배출 해야 합니다. 플라스틱 뚜껑 등 금속캔과 다른 재질은 제거한 후 배출 해야 합니다.",
      },
      {
        id: "3",
        name: "음료캔",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcan.svg?alt=media&token=0944300a-43c6-4db2-8989-f2897cdce304",
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
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fwashingmachine.svg?alt=media&token=4bf9376a-303b-40ea-907f-0c44b0884c1f",
        description:
          "세탁기는 폐가전 무상방문수거 서비스를 통해 배출합니다. 세탁기, 냉장고, TV, 에어컨 등 대형 가전제품은 1개 품목이라도 무료수거를 신청할 수 있고, 청소기, 전기밥솥, 모니터 등의 소형 가전제품은 배출 품목이 5개 이상일 때 무료 수거 신청을 할 수 있습니다. 또한, 대형 생활 폐기물로 폐기물 스티커를 발급받아 버릴 수도 있습니다. 지자체별로 수거 품목이 다를 수 있으므로 주민센터, 구청 등을 통해 품목을 먼저 확인해야합니다.",
      },
      {
        id: "2",
        name: "텔레비전",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftv.svg?alt=media&token=5a3977cf-8d2e-4376-9a64-035e120b942d",
        description:
          "세탁기는 폐가전 무상방문수거 서비스를 통해 배출합니다. 세탁기, 냉장고, TV, 에어컨 등 대형 가전제품은 1개 품목이라도 무료수거를 신청할 수 있고, 청소기, 전기밥솥, 모니터 등의 소형 가전제품은 배출 품목이 5개 이상일 때 무료 수거 신청을 할 수 있습니다. 또한, 대형 생활 폐기물로 폐기물 스티커를 발급받아 버릴 수도 있습니다. 지자체별로 수거 품목이 다를 수 있으므로 주민센터, 구청 등을 통해 품목을 먼저 확인해야합니다.",
      },
      {
        id: "3",
        name: "냉장고",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Frefrigerator.svg?alt=media&token=5bc6012b-340a-4cf9-a575-f3aeaa7d59c9",
        description:
          "더 이상 사용할 수 없는 냉장고는 폐가전 무상방문수거 서비스를 통해 배출합니다. 냉장고, 세탁기, 에어컨, TV 등 대형 가전제품은 1개 품목이라도 신청할 수 있고, 청소기, 전기밥솥, 모니터 등 소형 가전제품은 배출 품목이 5개 이상일 때 무료 수거 신청을 할 수 있습니다. 대형 생활 폐기물처럼 유료로 폐기물 스티커를 발급받아 버릴 수도 있습니다. 지자체별로 수거 품목이 다를 수 있으므로 주민센터, 구청 등을 통해 품목을 먼저 확인해야합니다.",
      },
      {
        id: "4",
        name: "가습기",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fhumidifier.svg?alt=media&token=66044415-be9c-4c27-a626-e01c346fdf1f",
        description:
          "주민센터, 구청, 아파트 관리사무소 등에 설치된 소형 가전 전용 수거함에 배출하세요. 수거함을 찾기 어려운 경우, 비닐봉지에 담아 재활용품 수거일에 배출하시면 됩니다.",
      },
      {
        id: "5",
        name: "오디오세트",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FaudioSet.svg?alt=media&token=3e24fc26-eeb3-4780-9a17-830f1c6f8ac6",
        description:
          "오디오세트는 '폐가전 무상 방문 수거 서비스'를 통해 무료로 수거할 수 있는 품목 중 하나입니다.",
      },
      {
        id: "6",
        name: "정수기",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwaterPurifier.svg?alt=media&token=b6d276f7-aa7b-4e6f-87e5-e1f4824ad739",
        description: "정수기 버리는 방법",
      },
      {
        id: "7",
        name: "스캐너",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fscanner.svg?alt=media&token=79845c70-15ea-436b-8d79-87cd7778ca7a",
        description: "스캐너 버리는 방법",
      },
      {
        id: "8",
        name: "스피커",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fspeaker.svg?alt=media&token=3ba57d54-f92e-4a0c-8084-28e6e9228310",
        description: "스피커 버리는 방법",
      },
      {
        id: "9",
        name: "식기세척기",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fdishwasher.svg?alt=media&token=af863df6-fb52-4ab7-bd3f-d71168540aa1",
        description: "식기세척기 버리는 방법",
      },
      {
        id: "10",
        name: "선풍기",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ffan.svg?alt=media&token=50cac052-8d5d-42d5-bcb4-2769de063c4e",
        description: "선풍기 버리는 방법",
      },
      {
        id: "11",
        name: "비디오카메라",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fvideocamera.svg?alt=media&token=569cab8c-f2f7-46fd-aefa-cb2b1493fa4d",
        description: "비디오카메라 버리는 방법",
      },
      {
        id: "12",
        name: "비데",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbidet.svg?alt=media&token=504bd7f1-55f9-4256-8e5f-c3d97846b77b",
        description: "비데 버리는 방법",
      },
      {
        id: "13",
        name: "스탠드",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fstand.svg?alt=media&token=9b951869-a721-4616-9967-bc761cfc47a4",
        description: "스탠드 버리는 방법",
      },
      {
        id: "14",
        name: "온풍기",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fheater.svg?alt=media&token=a32b1382-81e0-489c-b099-099e4d568ac1",
        description: "온풍기 버리는 방법",
      },
      {
        id: "15",
        name: "와인셀러",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwineCeller.svg?alt=media&token=6d188021-131a-4820-907c-2d98e040ee21",
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
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FriceCooker.svg?alt=media&token=eebf9db3-51bf-4058-9f41-f21dbdb5c82f",
        description: "전기밥솥 버리는 방법",
      },
      {
        id: "18",
        name: "전기포트",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FelectricPot.svg?alt=media&token=3dcae96a-d307-4e79-bf84-1556684ab3e1",
        description: "전기포트 버리는 방법",
      },
      {
        id: "19",
        name: "전자레인지",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmicrowave.svg?alt=media&token=39436034-f09a-4811-a6c3-4afdc97c541b",
        description: "전자레인지 버리는 방법",
      },
      {
        id: "20",
        name: "전자사전",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FelectronicDictionary.svg?alt=media&token=1aa64f1c-4311-4bcc-bb43-9542949e4317",
        description: "전자사전 버리는 방법",
      },
      {
        id: "21",
        name: "전화기",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftelephone.svg?alt=media&token=b67c74fa-817f-4fa6-abb5-b34e46c9bbe9",
        description: "전화기 버리는 방법",
      },
      {
        id: "22",
        name: "청소기",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcleaner.svg?alt=media&token=b35a1782-5fd9-4262-a0cc-2de5239294b2",
        description: "청소기 버리는 방법",
      },
      {
        id: "23",
        name: "키보드",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fkeyboard.svg?alt=media&token=4e17520f-47b0-4404-afc0-a0d2074ef955",
        description: "키보드 버리는 방법",
      },
      {
        id: "24",
        name: "커피메이커",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FcoffeeMaker.svg?alt=media&token=a6559abb-3da4-4897-ad40-2e410f8e6144",
        description: "커피메이커 버리는 방법",
      },
      {
        id: "25",
        name: "컴퓨터",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcomputer.svg?alt=media&token=c4ae9ad8-93a7-4b21-ac05-cf1cd66bceab",
        description: "컴퓨터 버리는 방법",
      },
      {
        id: "26",
        name: "토스터기",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftoasters.svg?alt=media&token=8b890b10-5fd3-49d6-a3a3-9e2066c74678",
        description: "토스터기 버리는 방법",
      },
      {
        id: "27",
        name: "프린터",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fprinter.svg?alt=media&token=e19dff61-2f3d-4533-bf26-9f1a1c5a63ce",
        description: "프린터 버리는 방법",
      },
      {
        id: "28",
        name: "헤드폰",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fheadphone.svg?alt=media&token=dba5ffea-7d7c-4ddb-ab4d-8f3718ce96e5",
        description: "헤드폰 버리는 방법",
      },
      {
        id: "29",
        name: "휴대용플레이어",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FportablePlayer.svg?alt=media&token=2a3e55ed-7d3d-46e9-97e9-e31251e26d5f",
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
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ffurniture.svg?alt=media&token=99474f05-df66-45de-9ccc-bfb2428f12a8",
        description: "대형 생활 폐기물로 신고 한 후 스티커 부착",
      },
      {
        id: "2",
        name: "씽크대",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fsink.svg?alt=media&token=0bc5b1aa-6fe4-4a7f-8cee-65019380b82a",
        description: "대형 생활 폐기물로 신고 한 후 스티커 부착",
      },
      {
        id: "3",
        name: "나뭇가지",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwoodPiece.svg?alt=media&token=12fdd09a-fff3-4a51-a1e2-0bc9bb2bcb76",
        description: "나뭇가지 버리는 방법",
      },
      {
        id: "4",
        name: "낚싯대",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FfishingRod.svg?alt=media&token=f4a0ad3c-eb21-4e48-9f9c-90abdac2245a",
        description: "낚싯대 버리는 방법",
      },
      {
        id: "5",
        name: "골프백",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FgolfBag.svg?alt=media&token=6aa26311-1e9d-4d4f-b7bc-43a7167bacc4",
        description: "골프백 버리는 방법",
      },
      {
        id: "6",
        name: "악기",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Finstrument.svg?alt=media&token=a645b2f1-8330-4ffc-89e7-7f5a0a445db1",
        description: "악기 버리는 방법",
      },
      {
        id: "7",
        name: "라켓",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fracket.svg?alt=media&token=51d8f574-1bed-4213-8745-42cbdb5eda8c",
        description: "라켓 버리는 방법",
      },
      {
        id: "8",
        name: "목발",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcrutch.svg?alt=media&token=35214de1-7d8c-4f2e-9ff1-ab1c5d5ca482",
        description: "목발 버리는 방법",
      },
      {
        id: "9",
        name: "목재",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Flumber.svg?alt=media&token=374497d1-152b-413a-a292-2dce7e1d3531",
        description: "목재 버리는 방법",
      },
      {
        id: "10",
        name: "문짝",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fdoor.svg?alt=media&token=b3bb928c-4013-4577-b2ba-bef567d06b32",
        description: "문짝 버리는 방법",
      },
      {
        id: "11",
        name: "매트",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FairMat.svg?alt=media&token=014bfee0-b1ec-42db-ac54-43f517b072f7",
        description: "매트 버리는 방법",
      },
      {
        id: "12",
        name: "바베큐그릴",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbbqGrill.svg?alt=media&token=a36fd756-c4e5-4ed4-87ab-c5dc01610c90",
        description: "바베큐그릴 버리는 방법",
      },
      {
        id: "13",
        name: "밥상",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftable.svg?alt=media&token=9b9eb3d3-ebae-4526-993d-322043af5154",
        description: "밥상 버리는 방법",
      },
      {
        id: "14",
        name: "시계",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fclock.svg?alt=media&token=139b6564-f2a2-4ab2-a03c-8b1b22a3ec1a",
        description: "시계 버리는 방법",
      },
      {
        id: "15",
        name: "블라인드",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fblind.svg?alt=media&token=f3dc087e-5dd8-48b3-8afc-6b06f0c77017",
        description: "블라인드 버리는 방법",
      },
      {
        id: "16",
        name: "사다리",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fladder.svg?alt=media&token=7c6b3445-ba67-405a-b733-7af9abce74e2",
        description: "사다리 버리는 방법",
      },
      {
        id: "17",
        name: "삽",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fshovel.svg?alt=media&token=caa89f76-48d8-437a-83e5-3204ac3fdadb",
        description: "삽 버리는 방법",
      },
      {
        id: "18",
        name: "쌀통",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FriceContainer.svg?alt=media&token=42c65760-a6e8-4103-9716-137d57d5b14e",
        description: "쌀통 버리는 방법",
      },
      {
        id: "19",
        name: "서랍장",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fdrawers.svg?alt=media&token=db3cd4fa-f21b-4325-8480-613c6605b141",
        description: "서랍장 버리는 방법",
      },
      {
        id: "20",
        name: "세면대",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fwashbasin.svg?alt=media&token=71c54eb7-29ad-4ea0-8e9f-d883678a47ed",
        description: "세면대 버리는 방법",
      },
      {
        id: "21",
        name: "솜이불",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbedding.svg?alt=media&token=7835d9f9-8f42-4d0b-8bb4-5e83fc55fa66",
        description: "솜이불 버리는 방법",
      },
      {
        id: "22",
        name: "수족관, 어항",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Faquarium.svg?alt=media&token=dca01537-0bca-4d03-b6b3-93471f0a132e",
        description: "수족관, 어항 버리는 방법",
      },
      {
        id: "23",
        name: "스노우보드",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fsnowboard.svg?alt=media&token=41d26a15-eb66-49b9-9c51-75c7b902eb49",
        description: "스노우보드 버리는 방법",
      },
      {
        id: "24",
        name: "스키용구류",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FskiEquipment.svg?alt=media&token=9f35944a-848b-451c-82de-eda034063894",
        description: "스키용구류 버리는 방법",
      },
      {
        id: "25",
        name: "식물",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fplant.svg?alt=media&token=75fcaf84-5bbe-4052-8afa-7d65bb72707e",
        description: "식물, 나무 버리는 방법",
      },
      {
        id: "26",
        name: "신발장",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FshoeRack.svg?alt=media&token=db15a8c4-7f9c-413a-b674-bcff7b27af52",
        description: "신발장 버리는 방법",
      },
      {
        id: "27",
        name: "아기욕조",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbabyBath.svg?alt=media&token=771b3c5c-aa4d-4e38-aa04-adce48dd8d19",
        description: "아기욕조 버리는 방법",
      },
      {
        id: "28",
        name: "침대",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbed.svg?alt=media&token=8ff9b2a5-7d63-4e60-bd4e-90602703ea1f",
        description: "침대 버리는 방법",
      },
      {
        id: "29",
        name: "액자",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Falbum.svg?alt=media&token=b305f76a-7c25-4a6b-a3b5-0561a6c7b13c",
        description: "액자 버리는 방법",
      },
      {
        id: "30",
        name: "여행가방",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FtravelBag.svg?alt=media&token=c3b800aa-8e02-47e9-aaba-8d67db5a84ba",
        description: "여행가방 버리는 방법",
      },
      {
        id: "31",
        name: "유리판",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FglassPlate.svg?alt=media&token=eb31dd8c-2cc9-486e-86ad-dc59475f1e91",
        description: "유리판 버리는 방법",
      },
      {
        id: "32",
        name: "유모차",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fstroller.svg?alt=media&token=c445a902-8623-4250-9ced-86bb72f5a0ce",
        description: "유모차 버리는 방법",
      },
      {
        id: "33",
        name: "의자",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fchair.svg?alt=media&token=afc3be68-e300-452a-9e17-5a2116a5fcbf",
        description: "의자 버리는 방법",
      },
      {
        id: "34",
        name: "이불",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbedding.svg?alt=media&token=7835d9f9-8f42-4d0b-8bb4-5e83fc55fa66",
        description: "이불 버리는 방법",
      },
      {
        id: "35",
        name: "인형",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fdoll.svg?alt=media&token=53d35af3-8ed0-4c82-ada6-1c80d66ec784",
        description: "인형 버리는 방법",
      },
      {
        id: "36",
        name: "자전거",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbicycle.svg?alt=media&token=7640651d-e538-4791-bb55-41ee2e65d37b",
        description: "자전거 버리는 방법",
      },
      {
        id: "37",
        name: "장난감류",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftoys.svg?alt=media&token=de39d0b7-a982-4d03-97d1-d632a7e8160a",
        description: "장난감류 버리는 방법",
      },
      {
        id: "38",
        name: "대걸레",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmop.svg?alt=media&token=f8d2e25c-cef7-4394-bf5a-10dca5e6502d",
        description: "자루걸레 버리는 방법",
      },
      {
        id: "39",
        name: "장롱",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fwardrobe.svg?alt=media&token=6a25c4b4-e318-4f6a-bd70-57ad6c5759b7",
        description: "장롱 버리는 방법",
      },
      {
        id: "40",
        name: "장식장",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fdresser.svg?alt=media&token=5b88770c-d39a-437a-acbd-84caa0285420",
        description: "장식장 버리는 방법",
      },
      {
        id: "41",
        name: "장판",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FvinylFlooring.svg?alt=media&token=c8dda934-99e8-41a4-bef8-0b8902123b7a",
        description: "장판 버리는 방법",
      },
      {
        id: "42",
        name: "전기장판",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FvinylFlooring.svg?alt=media&token=c8dda934-99e8-41a4-bef8-0b8902123b7a",
        description: "전기장판 버리는 방법",
      },
      {
        id: "43",
        name: "피아노",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FelectronicPiano.svg?alt=media&token=c0134cd6-83f2-411d-836b-a0e8d8e61e21",
        description: "피아노 버리는 방법",
      },
      {
        id: "44",
        name: "진열대",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fshelf.svg?alt=media&token=09b0a4e8-99c4-467d-ab9b-d1fa4102e362",
        description: "진열대 버리는 방법",
      },
      {
        id: "45",
        name: "책상",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftable.svg?alt=media&token=9b9eb3d3-ebae-4526-993d-322043af5154",
        description: "책상 버리는 방법",
      },
      {
        id: "46",
        name: "천체망원경",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftelescope.svg?alt=media&token=dba12208-034c-46e3-bc47-373c3432385e",
        description: "천체망원경 버리는 방법",
      },
      {
        id: "47",
        name: "체중계",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FweightMeasuringMachine.svg?alt=media&token=587bccb5-32c1-46da-8249-1e96c77e1ae0",
        description: "체중계 버리는 방법",
      },
      {
        id: "48",
        name: "카펫",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcarpet.svg?alt=media&token=743c6c44-de1f-472b-b6fe-6667cc0deff3",
        description: "카펫 버리는 방법",
      },
      {
        id: "49",
        name: "캐비넷",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcabinet.svg?alt=media&token=055099b9-cf3b-469b-b8d6-db51f545f701",
        description: "캐비넷 버리는 방법",
      },
      {
        id: "50",
        name: "커튼",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcurtain.svg?alt=media&token=832ab7ae-eba6-47ff-b9a8-c18865bc0ab7",
        description: "커튼 버리는 방법",
      },
      {
        id: "51",
        name: "쿠션",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcushion.svg?alt=media&token=0c16c0e3-c268-44d3-bb11-c4d6d2d7b2f6",
        description: "쿠션 버리는 방법",
      },
      {
        id: "52",
        name: "텐트",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftent.svg?alt=media&token=30f2929e-b07c-462a-b5f4-a62b14c66b0a",
        description: "텐트 버리는 방법",
      },
      {
        id: "53",
        name: "항아리",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fjar.svg?alt=media&token=fb4317e7-c8cd-427f-bd23-2c57bf2a1445",
        description: "항아리 버리는 방법",
      },
      {
        id: "54",
        name: "화로",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbrazier.svg?alt=media&token=7d8de9f2-a5b5-4c91-8f04-eb92d8d9baa2",
        description: "화로 버리는 방법",
      },
      {
        id: "55",
        name: "화장대",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fvanity.svg?alt=media&token=98468ba3-5f0c-44ad-b190-296bbdc34154",
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
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbananaPeel.svg?alt=media&token=5e1ac525-9cb3-4ce8-af35-ab22b38951df",
        description: "음식물 쓰레기에 버리세요",
      },
      {
        id: "2",
        name: "상한음식",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FrottenFood.svg?alt=media&token=cb883e53-dead-45e8-b276-9b952c203584",
        description: "음식물 쓰레기에 버리세요",
      },
      {
        id: "3",
        name: "생선",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ffish.svg?alt=media&token=dcf9c679-d6fa-405d-8c1c-ef2f29b1335e",
        description: "일반 쓰레기로 분류되어 종량제 봉투에 버리세요",
      },
      {
        id: "4",
        name: "오렌지껍질",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2ForangePeel.svg?alt=media&token=504768ae-6ee2-471e-8d0d-5df4091b753f",
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
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbattery.svg?alt=media&token=2e8b3a9d-0715-4ae4-b9bb-132da5266d69",
        description:
          "폐건전는 망간, 수은, 카드뮴 등 중그목 유해물질을 함유하고 있습니다. 환경오염 및 인체에 나쁜 영향을 일으킬 수 있으므로 전용수거함에 안전하게 배출 해야 합니다.",
      },
      {
        id: "2",
        name: "폐형광등",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FfluorescentLamp.svg?alt=media&token=286dbf55-8140-4cbc-acae-ff731dd86c03",
        description:
          "형광등 안에는 유해물질인 수은이 함유되어 있습니다. 인체에 위험한 수은이 노출되지 않도록 깨어지지 않게 주의하여 전용 수거함에 안전하게 배출 해야 합니다.",
      },
      {
        id: "3",
        name: "폐의약품",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmedicine.svg?alt=media&token=f08a722c-a23e-4785-b41f-db4e7216c0f8",
        description:
          "가정 내 폐의약품이 매립되거나 도시하수로 배출될 경우 공기, 토양, 수질 등의 환경오염을 유발하고 생태계 고랸의 원인이 됩니다. 폐의약품은 모아서 약국에 비치된 전용수거함으로 배출 해야 합니다.",
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
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmirror.svg?alt=media&token=5bc3cf9b-cd53-4f33-b44d-21955b95aea3",
        description:
          "불연성폐기물로 배출 크기가 많이 큰 경우에 대형 폐기물로 배출",
      },
      {
        id: "2",
        name: "그릇",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbowl.svg?alt=media&token=64ab0051-4666-414e-89e4-2ccd0ef38559",
        description: "불연성폐기물로 배출",
      },
      {
        id: "3",
        name: "깨진유리",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbrokenGlass.svg?alt=media&token=9b12e66a-801f-465c-b76d-b7e137b30a7d",
        description: "",
      },
      {
        id: "4",
        name: "내열 식기류",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FheatResistantTableware.svg?alt=media&token=27cc7c46-21d4-439b-a90c-910656d8f2ad",
        description: "불연성폐기물로 배출",
      },
      {
        id: "5",
        name: "도자기",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fceramic.svg?alt=media&token=f29aefd3-8e47-443e-a8c2-957af152211c",
        description: "불연성폐기물로 배출",
      },
      {
        id: "6",
        name: "뚝배기",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FearthenPot.svg?alt=media&token=ecc11ccc-af65-4223-a53a-e2bb96b7938e",
        description: "불연성폐기물로 배출",
      },
      {
        id: "7",
        name: "머그컵",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FmugCup.svg?alt=media&token=4206881a-f01e-4c1c-ac39-44a5dc04dcd6",
        description: "불연성폐기물로 배출",
      },
      {
        id: "8",
        name: "백열전구",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FincandescentLightBulb.svg?alt=media&token=bd774686-cd64-44de-a661-f639a9c5c1a6",
        description: "불연성폐기물로 배출",
      },
      {
        id: "9",
        name: "벽돌",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbrick.svg?alt=media&token=ab1fb7a3-4625-44ab-89c9-9d8717533ade",
        description: "불연성폐기물로 배출",
      },
      {
        id: "10",
        name: "유리판,유리제품",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FglassPlate.svg?alt=media&token=a24779d4-74e9-48ec-9520-d7841946eb5f",
        description:
          "불연성폐기물로 배출 크기가 많이 큰 경우에 대형 폐기물로 배출",
      },
      {
        id: "11",
        name: "재떨이(도자기,유리)",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fashtray.svg?alt=media&token=5db806db-7b6e-45d9-b989-40d0b55e090c",
        description: "불연성폐기물로 배출",
      },
      {
        id: "12",
        name: "찻잔(도자기류)",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fteacup.svg?alt=media&token=32c0cc51-97de-4020-9d3d-56308a6ee382",
        description: "불연성폐기물로 배출",
      },
      {
        id: "13",
        name: "컵(도자기,유리컵)",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcup.svg?alt=media&token=9f085991-a8a2-478c-bef8-88dbea4bafa4",
        description: "불연성폐기물로 배출",
      },
      {
        id: "14",
        name: "화분",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fpot.svg?alt=media&token=cb98a531-c5f4-443b-87c1-64a46d0c3b5d",
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
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fwig.svg?alt=media&token=dc66032a-224c-4004-b241-a6096f12b20a",
        description: "종량제 봉투로 배출",
      },
      {
        id: "2",
        name: "가위",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fscissors.svg?alt=media&token=19f9be46-2c94-49aa-b999-49d21e5fb96e",
        description:
          "재질에 맞게 배출하되,여러재질이 섞인 경우,종량제 봉투로 배출",
      },
      {
        id: "3",
        name: "걸레",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fdishcloth.svg?alt=media&token=752fcd51-a8ea-4b44-88b9-e27d3ef5464d",
        description: "종량제 봉투로 배출",
      },
      {
        id: "4",
        name: "계란껍질",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Feggshell.svg?alt=media&token=c2e7f922-80e8-4d9d-92ad-43d5da29bbc7",
        description: "종량제 봉투로 배출",
      },
      {
        id: "5",
        name: "고무장갑",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FrubberGlove.svg?alt=media&token=0845ce78-0d81-494c-a76f-0bce0537363a",
        description: "종량제 봉투로 배출",
      },
      {
        id: "6",
        name: "골프공",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FgolfBall.svg?alt=media&token=91bc6a08-bf22-49cb-89a2-c98669ad433c",
        description: "종량제 봉투로 배출",
      },
      {
        id: "7",
        name: "나무국자",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwoodenLadle.svg?alt=media&token=bee49bf1-c00f-49f8-8b6b-9bcb0918c74d",
        description: "종량제 봉투로 배출",
      },
      {
        id: "8",
        name: "나무젓가락",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwoodenChopsticks.svg?alt=media&token=b6287349-5a79-4d9f-b952-10ff21f64b16",
        description: "종량제 봉투로 배출",
      },
      {
        id: "9",
        name: "나무조각",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwoodPiece.svg?alt=media&token=d75ce597-9ec0-49e6-9b48-cf513ac5972b",
        description: "종량제 봉투에 담을 수 없는경우 대형폐기물로 처리",
      },
      {
        id: "10",
        name: "나뭇가지",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwoodPiece.svg?alt=media&token=12fdd09a-fff3-4a51-a1e2-0bc9bb2bcb76",
        description: "종량제 봉투에 담을 수 없는경우 대형폐기물로 처리",
      },
      {
        id: "11",
        name: "나무줄기",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FtreeTrunk.svg?alt=media&token=75bebd8d-e3d3-4752-9bd2-da5aa142c49c",
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
        name: "보온병",
        imageURL: "thermos",
        description: "종량제 봉투로 배출",
      },
      {
        id: "38",
        name: "볼펜",
        imageURL: "pen",
        description: "종량제 봉투로 배출",
      },
      {
        id: "39",
        name: "붓",
        imageURL: "brush",
        description: "종량제 봉투로 배출",
      },
      {
        id: "40",
        name: "비닐코팅종이",
        imageURL: "vinylCoatedPaper",
        description: "종량제 봉투로 배출",
      },
      {
        id: "41",
        name: "빗",
        imageURL: "comb",
        description:
          "재질에 맞게 배출하되 나무 빗 등은 쓰레기 종량제봉투로 배출",
      },
      {
        id: "42",
        name: "사인펜",
        imageURL: "markerPen",
        description: "종량제 봉투로 배출",
      },
      {
        id: "43",
        name: "사진",
        imageURL: "picture",
        description: "종량제 봉투로 배출",
      },
      {
        id: "44",
        name: "사진인화지",
        imageURL: "photoPaper",
        description: "종량제 봉투로 배출",
      },
      {
        id: "45",
        name: "생선뼈",
        imageURL: "fishBone",
        description: "종량제 봉투로 배출",
      },
      {
        id: "46",
        name: "샤프펜슬",
        imageURL: "mechanicalPencil",
        description: "종량제 봉투로 배출",
      },
      {
        id: "47",
        name: "성냥",
        imageURL: "matches",
        description: "물에 적신 후 종량제 봉투로 배출",
      },
      {
        id: "48",
        name: "송곳",
        imageURL: "awl",
        description: "종량제 봉투로 배출",
      },
      {
        id: "49",
        name: "수세미",
        imageURL: "scrubbers",
        description: "종량제 봉투로 배출",
      },
      {
        id: "50",
        name: "숯",
        imageURL: "charcoal",
        description: "종량제 봉투로 배출",
      },
      {
        id: "51",
        name: "스폰지",
        imageURL: "sponge",
        description: "종량제 봉투로 배출",
      },
      {
        id: "52",
        name: "시계",
        imageURL: "watch",
        description:
          "종량제 종투에 담을 수 없는 경우 대형폐기물로 처리, 건전지는 분리하여 전용수거함으로 배출",
      },
      {
        id: "53",
        name: "신발",
        imageURL: "shoes",
        description: "종량제 봉투로 배출",
      },
      {
        id: "54",
        name: "아이스팩",
        imageURL: "icePack",
        description: "종량제 봉투로 배출",
      },
      {
        id: "55",
        name: "애완동물 용변 시트",
        imageURL: "petToiletSeat",
        description: "종량제 봉투로 배출",
      },
      {
        id: "56",
        name: "야구공",
        imageURL: "baseballBall",
        description: "종량제 봉투로 배출",
      },
      {
        id: "57",
        name: "야구글러브",
        imageURL: "baseballGlove",
        description: "종량제 봉투로 배출",
      },
      {
        id: "58",
        name: "나무야구배트",
        imageURL: "woodenBaseballBat",
        description: "종량제 봉투로 배출",
      },
      {
        id: "59",
        name: "양초",
        imageURL: "candle",
        description: "종량제 봉투로 배출",
      },
      {
        id: "60",
        name: "에어매트",
        imageURL: "airMat",
        description: "종량제 봉투에 담을 수 없는경우 대형폐기물로 처리",
      },
      {
        id: "61",
        name: "연필(색연필)",
        imageURL: "pencil",
        description: "종량제 봉투로 배출",
      },
      {
        id: "62",
        name: "연필깎이",
        imageURL: "pencilSharpener",
        description: "종량제 봉투로 배출",
      },
      {
        id: "63",
        name: "요가매트",
        imageURL: "yogaMat",
        description: "종량제 봉투로 배출",
      },
      {
        id: "64",
        name: "우산",
        imageURL: "umbrella",
        description:
          "뼈대와 비닐을 분리하여, 각각의 분리수거함으로 배출,분리가 어렵다면 종량제봉투로 배출",
      },
      {
        id: "65",
        name: "자석",
        imageURL: "magnet",
        description: "종량제 봉투로 배출",
      },
      {
        id: "66",
        name: "전기코드",
        imageURL: "electricalCord",
        description: "종량제 봉투로 배출",
      },
      {
        id: "67",
        name: "전동칫솔",
        imageURL: "electricToothbrush",
        description: "종량제 봉투로 배출",
      },
      {
        id: "68",
        name: "접착제",
        imageURL: "glue",
        description: "종량제 봉투로 배출",
      },
      {
        id: "69",
        name: "젖꼭지(아기용품)",
        imageURL: "nipple",
        description: "종량제 봉투로 배출",
      },
      {
        id: "70",
        name: "조각칼",
        imageURL: "carvingKnife",
        description: "수거원이 다치지 않도록 종이 등으로 감싸서 배출",
      },
      {
        id: "71",
        name: "종이기저귀",
        imageURL: "paperDiapers",
        description: "종량제 봉투로 배출",
      },
      {
        id: "72",
        name: "줄자",
        imageURL: "tapeMeasure",
        description: "재질에 맞게 배출 또는 종량제 봉투로 배출",
      },
      {
        id: "73",
        name: "지우개",
        imageURL: "eraser",
        description: "종량제 봉투로 배출",
      },
      {
        id: "74",
        name: "차 찌꺼기",
        imageURL: "teaIngredients",
        description: "종량제 봉투로 배출",
      },
      {
        id: "75",
        name: "체온계",
        imageURL: "thermometer",
        description: "건전지는 분리하여 전용수거함으로 배출",
      },
      {
        id: "76",
        name: "체중계",
        imageURL: "weightMeasuringMachine",
        description: "종량제 봉투에 담을 수 없는 경우 대형폐기물로 처리",
      },
      {
        id: "77",
        name: "축구공",
        imageURL: "soccer",
        description: "종량제 봉투로 배출",
      },
      {
        id: "78",
        name: "커피원두 찌꺼기",
        imageURL: "coffeeBeanIngredients",
        description: "종량제 봉투로 배출",
      },
      {
        id: "79",
        name: "코르크따개",
        imageURL: "corkscrew",
        description:
          " 수거원이 다치지 않도록 종이 등으로 감싸서 배출, 재질에 맞게 해당 분리수거함으로 배출",
      },
      {
        id: "80",
        name: "코르크마개",
        imageURL: "corkStopper",
        description: "종량제 봉투로 배출",
      },
      {
        id: "81",
        name: "콘센트",
        imageURL: "powerSocket",
        description: "종량제 봉투로 배출",
      },
      {
        id: "82",
        name: "콘텍트렌즈",
        imageURL: "contactLenses",
        description: "종량제 봉투로 배출",
      },
      {
        id: "83",
        name: "크레용",
        imageURL: "crayon",
        description: "종량제 봉투로 배출",
      },
      {
        id: "84",
        name: "틀니",
        imageURL: "denture",
        description: "종량제 봉투로 배출",
      },
      {
        id: "85",
        name: "티백(녹차)",
        imageURL: "teaBag",
        description: "종량제 봉투로 배출",
      },
      {
        id: "86",
        name: "파인애플껍질",
        imageURL: "pineapplePeel",
        description: "종량제 봉투로 배출",
      },
      {
        id: "87",
        name: "필름(사진용)",
        imageURL: "photoFilm",
        description: "종량제 봉투로 배출",
      },
      {
        id: "88",
        name: "핫팩",
        imageURL: "hotPack",
        description: "종량제 봉투로 배출",
      },
      {
        id: "89",
        name: "헝겊",
        imageURL: "pieceofcloth",
        description: "종량제 봉투로 배출",
      },
      {
        id: "90",
        name: "헬멧",
        imageURL: "helmet",
        description: "분리하여 재질별로 분리배출 가능",
      },
      {
        id: "91",
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
