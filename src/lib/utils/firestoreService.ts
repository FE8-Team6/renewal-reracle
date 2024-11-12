import { db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

/**
 * @recyclingInstructions WasteCategories 컬렉션에 쓰레기 분류 카테고리를 저장합니다.
 */
const wasteCategories = [
  {
    id: '1',
    name: '종이',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fpaper.svg?alt=media&token=d480eeac-df0e-4d3e-95c0-fce061e70f25',
    items: [
      {
        id: '1',
        name: '신문지',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fnewspaper.svg?alt=media&token=3d789c90-5ae7-41a2-bec1-eb61ea0ebf37',
        recyclingInstructions: [
          '물기에 젖지 않도록 하고 반듯하게 펴서 차곡차곡 쌓은 후 묶어서 배출합니다. 비닐코팅된 광고지, 비닐류, 기타 오물이 섞이지 않도록 해야 합니다.',
        ],
      },
      {
        id: '2',
        name: '쌀포대',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fricebag.svg?alt=media&token=6bb3365a-3708-4ad5-b88a-019f1d0f3702',
        recyclingInstructions: [
          '종이 쌀포대는 재활용이 가능합니다.',
          '분리배출표시가 없다면 한쪽 면만 코팅된 종이포대는 종이류로, 양면이 모두 코팅된 종이류는 비닐류로 배출하시기 바랍니다.',
        ],
      },
      {
        id: '3',
        name: '수첩',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fnotebook.svg?alt=media&token=7d79f77d-e55e-4705-bb28-d4dec92f3e7d',
        recyclingInstructions: [
          '수첩에 있는 스프링이나 철제 부분을 제거합니다. 스프링은 금속류로 분류되므로 별도로 고철 수거함에 배출할 수 있습니다',
          '비닐이나 플라스틱으로 코팅된 표지가 있다면 이를 제거해서 배출해주세요. 코팅된 표지는 일반 종이와 함께 재활용되기 어렵습니다.',
        ],
      },
      {
        id: '4',
        name: '잡지',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmagazine.svg?alt=media&token=501b8ba1-af6e-46b0-9593-40683c4806fb',
        recyclingInstructions: [
          '잡지에 스프링이 있다면 먼저 제거하고, 스프링은 금속류로 별도 분리배출 해야 합니다.',
          '비닐 코팅된 겉표지는 일반쓰레기로 분류하고, 내부의 종이 부분은 종이류 재활용으로 분리하세요.',
          '종이 부분에 붙어있는 스티커나 테이프 등 이물질은 가능한 한 제거합니다.',
        ],
      },
      {
        id: '5',
        name: '가격표',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FpriceTag.svg?alt=media&token=264cbb16-733d-417c-a6be-5e8dead0bb76',
        recyclingInstructions: [
          '가격표가 물에 젖지 않도록 주의해야 합니다. 젖은 종이는 재활용이 어려워집니다.',
          '만약 가격표에 비닐코팅이 되어 있다면, 가능한 한 이를 제거해야 합니다. 비닐코팅된 부분은 일반 종이와 함께 재활용되기 어렵습니다',
          '비닐류나 기타 오물이 섞이지 않도록 주의해야 합니다. 순수한 종이 재질만 종이류 재활용품으로 배출해야 합니다',
        ],
      },
      {
        id: '6',
        name: '골판지',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcardboard.svg?alt=media&token=67e38859-2882-468a-8aa0-b86d44996f7b',
        recyclingInstructions: [
          '비닐코팅 부분, 테이프, 철핀, 알루미늄박 등을 모두 제거합니다. 택배 송장이나 스티커도 제거해야 합니다.',
          '골판지가 물에 젖거나 오염되지 않도록 주의합니다. 젖거나 오염된 골판지는 재활용이 어려워집니다.',
        ],
      },
      {
        id: '7',
        name: '전단지',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fflyer.svg?alt=media&token=93f78d20-0438-4d02-8ef5-041571b3f459',
        recyclingInstructions: [
          '전단지에 비닐 코팅이 되어 있다면 이를 제거 해야 합니다. 비닐 코팅된 부분은 일반 종이와 함께 재활용되기 어렵습니다.',
          '전단지에 붙어있는 스티커, 테이프 등의 이물질을 모두 제거합니다.',
          '비닐포장지가 있다면 이를 분리합니다. 비닐은 별도로 비닐류 재활용품으로 배출해야 합니다.',
        ],
      },
      {
        id: '8',
        name: '종이컵',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FpaperCup.svg?alt=media&token=79ccda7c-bd9e-4df0-b20a-614f4f01ae53',
        recyclingInstructions: [
          '종이컵 안에 남아있는 음료나 내용물을 완전히 비우고, 종이류 재활용 수거함에 배출하면 됩니다.',
        ],
      },
      {
        id: '9',
        name: '명함',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbusinessCard.svg?alt=media&token=2ed838e5-a7f8-4d8f-a7c8-9482e72c643b',
        recyclingInstructions: [
          '일반 쓰레기로 배출하면 됩니다. 하지만, 개인정보 유출 우려가 있을 경우 파쇄 후 배출 해야 합니다.',
        ],
      },
      {
        id: '10',
        name: '백과사전',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbusinessCard.svg?alt=media&token=2ed838e5-a7f8-4d8f-a7c8-9482e72c643b',
        recyclingInstructions: ['비닐 코팅된 종이, 공책의 스프링, 비닐포장지 등은 제거 후 배출 해야 합니다.'],
      },
      {
        id: '11',
        name: '종이상자',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fpaperbox.svg?alt=media&token=65dc632b-7a81-477a-a01f-59ca61994f92',
        recyclingInstructions: [
          '비닐코팅 부분, 상자에 붙어있는 테이프ㆍ철핀, 알루미늄박 등을 제거하고 접어서 배출 해야 합니다.',
          '야외 별도 보관 장소마련 등 다른 종이류와 섞이지 않게 배출 해야 합니다.',
        ],
      },
      {
        id: '12',
        name: '책',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbook.svg?alt=media&token=2e7d7a18-b744-4c5b-be34-a13b7176a58d',
        recyclingInstructions: ['비닐 코팅된 종이, 공책의 스프링, 비닐포장지 등은 제거 후 배출 해야 합니다.'],
      },
      {
        id: '13',
        name: '캘린더',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcalendar.svg?alt=media&token=38362a56-7201-451a-b661-328121d038bb',
        recyclingInstructions: ['비닐 코팅된 종이, 공책의 스프링, 비닐포장지 등은 제거 후 배출 해야 합니다.'],
      },
    ],
  },
  {
    id: '2',
    name: '종이팩',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fpaperpack.svg?alt=media&token=9045901c-c2de-44cf-8a79-76c0367d7438',
    items: [
      {
        id: '1',
        name: '우유팩',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmilkpack.svg?alt=media&token=8f216eae-030a-4b5d-90d2-ba6247ade1c7',
        recyclingInstructions: [
          '내용물을 비우고, 물로 깨끗이 세척해서 배출 해야 합니다.',
          '또한, 빨대, 비닐, 플라스틱 뚜껑 등 다른 재질은 분리해서 재질별로 분리 배출 해야 합니다.',
        ],
      },
    ],
  },
  {
    id: '3',
    name: '금속 캔',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fcan.svg?alt=media&token=daee1290-725d-435c-b14b-84b7d51759ef',
    items: [
      {
        id: '1',
        name: '스프레이',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fspray.svg?alt=media&token=568c16eb-c7ef-44c3-9c05-fc3dedc6fff5',
        recyclingInstructions: [
          '스프레이 용기에 남아있는 가스를 완전히 배출 해야 합니다.',
          '내용물과 가스가 완전히 제거된 스프레이 용기는 캔류 재활용품으로 배출합니다.',
        ],
      },
      {
        id: '2',
        name: '통조림',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FcannedFood.svg?alt=media&token=e41ec9a4-eaca-466e-8b5a-b2256107166f',
        recyclingInstructions: [
          '내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출 해야 합니다.',
          '플라스틱 뚜껑 등 금속캔과 다른 재질은 제거한 후 배출 해야 합니다.',
          '처리가 완료된 통조림 캔은 금속캔 재활용품으로 배출합니다.',
        ],
      },
      {
        id: '3',
        name: '음료캔',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcan.svg?alt=media&token=0944300a-43c6-4db2-8989-f2897cdce304',
        recyclingInstructions: [
          '내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출 해야 합니다.',
          '플라스틱 뚜껑 등 금속캔과 다른 재질은 제거한 후 배출 해야 합니다.',
          '처리가 완료된 통조림 캔은 금속캔 재활용품으로 배출합니다.',
        ],
      },
    ],
  },
  {
    id: '4',
    name: '고철',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2FscrapMetal.svg?alt=media&token=628fa921-5c4b-4380-a4bb-a924d13ff9d3',
    items: [
      {
        id: '1',
        name: '나사(못)',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '2',
        name: '낫',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FsickleHandle.svg?alt=media&token=6d23d912-bcae-4800-9887-c091f7b9a81candle',
        recyclingInstructions: ['고철로 배출하되, 가능하다면 손잡이 부분(나무재질 등)을 분리하여 배출합니다.'],
      },
      {
        id: '3',
        name: '도끼',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '4',
        name: '분유',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '5',
        name: '맥주병뚜껑',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '6',
        name: '쓰레받기',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '7',
        name: '사다리',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fladder.svg?alt=media&token=7c6b3445-ba67-405a-b733-7af9abce74e2',
        recyclingInstructions: [
          '대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.',
          '금속 재질이 많은 경우 고철로 분류하여 재활용센터에 배출할 수 있습니다.',
        ],
      },
      {
        id: '8',
        name: '옷걸이',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '9',
        name: '유리병 뚜껑',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '10',
        name: '의류건조대',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '11',
        name: '아령',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '12',
        name: '압력솥',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '13',
        name: '역기',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '14',
        name: '철사',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '15',
        name: '철판(가정요리용)',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '16',
        name: '캔 따개',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '17',
        name: '톱',
        imageURL: '',
        recyclingInstructions: [],
      },
      {
        id: '18',
        name: '후라이팬',
        imageURL: '',
        recyclingInstructions: [],
      },
    ],
  },
  {
    id: '5',
    name: '유리병',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2FglassBottle.svg?alt=media&token=6245a4da-8309-4f00-ae3e-787fafbd4434',
    items: [
      {
        id: '1',
        name: '유리병',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2FglassBottle.svg?alt=media&token=6245a4da-8309-4f00-ae3e-787fafbd4434',
        recyclingInstructions: [
          '병뚜껑을 제거한 후 내용물을 비우고 물로 헹구어 배출합니다.',
          '담배꽁초 등 이물질을 넣지 않도록 주의합니다.',
          '깨진 병은 재활용되지 않으므로 일반 쓰레기로 배출해야 합니다.',
        ],
      },
    ],
  },
  {
    id: '6',
    name: '플라스틱',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fplastic.svg?alt=media&token=03b1cb19-1537-4766-a5cf-2f2ed6519a94',
    items: [
      {
        id: '1',
        name: '국자',
        imageURL: '',
        recyclingInstructions: [
          '음식물 등 이물질을 깨끗이 제거합니다.',
          '여러 재질이 섞인 경우, 분리 가능한 부분은 분리하여 배출합니다.',
        ],
      },
      {
        id: '2',
        name: '그릇',
        imageURL: '',
        recyclingInstructions: [
          '음식물 등 이물질을 깨끗이 제거합니다.',
          '여러 재질이 섞인 경우, 분리 가능한 부분은 분리하여 배출합니다.',
        ],
      },
      {
        id: '3',
        name: '도마',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwoodenCuttingBoard.svg?alt=media&token=5323a935-2cf7-4dbc-8809-cd42740c0516',
        recyclingInstructions: [
          '음식물 등 이물질을 깨끗이 제거합니다.',
          '여러 재질이 섞인 경우, 분리 가능한 부분은 분리하여 배출합니다.',
        ],
      },
      {
        id: '4',
        name: '빨대',
        imageURL: '',
        recyclingInstructions: ['깨끗이 세척 후 배출합니다.'],
      },
      {
        id: '5',
        name: '볼풀공',
        imageURL: '',
        recyclingInstructions: ['깨끗이 세척 후 배출합니다.'],
      },
      {
        id: '6',
        name: '분무기',
        imageURL: '',
        recyclingInstructions: ['금속 스프링을 제거 후 배출합니다.'],
      },
      {
        id: '7',
        name: '리코더',
        imageURL: '',
        recyclingInstructions: ['금속 부분을 제거하고 배출합니다.'],
      },
      {
        id: '8',
        name: '마요네즈용기',
        imageURL: '',
        recyclingInstructions: [
          '내용물을 완전히 비우고 물로 깨끗이 헹굽니다.',
          '라벨을 제거하고 압착하여 부피를 줄입니다.',
        ],
      },
      {
        id: '9',
        name: '메가폰',
        imageURL: '',
        recyclingInstructions: ['전지를 제거한 후 배출합니다.'],
      },
      {
        id: '10',
        name: '쓰레받기',
        imageURL: '',
        recyclingInstructions: ['이물질을 깨끗이 제거한 후 배출합니다.'],
      },
      {
        id: '11',
        name: '식용유용기',
        imageURL: '',
        recyclingInstructions: [
          '내용물을 완전히 비우고 물로 깨끗이 헹굽니다.',
          '라벨을 제거하고 압착하여 부피를 줄입니다.',
        ],
      },
      {
        id: '12',
        name: '비디오테이프',
        imageURL: '',
        recyclingInstructions: ['케이스와 테이프를 분리하여 재질에 맞게 배출합니다.'],
      },
      {
        id: '13',
        name: '샴푸용기',
        imageURL: '',
        recyclingInstructions: [
          '내용물을 완전히 비우고 물로 깨끗이 헹굽니다.',
          '라벨을 제거하고 압착하여 부피를 줄입니다.',
        ],
      },
      {
        id: '14',
        name: '의류건조대',
        imageURL: '',
        recyclingInstructions: ['금속 부분을 분리하여 배출합니다.'],
      },
      {
        id: '15',
        name: '젖병',
        imageURL: '',
        recyclingInstructions: ['고무 젖꼭지를 제거 후 배출합니다.'],
      },
      {
        id: '16',
        name: '치약용기',
        imageURL: '',
        recyclingInstructions: [
          '내용물을 완전히 비우고 물로 깨끗이 헹굽니다.',
          '라벨을 제거하고 압착하여 부피를 줄입니다.',
        ],
      },
      {
        id: '17',
        name: '캡',
        imageURL: '',
        recyclingInstructions: ['페트병이나 유리병에서 분리하여 따로 배출합니다.'],
      },
      {
        id: '18',
        name: '컵',
        imageURL: '',
        recyclingInstructions: ['이물질을 깨끗이 제거한 후 배출합니다.'],
      },
      {
        id: '19',
        name: '케찹용기',
        imageURL: '',
        recyclingInstructions: [
          '내용물을 완전히 비우고 물로 깨끗이 헹굽니다.',
          '라벨을 제거하고 압착하여 부피를 줄입니다.',
        ],
      },
      {
        id: '20',
        name: '페트병',
        imageURL: '',
        recyclingInstructions: [
          '내용물을 비우고 헹군 후, 라벨을 제거합니다.',
          '가능한 압착하여 부피를 줄이고 뚜껑을 닫아 배출합니다.',
        ],
      },
    ],
  },
  {
    id: '7',
    name: '비닐',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fvinyl.svg?alt=media&token=85092708-fa1b-449a-b2b1-2e355999ec0d',
    items: [
      {
        id: '1',
        name: '비닐봉지',
        imageURL: '',
        recyclingInstructions: [
          '색상이나 재활용 마크에 관계없이 모든 비닐봉지는 재활용이 가능합니다.',
          '내용물을 비우고 이물질을 제거한 후 깨끗이 씻어서 배출합니다.',
          '투명한 비닐봉투에 담아 배출하거나, 여러 장을 모아서 묶어 배출합니다.',
          '음식물 등 이물질로 오염되어 제거하기 곤란한 경우는 종량제 봉투에 담아 배출합니다.',
        ],
      },
      {
        id: '2',
        name: '완충재(뽁뽁이)',
        imageURL: '',
        recyclingInstructions: [
          '뽁뽁이는 비닐류로 분류되어 재활용이 가능합니다.',
          '테이프나 스티커 등이 붙어있다면 깨끗이 제거합니다.',
          '이물질이 묻어있으면 물로 깨끗이 세척한 후 배출합니다.',
          '세척한 뽁뽁이는 다른 비닐류와 함께 투명한 비닐봉투에 담아 배출합니다.',
        ],
      },
    ],
  },
  {
    id: '8',
    name: '발포합성',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fstyrofoam.svg?alt=media&token=0c7dc678-b6b4-4751-a31e-6eb57d4bf0a9',
    items: [
      {
        id: '1',
        name: '스티로폼 완충재',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/styrofoam.svg?alt=media&token=75ee5827-29db-4948-89d3-d6e26f4cc9e3',
        recyclingInstructions: [
          '내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출한다.',
          '부착상표 등 스티로폼과 다른 재질은 제거한 후 배출한다.',
        ],
      },
    ],
  },
  {
    id: '9',
    name: '의류',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fclothes.svg?alt=media&token=c7912347-56f8-4b44-adf7-efe41a7c5c48',
    items: [
      {
        id: '1',
        name: '구두, 샌들, 슬리퍼',
        imageURL: '',
        recyclingInstructions: [
          '재사용이 가능한 상태라면 의류수거함에 배출합니다.',
          '심하게 훼손되었거나 재사용이 불가능한 경우 종량제 봉투에 버립니다.',
          '일부 지자체에서는 의류수거함에 신발류를 수거하지 않을 수 있으므로, 지역 규정을 확인하세요.',
        ],
      },
      {
        id: '2',
        name: '모자',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fhat.svg?alt=media&token=56c20dfc-6d97-4edb-a7d3-ad31fb0b04ad',
        recyclingInstructions: [
          '깨끗하고 재사용 가능한 상태의 모자는 의류수거함에 배출합니다.',
          '너무 낡아서 재사용이 불가능한 모자는 일반쓰레기(종량제 봉투)로 버립니다.',
          '밀짚모자는 종량제 봉투에 버립니다.',
        ],
      },
      {
        id: '3',
        name: '머플러(목도리)',
        imageURL: '',
        recyclingInstructions: [
          '깨끗하고 재사용 가능한 상태라면 의류수거함에 배출합니다.',
          '오염되거나 훼손된 경우 종량제 봉투에 버립니다.',
        ],
      },
      {
        id: '4',
        name: '의류',
        imageURL: '',
        recyclingInstructions: [
          '깨끗하고 재사용 가능한 의류는 의류수거함에 배출합니다.',
          '젖은 옷이나 이물질이 묻은 옷은 잘 말리고 세탁한 후 배출합니다.',
          '재활용이 불가능할 정도로 훼손된 의류는 종량제 봉투에 버립니다.',
        ],
      },
    ],
  },
  {
    id: '10',
    name: '가전제품',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Felectronics.svg?alt=media&token=4114f7c6-70e8-496c-b276-24a74c6df52b',
    items: [
      {
        id: '1',
        name: '세탁기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fwashingmachine.svg?alt=media&token=4bf9376a-303b-40ea-907f-0c44b0884c1f',
        recyclingInstructions: [
          '세탁기는 폐가전 무상방문수거 서비스를 통해 배출합니다.',
          '세탁기, 냉장고, TV, 에어컨 등 대형 가전제품은 1개 품목이라도 무료수거를 신청할 수 있고, 청소기, 전기밥솥, 모니터 등의 소형 가전제품은 배출 품목이 5개 이상일 때 무료 수거 신청을 할 수 있습니다. 또한, 대형 생활 폐기물로 폐기물 스티커를 발급받아 버릴 수도 있습니다.',
          '지자체별로 수거 품목이 다를 수 있으므로 주민센터, 구청 등을 통해 품목을 먼저 확인해야합니다.',
        ],
      },
      {
        id: '2',
        name: '텔레비전',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftv.svg?alt=media&token=5a3977cf-8d2e-4376-9a64-035e120b942d',
        recyclingInstructions: [
          '세탁기는 폐가전 무상방문수거 서비스를 통해 배출합니다.',
          '세탁기, 냉장고, TV, 에어컨 등 대형 가전제품은 1개 품목이라도 무료수거를 신청할 수 있고, 청소기, 전기밥솥, 모니터 등의 소형 가전제품은 배출 품목이 5개 이상일 때 무료 수거 신청을 할 수 있습니다. 또한, 대형 생활 폐기물로 폐기물 스티커를 발급받아 버릴 수도 있습니다.',
          '지자체별로 수거 품목이 다를 수 있으므로 주민센터, 구청 등을 통해 품목을 먼저 확인 해야 합니다.',
        ],
      },
      {
        id: '3',
        name: '냉장고',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Frefrigerator.svg?alt=media&token=5bc6012b-340a-4cf9-a575-f3aeaa7d59c9',
        recyclingInstructions: [
          '더 이상 사용할 수 없는 냉장고는 폐가전 무상방문수거 서비스를 통해 배출합니다.',
          '냉장고, 세탁기, 에어컨, TV 등 대형 가전제품은 1개 품목이라도 신청할 수 있고, 청소기, 전기밥솥, 모니터 등 소형 가전제품은 배출 품목이 5개 이상일 때 무료 수거 신청을 할 수 있습니다. 대형 생활 폐기물처럼 유료로 폐기물 스티커를 발급받아 버릴 수도 있습니다.',
          '지자체별로 수거 품목이 다를 수 있으므로 주민센터, 구청 등을 통해 품목을 먼저 확인 해야 합니다.',
        ],
      },
      {
        id: '4',
        name: '가습기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fhumidifier.svg?alt=media&token=66044415-be9c-4c27-a626-e01c346fdf1f',
        recyclingInstructions: [
          '주민센터, 구청, 아파트 관리사무소 등에 설치된 소형 가전 전용 수거함에 배출하세요.',
          '수거함을 찾기 어려운 경우, 비닐봉지에 담아 재활용품 수거일에 배출하시면 됩니다.',
        ],
      },
      {
        id: '5',
        name: '오디오세트',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FaudioSet.svg?alt=media&token=3e24fc26-eeb3-4780-9a17-830f1c6f8ac6',
        recyclingInstructions: [
          "오디오세트는 폐가전 제품으로 분류되며, 정부에서 제공하는 '폐가전 무상 방문 수거 서비스'를 통해 무료로 수거할 수 있습니다.",
          '해당 서비스를 이용하려면 지역의 환경부 또는 관련 기관의 웹사이트를 방문하여 신청할 수 있습니다.',
        ],
      },
      {
        id: '6',
        name: '정수기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwaterPurifier.svg?alt=media&token=b6d276f7-aa7b-4e6f-87e5-e1f4824ad739',
        recyclingInstructions: [
          '정수기는 대형 가전제품으로 분류되어 "폐가전 무상 방문 수거 서비스"를 통해 무료로 수거할 수 있습니다.',
          '환경부 홈페이지나 관련 기관의 웹사이트를 방문하여 수거 신청을 합니다.',
          '전화(1599-0903)나 온라인을 통해 수거 일정을 조율할 수 있습니다.',
        ],
      },
      {
        id: '7',
        name: '스캐너',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fscanner.svg?alt=media&token=79845c70-15ea-436b-8d79-87cd7778ca7a',
        recyclingInstructions: [
          '스캐너는 소형 가전제품으로 분류되며, "폐가전 무상 방문 수거 서비스"를 통해 무료로 수거할 수 있습니다.',
          '환경부 홈페이지나 관련 기관의 웹사이트를 방문하여 수거 신청을 합니다.',
          '전화(1599-0903)나 온라인을 통해 수거 일정을 조율할 수 있습니다.',
        ],
      },
      {
        id: '8',
        name: '스피커',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fspeaker.svg?alt=media&token=3ba57d54-f92e-4a0c-8084-28e6e9228310',
        recyclingInstructions: [
          '스피커를 포함한 5개 이상의 소형 가전제품을 한 번에 버릴 경우, 무상으로 수거해 갑니다.',
          '대형 스피커의 경우 단독으로도 무상수거가 가능합니다.',
          '환경부 홈페이지나 전화(1599-0903)를 통해 신청할 수 있습니다.',
        ],
      },
      {
        id: '9',
        name: '식기세척기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fdishwasher.svg?alt=media&token=af863df6-fb52-4ab7-bd3f-d71168540aa1',
        recyclingInstructions: [
          '식기세척기는 대형 폐가전제품으로 분류되어 무상으로 수거 가능합니다.',
          '환경부에서 운영하는 "폐가전제품 무상방문수거 서비스"를 이용하면 됩니다.',
        ],
      },
      {
        id: '10',
        name: '선풍기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ffan.svg?alt=media&token=50cac052-8d5d-42d5-bcb4-2769de063c4e',
        recyclingInstructions: [
          '높이 1미터 이상의 대형 선풍기: 대형 폐기물로 분류됩니다.',
          '높이 1미터 이하의 가정용 선풍기: 소형 가전제품으로 분류됩니다.',
          '1미터 이상 선풍기 처리 방법: 구입한 스티커를 선풍기에 부착 후 지정된 수거일에 거주지 앞 지정 장소에 배출합니다.',
          '1미터 이하 선풍기 처리 방법: 구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출합니다.',
        ],
      },
      {
        id: '11',
        name: '비디오카메라',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fvideocamera.svg?alt=media&token=569cab8c-f2f7-46fd-aefa-cb2b1493fa4d',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출합니다.',
          '5개 이상의 소형 가전과 함께 폐가전제품 무상방문수거 서비스(1599-0903)를 이용할 수 있습니다.',
        ],
      },
      {
        id: '12',
        name: '비데',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbidet.svg?alt=media&token=504bd7f1-55f9-4256-8e5f-c3d97846b77b',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출합니다.',
          '5개 이상의 소형 가전과 함께 폐가전제품 무상방문수거 서비스(1599-0903)를 이용할 수 있습니다.',
          '완전히 분해하여 플라스틱, 금속 등으로 분리배출도 가능합니다.',
        ],
      },
      {
        id: '13',
        name: '스탠드',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fstand.svg?alt=media&token=9b951869-a721-4616-9967-bc761cfc47a4',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '형광등은 분리하여 전용 수거함에 배출합니다.',
          '본체는 소형 가전 수거함에 배출하거나, 5개 이상의 소형 가전과 함께 폐가전제품 무상방문수거 서비스(1599-0903)를 이용할 수 있습니다.',
        ],
      },
      {
        id: '14',
        name: '온풍기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fheater.svg?alt=media&token=a32b1382-81e0-489c-b099-099e4d568ac1',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출합니다.',
          '5개 이상의 소형 가전과 함께 폐가전제품 무상방문수거 서비스(1599-0903)를 이용할 수 있습니다.',
        ],
      },
      {
        id: '15',
        name: '와인셀러',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwineCeller.svg?alt=media&token=6d188021-131a-4820-907c-2d98e040ee21',
        recyclingInstructions: [
          '대형 가전제품으로 분류됩니다.',
          '폐가전제품 무상방문수거 서비스(1599-0903)를 이용하여 배출합니다.',
          '또는 구청에서 대형 폐기물 스티커를 구입하여 부착 후 지정된 수거일에 배출합니다.',
        ],
      },
      {
        id: '16',
        name: '에어컨',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Faircon.svg?alt=media&token=9c3a3bd7-1de2-4834-b2b3-9e7a74c936c2',
        recyclingInstructions: [
          '대형 가전제품으로 분류됩니다.',
          '폐가전제품 무상방문수거 서비스(1599-0903)를 이용하여 배출합니다.',
          '또는 구청에서 대형 폐기물 스티커를 구입하여 부착 후 지정된 수거일에 배출합니다.',
        ],
      },
      {
        id: '17',
        name: '전기밥솥',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FriceCooker.svg?alt=media&token=eebf9db3-51bf-4058-9f41-f21dbdb5c82f',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출합니다.',
          '5개 이상의 소형 가전과 함께 폐가전제품 무상방문수거 서비스(1599-0903)를 이용할 수 있습니다.',
        ],
      },
      {
        id: '18',
        name: '전기포트',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FelectricPot.svg?alt=media&token=3dcae96a-d307-4e79-bf84-1556684ab3e1',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출합니다.',
          '5개 이상의 소형 가전과 함께 폐가전제품 무상방문수거 서비스(1599-0903)를 이용할 수 있습니다.',
        ],
      },
      {
        id: '19',
        name: '전자레인지',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmicrowave.svg?alt=media&token=39436034-f09a-4811-a6c3-4afdc97c541b',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '폐가전제품 무상방문수거 서비스(1599-0903)를 통해 배출할 수 있습니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출할 수 있습니다.',
        ],
      },
      {
        id: '20',
        name: '전자사전',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FelectronicDictionary.svg?alt=media&token=1aa64f1c-4311-4bcc-bb43-9542949e4317',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '5개 이상의 소형 가전과 함께 폐가전제품 무상방문수거 서비스(1599-0903)를 이용할 수 있습니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출할 수 있습니다.',
        ],
      },
      {
        id: '21',
        name: '전화기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftelephone.svg?alt=media&token=b67c74fa-817f-4fa6-abb5-b34e46c9bbe9',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '5개 이상의 소형 가전과 함께 폐가전제품 무상방문수거 서비스(1599-0903)를 이용할 수 있습니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출할 수 있습니다.',
        ],
      },
      {
        id: '22',
        name: '청소기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcleaner.svg?alt=media&token=b35a1782-5fd9-4262-a0cc-2de5239294b2',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '폐가전제품 무상방문수거 서비스(1599-0903)를 통해 배출할 수 있습니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출할 수 있습니다.',
          '대형 생활 폐기물로 처리할 경우, 구청에서 스티커를 구입하여 부착 후 배출할 수 있습니다.',
        ],
      },
      {
        id: '23',
        name: '키보드',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fkeyboard.svg?alt=media&token=4e17520f-47b0-4404-afc0-a0d2074ef955',
        recyclingInstructions: [
          '소형 폐가전으로 분류됩니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출할 수 있습니다.',
          '5개 이상의 소형 가전과 함께 폐가전제품 무상방문수거 서비스(1599-0903)를 이용할 수 있습니다.',
        ],
      },
      {
        id: '24',
        name: '커피메이커',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FcoffeeMaker.svg?alt=media&token=a6559abb-3da4-4897-ad40-2e410f8e6144',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '5개 이상의 소형 가전과 함께 폐가전제품 무상방문수거 서비스(1599-0903)를 이용할 수 있습니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출할 수 있습니다.',
        ],
      },
      {
        id: '25',
        name: '컴퓨터',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcomputer.svg?alt=media&token=c4ae9ad8-93a7-4b21-ac05-cf1cd66bceab',
        recyclingInstructions: [
          '데스크탑 세트(본체 + 모니터)는 폐가전제품 무상방문수거 서비스(1599-0903)를 통해 배출할 수 있습니다.',
          '본체만 버릴 경우, 컴퓨터 수거/매입 업체를 통해 처리할 수 있습니다.',
          '대형 생활 폐기물로 처리할 경우, 구청에서 스티커를 구입하여 부착 후 배출할 수 있습니다.',
        ],
      },
      {
        id: '26',
        name: '토스터기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftoasters.svg?alt=media&token=8b890b10-5fd3-49d6-a3a3-9e2066c74678',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '5개 이상의 소형 가전과 함께 폐가전제품 무상방문수거 서비스(1599-0903)를 이용할 수 있습니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출할 수 있습니다.',
        ],
      },
      {
        id: '27',
        name: '프린터',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fprinter.svg?alt=media&token=e19dff61-2f3d-4533-bf26-9f1a1c5a63ce',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '폐가전제품 무상방문수거 서비스(1599-0903)를 통해 배출할 수 있습니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출할 수 있습니다.',
        ],
      },
      {
        id: '28',
        name: '헤드폰',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fheadphone.svg?alt=media&token=dba5ffea-7d7c-4ddb-ab4d-8f3718ce96e5',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '5개 이상의 소형 가전과 함께 폐가전제품 무상방문수거 서비스(1599-0903)를 이용할 수 있습니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출할 수 있습니다.',
        ],
      },
      {
        id: '29',
        name: '휴대용플레이어',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FportablePlayer.svg?alt=media&token=2a3e55ed-7d3d-46e9-97e9-e31251e26d5f',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '5개 이상의 소형 가전과 함께 폐가전제품 무상방문수거 서비스(1599-0903)를 이용할 수 있습니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출할 수 있습니다.',
        ],
      },
    ],
  },
  {
    id: '11',
    name: '대형',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2FlargeWaste.svg?alt=media&token=8c5d383f-0d67-416d-83a6-9787c60aab9f',
    items: [
      {
        id: '1',
        name: '가구류',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ffurniture.svg?alt=media&token=99474f05-df66-45de-9ccc-bfb2428f12a8',
        recyclingInstructions: [
          '대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.',
          '가능한 분리하여 배출하면 수거가 용이합니다.',
        ],
      },
      {
        id: '2',
        name: '씽크대',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fsink.svg?alt=media&token=0bc5b1aa-6fe4-4a7f-8cee-65019380b82a',
        recyclingInstructions: [
          '대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.',
          '금속 부분은 가능한 분리하여 재활용품으로 배출합니다.',
        ],
      },
      {
        id: '3',
        name: '나뭇가지',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwoodPiece.svg?alt=media&token=12fdd09a-fff3-4a51-a1e2-0bc9bb2bcb76',
        recyclingInstructions: [
          '길이 1m 이내, 지름 20cm 이내로 자른 후 묶어서 배출합니다.',
          '대량 발생 시 구청에 문의하여 처리합니다.',
        ],
      },
      {
        id: '4',
        name: '낚싯대',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FfishingRod.svg?alt=media&token=f4a0ad3c-eb21-4e48-9f9c-90abdac2245a',
        recyclingInstructions: ['낚싯대 버리는 방법'],
      },
      {
        id: '5',
        name: '골프백',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FgolfBag.svg?alt=media&token=6aa26311-1e9d-4d4f-b7bc-43a7167bacc4',
        recyclingInstructions: ['골프백 버리는 방법'],
      },
      {
        id: '6',
        name: '악기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Finstrument.svg?alt=media&token=a645b2f1-8330-4ffc-89e7-7f5a0a445db1',
        recyclingInstructions: [
          '대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.',
          '재사용이 가능한 경우 재활용센터 등에 기부를 고려해볼 수 있습니다.',
        ],
      },
      {
        id: '7',
        name: '라켓',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fracket.svg?alt=media&token=51d8f574-1bed-4213-8745-42cbdb5eda8c',
        recyclingInstructions: ['라켓 버리는 방법'],
      },
      {
        id: '8',
        name: '목발',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcrutch.svg?alt=media&token=35214de1-7d8c-4f2e-9ff1-ab1c5d5ca482',
        recyclingInstructions: ['목발 버리는 방법'],
      },
      {
        id: '9',
        name: '목재',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Flumber.svg?alt=media&token=374497d1-152b-413a-a292-2dce7e1d3531',
        recyclingInstructions: [
          '대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.',
          '못 등 금속 부분은 가능한 제거하여 재활용품으로 배출합니다.',
        ],
      },
      {
        id: '10',
        name: '문짝',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fdoor.svg?alt=media&token=b3bb928c-4013-4577-b2ba-bef567d06b32',
        recyclingInstructions: [
          '대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.',
          '못 등 금속 부분은 가능한 제거하여 재활용품으로 배출합니다.',
        ],
      },
      {
        id: '11',
        name: '매트',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FairMat.svg?alt=media&token=014bfee0-b1ec-42db-ac54-43f517b072f7',
        recyclingInstructions: [
          '대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.',
          '가능한 작게 접거나 묶어서 배출합니다.',
        ],
      },
      {
        id: '12',
        name: '바베큐그릴',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbbqGrill.svg?alt=media&token=a36fd756-c4e5-4ed4-87ab-c5dc01610c90',
        recyclingInstructions: [
          '대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.',
          '금속 재질이 많은 경우 고철로 분류하여 재활용센터에 배출할 수 있습니다.',
        ],
      },
      {
        id: '13',
        name: '밥상',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftable.svg?alt=media&token=9b9eb3d3-ebae-4526-993d-322043af5154',
        recyclingInstructions: ['밥상 버리는 방법'],
      },
      {
        id: '14',
        name: '시계',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fclock.svg?alt=media&token=139b6564-f2a2-4ab2-a03c-8b1b22a3ec1a',
        recyclingInstructions: [
          '대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.',
          '전자제품이 포함된 경우 배터리는 분리하여 전용 수거함에 배출합니다.',
        ],
      },
      {
        id: '15',
        name: '블라인드',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fblind.svg?alt=media&token=f3dc087e-5dd8-48b3-8afc-6b06f0c77017',
        recyclingInstructions: [
          '대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.',
          '가능한 작게 접거나 묶어서 배출합니다.',
        ],
      },
      {
        id: '16',
        name: '사다리',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fladder.svg?alt=media&token=7c6b3445-ba67-405a-b733-7af9abce74e2',
        recyclingInstructions: [
          '대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.',
          '금속 재질이 많은 경우 고철로 분류하여 재활용센터에 배출할 수 있습니다.',
        ],
      },
      {
        id: '17',
        name: '삽',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fshovel.svg?alt=media&token=caa89f76-48d8-437a-83e5-3204ac3fdadb',
        recyclingInstructions: [
          '대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.',
          '금속 재질이 많은 경우 고철로 분류하여 재활용센터에 배출할 수 있습니다.',
        ],
      },
      {
        id: '18',
        name: '쌀통',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FriceContainer.svg?alt=media&token=42c65760-a6e8-4103-9716-137d57d5b14e',
        recyclingInstructions: [
          '대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.',
          '전자제품이 포함된 경우 배터리는 분리하여 전용 수거함에 배출합니다.',
        ],
      },
      {
        id: '19',
        name: '서랍장',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fdrawers.svg?alt=media&token=db3cd4fa-f21b-4325-8480-613c6605b141',
        recyclingInstructions: ['대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.'],
      },
      {
        id: '20',
        name: '세면대',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fwashbasin.svg?alt=media&token=71c54eb7-29ad-4ea0-8e9f-d883678a47ed',
        recyclingInstructions: [
          '대형 생활 폐기물로 신고 후 스티커를 부착하여 배출합니다.',
          '도기나 세라믹 재질은 불연성 폐기물로 처리될 수 있으므로 구청에 문의하는 것이 좋습니다.',
        ],
      },
      {
        id: '21',
        name: '솜이불',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbedding.svg?alt=media&token=7835d9f9-8f42-4d0b-8bb4-5e83fc55fa66',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '일부 지역에서는 종량제 봉투에 담아 배출할 수 있으니 해당 지자체에 문의하세요.',
        ],
      },
      {
        id: '22',
        name: '수족관, 어항',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Faquarium.svg?alt=media&token=dca01537-0bca-4d03-b6b3-93471f0a132e',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '유리 부분은 깨지지 않도록 주의하여 처리합니다.',
        ],
      },
      {
        id: '23',
        name: '스노우보드',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fsnowboard.svg?alt=media&token=41d26a15-eb66-49b9-9c51-75c7b902eb49',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '금속 부분은 가능한 분리하여 고철로 배출합니다.',
        ],
      },
      {
        id: '24',
        name: '스키용구류',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FskiEquipment.svg?alt=media&token=9f35944a-848b-451c-82de-eda034063894',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '금속 부분은 가능한 분리하여 고철로 배출합니다.',
        ],
      },
      {
        id: '25',
        name: '식물',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fplant.svg?alt=media&token=75fcaf84-5bbe-4052-8afa-7d65bb72707e',
        recyclingInstructions: [
          '가지는 50cm 이내로 잘라 묶어서 일반쓰레기로 배출합니다.',
          '화분은 흙을 제거한 후 재질에 따라 분리배출합니다.',
          '대형 식물은 구청에 문의하여 처리합니다.',
        ],
      },
      {
        id: '26',
        name: '신발장',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FshoeRack.svg?alt=media&token=db15a8c4-7f9c-413a-b674-bcff7b27af52',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '가능한 분해하여 배출하면 수거가 용이합니다.',
        ],
      },
      {
        id: '27',
        name: '아기욕조',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbabyBath.svg?alt=media&token=771b3c5c-aa4d-4e38-aa04-adce48dd8d19',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '접을 수 있는 경우 최대한 부피를 줄여 배출합니다.',
        ],
      },
      {
        id: '28',
        name: '침대',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbed.svg?alt=media&token=8ff9b2a5-7d63-4e60-bd4e-90602703ea1f',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '가능한 분해하여 배출하면 수거가 용이합니다.',
        ],
      },
      {
        id: '29',
        name: '액자',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Falbum.svg?alt=media&token=b305f76a-7c25-4a6b-a3b5-0561a6c7b13c',
        recyclingInstructions: [
          '유리, 나무, 금속 등 재질별로 분리하여 배출합니다.',
          '유리는 신문지에 싸서 일반쓰레기로 배출합니다.',
          '나무나 금속 프레임은 재활용품으로 배출합니다.',
        ],
      },
      {
        id: '30',
        name: '여행가방',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FtravelBag.svg?alt=media&token=c3b800aa-8e02-47e9-aaba-8d67db5a84ba',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
        ],
      },
      {
        id: '31',
        name: '유리판',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FglassPlate.svg?alt=media&token=eb31dd8c-2cc9-486e-86ad-dc59475f1e91',
        recyclingInstructions: [
          '신문지 등으로 감싸 안전하게 처리한 후 일반쓰레기로 배출합니다.',
          '대형 유리판은 구청에 문의하여 처리합니다.',
        ],
      },
      {
        id: '32',
        name: '유모차',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fstroller.svg?alt=media&token=c445a902-8623-4250-9ced-86bb72f5a0ce',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '접을 수 있는 경우 최대한 부피를 줄여 배출합니다.',
        ],
      },
      {
        id: '33',
        name: '의자',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fchair.svg?alt=media&token=afc3be68-e300-452a-9e17-5a2116a5fcbf',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
        ],
      },
      {
        id: '34',
        name: '이불',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbedding.svg?alt=media&token=7835d9f9-8f42-4d0b-8bb4-5e83fc55fa66',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '일부 지역에서는 종량제 봉투에 담아 배출할 수 있으니 해당 지자체에 문의하세요.',
        ],
      },
      {
        id: '35',
        name: '인형',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fdoll.svg?alt=media&token=53d35af3-8ed0-4c82-ada6-1c80d66ec784',
        recyclingInstructions: [
          '재질별로 분리가 가능한 경우 분리하여 재활용품으로 배출합니다.',
          '분리가 어려운 경우 일반쓰레기로 배출합니다.',
        ],
      },
      {
        id: '36',
        name: '자전거',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbicycle.svg?alt=media&token=7640651d-e538-4791-bb55-41ee2e65d37b',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '가능한 경우 고철로 분리배출할 수 있습니다.',
        ],
      },
      {
        id: '37',
        name: '장난감류',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftoys.svg?alt=media&token=de39d0b7-a982-4d03-97d1-d632a7e8160a',
        recyclingInstructions: [
          '재질별로 분리가 가능한 경우 분리하여 재활용품으로 배출합니다.',
          '분리가 어려운 경우 일반쓰레기로 배출합니다.',
        ],
      },
      {
        id: '38',
        name: '대걸레',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmop.svg?alt=media&token=f8d2e25c-cef7-4394-bf5a-10dca5e6502d',
        recyclingInstructions: ['일반쓰레기로 배출합니다.', '긴 자루는 50cm 이내로 잘라서 배출합니다.'],
      },
      {
        id: '39',
        name: '장롱',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fwardrobe.svg?alt=media&token=6a25c4b4-e318-4f6a-bd70-57ad6c5759b7',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '가능한 분해하여 배출하면 수거가 용이합니다.',
        ],
      },
      {
        id: '40',
        name: '장식장',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fdresser.svg?alt=media&token=5b88770c-d39a-437a-acbd-84caa0285420',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '가능한 분해하여 배출하면 수거가 용이합니다.',
        ],
      },
      {
        id: '41',
        name: '장판',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FvinylFlooring.svg?alt=media&token=c8dda934-99e8-41a4-bef8-0b8902123b7a',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '1m 이내로 잘라서 묶어 배출하면 수거가 용이합니다.',
        ],
      },
      {
        id: '42',
        name: '전기장판',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FvinylFlooring.svg?alt=media&token=c8dda934-99e8-41a4-bef8-0b8902123b7a',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '전선을 제거하고 분리 배출해야 합니다.',
        ],
      },
      {
        id: '43',
        name: '피아노',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FelectronicPiano.svg?alt=media&token=c0134cd6-83f2-411d-836b-a0e8d8e61e21',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '무게가 무거우므로 전문 업체를 통해 처리하는 것이 좋습니다.',
        ],
      },
      {
        id: '44',
        name: '진열대',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fshelf.svg?alt=media&token=09b0a4e8-99c4-467d-ab9b-d1fa4102e362',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '가능한 분해하여 배출하면 수거가 용이합니다.',
        ],
      },
      {
        id: '45',
        name: '책상',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftable.svg?alt=media&token=9b9eb3d3-ebae-4526-993d-322043af5154',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '가능한 분해하여 배출하면 수거가 용이합니다.',
        ],
      },
      {
        id: '46',
        name: '천체망원경',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftelescope.svg?alt=media&token=dba12208-034c-46e3-bc47-373c3432385e',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '렌즈 등 분리 가능한 부품은 따로 분리하여 배출합니다.',
        ],
      },
      {
        id: '47',
        name: '체중계',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FweightMeasuringMachine.svg?alt=media&token=587bccb5-32c1-46da-8249-1e96c77e1ae0',
        recyclingInstructions: [
          '소형 가전제품으로 분류됩니다.',
          '구청, 주민센터, 아파트 관리사무소 등에 설치된 소형 가전 수거함에 배출합니다.',
          '전자식 체중계의 경우 배터리를 분리하여 별도 배출해야 합니다.',
        ],
      },
      {
        id: '48',
        name: '카펫',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcarpet.svg?alt=media&token=743c6c44-de1f-472b-b6fe-6667cc0deff3',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '깨끗한 상태라면 의류수거함에 배출할 수도 있습니다.',
        ],
      },
      {
        id: '49',
        name: '캐비넷',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcabinet.svg?alt=media&token=055099b9-cf3b-469b-b8d6-db51f545f701',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '가능한 분해하여 배출하면 수거가 용이합니다.',
        ],
      },
      {
        id: '50',
        name: '커튼',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcurtain.svg?alt=media&token=832ab7ae-eba6-47ff-b9a8-c18865bc0ab7',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '깨끗한 상태라면 의류수거함에 배출할 수도 있습니다.',
        ],
      },
      {
        id: '51',
        name: '쿠션',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcushion.svg?alt=media&token=0c16c0e3-c268-44d3-bb11-c4d6d2d7b2f6',
        recyclingInstructions: [
          '일반 쓰레기로 분류됩니다.',
          '종량제 봉투에 담아 배출합니다.',
          '대형 쿠션의 경우 대형 폐기물로 처리할 수 있습니다.',
        ],
      },
      {
        id: '52',
        name: '텐트',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ftent.svg?alt=media&token=30f2929e-b07c-462a-b5f4-a62b14c66b0a',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '금속 프레임은 분리하여 고철로 배출할 수 있습니다.',
        ],
      },
      {
        id: '53',
        name: '항아리',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fjar.svg?alt=media&token=fb4317e7-c8cd-427f-bd23-2c57bf2a1445',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '도자기 재질의 경우 깨지지 않도록 주의하여 처리합니다.',
        ],
      },
      {
        id: '54',
        name: '화로',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbrazier.svg?alt=media&token=7d8de9f2-a5b5-4c91-8f04-eb92d8d9baa2',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '금속 재질의 경우 고철로 분리 배출할 수 있습니다.',
        ],
      },
      {
        id: '55',
        name: '화장대',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fvanity.svg?alt=media&token=98468ba3-5f0c-44ad-b190-296bbdc34154',
        recyclingInstructions: [
          '대형 폐기물로 분류됩니다.',
          '구청에서 대형 폐기물 스티커를 구입하여 부착 후 배출합니다.',
          '가능한 분해하여 배출하면 수거가 용이합니다.',
        ],
      },
    ],
  },
  {
    id: '12',
    name: '음식물',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2FfoodWaste.svg?alt=media&token=9460c168-e287-4042-a00a-2f77eab3b5f5',
    items: [
      {
        id: '1',
        name: '바나나껍질',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbananaPeel.svg?alt=media&token=5e1ac525-9cb3-4ce8-af35-ab22b38951df',
        recyclingInstructions: ['음식물 쓰레기로 배출합니다.', '스티커는 제거 후 배출합니다.'],
      },
      {
        id: '2',
        name: '상한음식',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FrottenFood.svg?alt=media&token=cb883e53-dead-45e8-b276-9b952c203584',
        recyclingInstructions: ['음식물 쓰레기로 배출합니다.', '포장재는 제거 후 해당 재질에 맞게 분리배출합니다.'],
      },
      {
        id: '3',
        name: '생선',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Ffish.svg?alt=media&token=dcf9c679-d6fa-405d-8c1c-ef2f29b1335e',
        recyclingInstructions: [
          '3cm 이상의 큰 뼈는 제거 후 일반 쓰레기로 배출합니다.',
          '살점과 작은 뼈는 음식물 쓰레기로 배출 가능합니다.',
        ],
      },
      {
        id: '4',
        name: '오렌지껍질',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2ForangePeel.svg?alt=media&token=504768ae-6ee2-471e-8d0d-5df4091b753f',
        recyclingInstructions: ['음식물 쓰레기로 배출합니다.', '스티커는 제거 후 배출합니다.'],
      },
    ],
  },
  {
    id: '13',
    name: '유해',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fharmfulness.svg?alt=media&token=e43e02de-88d7-4e3a-a188-1df51f8d98fb',
    items: [
      {
        id: '1',
        name: '폐건전지',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbattery.svg?alt=media&token=2e8b3a9d-0715-4ae4-b9bb-132da5266d69',
        recyclingInstructions: [
          '전용 수거함에 배출해야 합니다. 수거함 설치 장소:주민센터(동사무소), 구청, 아파트 단지 내 분리수거장, 대형마트, 전자제품 매장',
          '건전지는 종류에 상관없이 모두 수거함에 배출 가능합니다.',
          '건전지 외부의 이물질을 제거하고 배출합니다.',
          '충전식 전지(보조배터리 등)도 같은 수거함에 배출 가능합니다.',
          '일반 쓰레기나 종량제 봉투로 배출하면 안 됩니다.',
        ],
      },
      {
        id: '2',
        name: '폐형광등',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FfluorescentLamp.svg?alt=media&token=286dbf55-8140-4cbc-acae-ff731dd86c03',
        recyclingInstructions: [
          '전용 수거함에 배출해야 합니다. 수거함 설치 장소:주민센터(동사무소), 구청, 아파트 단지 내 분리수거장, 대형마트, 전자제품 매장',
          '깨지지 않도록 주의하여 원형 그대로 수거함에 넣습니다.',
          '깨진 형광등은 신문지 등으로 감싸 안전하게 처리한 후 종량제 봉투로 배출합니다.',
          'LED 전구는 종량제 봉투로 배출합니다.',
        ],
      },
      {
        id: '3',
        name: '폐의약품',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmedicine.svg?alt=media&token=f08a722c-a23e-4785-b41f-db4e7216c0f8',
        recyclingInstructions: [
          '가까운 약국이나 보건소의 폐의약품 수거함에 배출합니다.',
          '일부 지역에서는 우체통을 통해 배출할 수 있습니다(액체 의약품 제외).',
          '가루약, 알약: 포장을 뜯지 않고 그대로 배출합니다.',
          '물약: 뚜껑을 잘 닫고 용기째 배출합니다.',
          '연고 등: 외부 종이 상자만 제거하고 용기째 배출합니다.',
          '의약품 외의 건강기능식품 등은 폐의약품 수거함에 배출하면 안 됩니다.',
        ],
      },
    ],
  },
  {
    id: '14',
    name: '불연성 폐기물',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2FnoncombustibleWaste.svg?alt=media&token=4affe1db-c866-4419-8acd-c668c3313c86',
    items: [
      {
        id: '1',
        name: '거울',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmirror.svg?alt=media&token=5bc3cf9b-cd53-4f33-b44d-21955b95aea3',
        recyclingInstructions: [
          '일반적으로 불연성 폐기물로 배출합니다.',
          '크기가 큰 경우 대형 폐기물로 신고 후 배출합니다.',
          '깨진 경우 신문지 등으로 감싸 안전하게 배출합니다.',
        ],
      },
      {
        id: '2',
        name: '그릇',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbowl.svg?alt=media&token=64ab0051-4666-414e-89e4-2ccd0ef38559',
        recyclingInstructions: ['불연성 폐기물로 배출합니다.', '깨진 경우 신문지 등으로 감싸 안전하게 배출합니다.'],
      },
      {
        id: '3',
        name: '깨진유리',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbrokenGlass.svg?alt=media&token=9b12e66a-801f-465c-b76d-b7e137b30a7d',
        recyclingInstructions: ['신문지 등으로 감싸 안전하게 불연성 폐기물로 배출합니다.'],
      },
      {
        id: '4',
        name: '내열 식기류',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FheatResistantTableware.svg?alt=media&token=27cc7c46-21d4-439b-a90c-910656d8f2ad',
        recyclingInstructions: ['불연성 폐기물로 배출합니다.'],
      },
      {
        id: '5',
        name: '도자기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fceramic.svg?alt=media&token=f29aefd3-8e47-443e-a8c2-957af152211c',
        recyclingInstructions: ['불연성 폐기물로 배출합니다.', '깨진 경우 신문지 등으로 감싸 안전하게 배출합니다.'],
      },
      {
        id: '6',
        name: '뚝배기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FearthenPot.svg?alt=media&token=ecc11ccc-af65-4223-a53a-e2bb96b7938e',
        recyclingInstructions: ['불연성 폐기물로 배출합니다.', '깨진 경우 신문지 등으로 감싸 안전하게 배출합니다.'],
      },
      {
        id: '7',
        name: '머그컵',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FmugCup.svg?alt=media&token=4206881a-f01e-4c1c-ac39-44a5dc04dcd6',
        recyclingInstructions: ['불연성 폐기물로 배출합니다.', '깨진 경우 신문지 등으로 감싸 안전하게 배출합니다.'],
      },
      {
        id: '8',
        name: '백열전구',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FincandescentLightBulb.svg?alt=media&token=bd774686-cd64-44de-a661-f639a9c5c1a6',
        recyclingInstructions: ['불연성 폐기물로 배출합니다.', '깨지지 않도록 주의하여 배출합니다.'],
      },
      {
        id: '9',
        name: '벽돌',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbrick.svg?alt=media&token=ab1fb7a3-4625-44ab-89c9-9d8717533ade',
        recyclingInstructions: ['불연성 폐기물로 배출합니다.', '대량 발생 시 관할 구청에 문의합니다.'],
      },
      {
        id: '10',
        name: '유리판,유리제품',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FglassPlate.svg?alt=media&token=a24779d4-74e9-48ec-9520-d7841946eb5f',
        recyclingInstructions: [
          '일반적으로 불연성 폐기물로 배출합니다.',
          '크기가 큰 경우 대형 폐기물로 신고 후 배출합니다.',
          '깨진 경우 신문지 등으로 감싸 안전하게 배출합니다.',
        ],
      },
      {
        id: '11',
        name: '재떨이(도자기,유리)',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fashtray.svg?alt=media&token=5db806db-7b6e-45d9-b989-40d0b55e090c',
        recyclingInstructions: ['불연성 폐기물로 배출합니다.'],
      },
      {
        id: '12',
        name: '찻잔(도자기류)',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fteacup.svg?alt=media&token=32c0cc51-97de-4020-9d3d-56308a6ee382',
        recyclingInstructions: ['불연성 폐기물로 배출합니다.'],
      },
      {
        id: '13',
        name: '컵(도자기,유리컵)',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcup.svg?alt=media&token=9f085991-a8a2-478c-bef8-88dbea4bafa4',
        recyclingInstructions: ['불연성 폐기물로 배출합니다.', '깨진 경우 신문지 등으로 감싸 안전하게 배출합니다.'],
      },
      {
        id: '14',
        name: '화분',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fpot.svg?alt=media&token=cb98a531-c5f4-443b-87c1-64a46d0c3b5d',
        recyclingInstructions: ['불연성 폐기물로 배출하되 재질에 맞게 배출합니다.'],
      },
    ],
  },
  {
    id: '15',
    name: '종량제 봉투',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/categoryImages%2Fgarbage.svg?alt=media&token=ecf5a432-7ad1-48d2-b047-faf3e1c1fc8d',
    items: [
      {
        id: '1',
        name: '가발',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fwig.svg?alt=media&token=dc66032a-224c-4004-b241-a6096f12b20a',
        recyclingInstructions: ['이물질을 제거한 후 종량제 봉투에 담아 배출합니다.'],
      },
      {
        id: '2',
        name: '가위',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fscissors.svg?alt=media&token=19f9be46-2c94-49aa-b999-49d21e5fb96e',
        recyclingInstructions: [
          '가능한 재질별로 분리하여 해당 재활용 품목으로 배출합니다.',
          '분리가 어려운 경우 종량제 봉투로 배출합니다.',
        ],
      },
      {
        id: '3',
        name: '걸레',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fdishcloth.svg?alt=media&token=752fcd51-a8ea-4b44-88b9-e27d3ef5464d',
        recyclingInstructions: ['이물질을 제거한 후 종량제 봉투에 담아 배출합니다.'],
      },
      {
        id: '4',
        name: '계란껍질',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Feggshell.svg?alt=media&token=c2e7f922-80e8-4d9d-92ad-43d5da29bbc7',
        recyclingInstructions: ['이물질을 제거한 후 종량제 봉투에 담아 배출합니다.'],
      },
      {
        id: '5',
        name: '고무장갑',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FrubberGlove.svg?alt=media&token=0845ce78-0d81-494c-a76f-0bce0537363a',
        recyclingInstructions: ['이물질을 제거한 후 종량제 봉투에 담아 배출합니다.'],
      },
      {
        id: '6',
        name: '골프공',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FgolfBall.svg?alt=media&token=91bc6a08-bf22-49cb-89a2-c98669ad433c',
        recyclingInstructions: ['이물질을 제거한 후 종량제 봉투에 담아 배출합니다.'],
      },
      {
        id: '7',
        name: '나무국자',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwoodenLadle.svg?alt=media&token=bee49bf1-c00f-49f8-8b6b-9bcb0918c74d',
        recyclingInstructions: ['이물질을 제거한 후 종량제 봉투에 담아 배출합니다.'],
      },
      {
        id: '8',
        name: '나무젓가락',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwoodenChopsticks.svg?alt=media&token=b6287349-5a79-4d9f-b952-10ff21f64b16',
        recyclingInstructions: ['이물질을 제거한 후 종량제 봉투에 담아 배출합니다.'],
      },
      {
        id: '9',
        name: '나무조각',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwoodPiece.svg?alt=media&token=d75ce597-9ec0-49e6-9b48-cf513ac5972b',
        recyclingInstructions: [
          '종량제 봉투에 담을 수 없는 경우 대형 폐기물로 처리합니다.',
          '지자체의 대형 폐기물 수거 신청 절차를 따릅니다.',
        ],
      },
      {
        id: '10',
        name: '나뭇가지',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwoodPiece.svg?alt=media&token=12fdd09a-fff3-4a51-a1e2-0bc9bb2bcb76',
        recyclingInstructions: [
          '종량제 봉투에 담을 수 없는 경우 대형 폐기물로 처리합니다.',
          '지자체의 대형 폐기물 수거 신청 절차를 따릅니다.',
        ],
      },
      {
        id: '11',
        name: '나무줄기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FtreeTrunk.svg?alt=media&token=75bebd8d-e3d3-4752-9bd2-da5aa142c49c',
        recyclingInstructions: [
          '종량제 봉투에 담을 수 없는 경우 대형 폐기물로 처리합니다.',
          '지자체의 대형 폐기물 수거 신청 절차를 따릅니다.',
        ],
      },
      {
        id: '12',
        name: '나침반',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcompass.svg?alt=media&token=1d29d8d4-4575-4716-94f7-1b1b5cd69806',
        recyclingInstructions: ['이물질을 제거한 후 종량제 봉투에 담아 배출합니다.'],
      },
      {
        id: '13',
        name: '낙엽',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FfallenLeaves.svg?alt=media&token=96e3917d-0b18-42a7-bb09-bb70af5ff9fd',
        recyclingInstructions: ['이물질을 제거한 후 종량제 봉투에 담아 배출합니다.'],
      },
      {
        id: '14',
        name: '낫손잡이',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FsickleHandle.svg?alt=media&token=6d23d912-bcae-4800-9887-c091f7b9a81candle',
        recyclingInstructions: ['고철로 배출하되, 가능하다면 손잡이 부분(나무재질 등)을 분리하여 배출합니다.'],
      },
      {
        id: '15',
        name: '냄비뚜껑(강화유리)',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FpotLid.svg?alt=media&token=ec860687-793b-45c1-8475-5426bf1b38ce',
        recyclingInstructions: ['이물질을 제거한 후 종량제 봉투에 담아 배출합니다.'],
      },
      {
        id: '16',
        name: '도끼 손잡이',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FaxHandle.svg?alt=media&token=f5f3eeb7-e6d2-4af1-8b2e-9f1a8d6aafa3',
        recyclingInstructions: ['이물질을 제거한 후 종량제 봉투에 담아 배출합니다.'],
      },
      {
        id: '17',
        name: '나무도마',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwoodenCuttingBoard.svg?alt=media&token=5323a935-2cf7-4dbc-8809-cd42740c0516',
        recyclingInstructions: ['이물질을 제거한 후 종량제 봉투에 담아 배출합니다.'],
      },
      {
        id: '18',
        name: '돋보기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FmagnifyingGlasses.svg?alt=media&token=1be6fbeb-cb30-4aae-b744-785a453d3279',
        recyclingInstructions: ['이물질을 제거한 후 종량제 봉투에 담아 배출합니다.'],
      },
      {
        id: '19',
        name: '라이터',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Flighter.svg?alt=media&token=bde4d48e-5af1-4aad-969b-68d8c7545c37',
        recyclingInstructions: ['내용물을 완전히 사용한 후 종량제 봉투로 배출합니다.'],
      },
      {
        id: '20',
        name: '라켓',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fracket.svg?alt=media&token=59a673bb-ee62-4bd8-994e-5109590a4354',
        recyclingInstructions: [
          '가능한 재질별로 분리하여 해당 재활용 품목으로 배출합니다.',
          '분리가 어려운 경우 종량제 봉투로 배출합니다.',
          '종량제 봉투에 담을 수 없는 경우 대형 폐기물로 처리합니다.',
        ],
      },
      {
        id: '21',
        name: '랩',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Flab.svg?alt=media&token=0e557817-ab65-4ca0-b33e-ccbe326e88ac',
        recyclingInstructions: [
          '일반적으로 종량제 봉투로 배출합니다.',
          'PE 소재의 랩은 이물질을 제거한 후 비닐류로 분리배출할 수 있습니다.',
          '가정용 랩은 대부분 PVC 소재로 일반쓰레기로 배출합니다.',
        ],
      },
      {
        id: '22',
        name: '마스크',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmask.svg?alt=media&token=fb52b11c-cce3-4f48-83ea-fbeea750c2fd',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '23',
        name: '마우스패드',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FmousePad.svg?alt=media&token=52fc87c6-2c82-42c3-b1af-0f675ae6c8e3',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '24',
        name: '만년필(마커펜)',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FfountainPen.svg?alt=media&token=60f3ce10-3588-45a4-910a-710cb41f3cd2',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '25',
        name: '일회용면도기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FdisposableRazor.svg?alt=media&token=1cb51972-d18a-449f-8ef4-e243378a7ea7',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '26',
        name: '면도칼',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Frazor.svg?alt=media&token=f0e3f563-f475-4d62-a5e2-beff7598a427',
        recyclingInstructions: ['수거원이 다치지 않도록 종이 등으로 감싸서 종량제 봉투로 배출합니다.'],
      },
      {
        id: '27',
        name: '면봉',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FcottonSwab.svg?alt=media&token=371a2956-291e-43e8-a83b-5107a2c4245f',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '28',
        name: '명함',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbusinessCard.svg?alt=media&token=31a71731-5962-495a-b82a-d40bbb702d36',
        recyclingInstructions: [
          '플라스틱 코팅되지 않은 일반 종이 명함은 종이류로 분리배출합니다.',
          '플라스틱 합성지 등 다른 재질이 포함된 경우 종량제 봉투로 배출합니다.',
        ],
      },
      {
        id: '29',
        name: '명함지갑',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbusinessCard.svg?alt=media&token=31a71731-5962-495a-b82a-d40bbb702d36',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '30',
        name: '모자',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fhat.svg?alt=media&token=56c20dfc-6d97-4edb-a7d3-ad31fb0b04ad',
        recyclingInstructions: [
          '의류 및 원단류 배출 방법을 참고하여 의류수거함에 배출하거나, 재활용이 어려운 경우 종량제 봉투로 배출합니다.',
        ],
      },
      {
        id: '31',
        name: '목재',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fwood.svg?alt=media&token=63bd28c2-8dac-4e66-b7a8-482db3ad6784',
        recyclingInstructions: [
          '종량제 봉투에 담을 수 없는 경우 대형폐기물로 처리합니다.',
          '지자체의 대형폐기물 수거 신청 절차를 따릅니다.',
        ],
      },
      {
        id: '32',
        name: '물티슈',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwetTissue.svg?alt=media&token=36f2c854-c9e2-4525-8305-32e8bd2856b0',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '33',
        name: '밀짚모자',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FstrawHat.svg?alt=media&token=385508b9-ae6e-41f3-ac11-290131ef2b07',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '34',
        name: '바둑판',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcheckerboard.svg?alt=media&token=e073f927-f1f2-4699-8968-a0c8e6267fde',
        recyclingInstructions: [
          '종량제 봉투에 담을 수 없는 경우 대형폐기물로 처리합니다.',
          '지자체의 대형폐기물 수거 신청 절차를 따릅니다.',
        ],
      },
      {
        id: '35',
        name: '방석',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcushion.svg?alt=media&token=4c1580c4-102b-4271-83ee-25ad15fdb57f',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '36',
        name: '배트민턴공',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbadmintonBall.svg?alt=media&token=dcfb2229-f8b5-4d48-8597-9f36904c9fe5',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '37',
        name: '보온병',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fthermos.svg?alt=media&token=a20568de-2028-4388-bec9-96fc623e9e21',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '38',
        name: '볼펜',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fpen.svg?alt=media&token=658b3e40-7da3-4cda-8e6a-d31eb09f6f2b',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '39',
        name: '붓',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fbrush.svg?alt=media&token=b7e79ac5-b459-477a-8a27-59d650c964b7',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '40',
        name: '비닐코팅종이',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FvinylCoatedPaper.svg?alt=media&token=2940cd05-a282-4a05-b56c-6ce202262086',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '41',
        name: '빗',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcomb.svg?alt=media&token=3c4f3873-f2e7-4eab-914a-61fcdacfcdba',
        recyclingInstructions: ['재질에 맞게 배출하되 나무 빗 등은 쓰레기 종량제봉투로 배출합니다.'],
      },
      {
        id: '42',
        name: '사인펜',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FmarkerPen.svg?alt=media&token=0a473f77-83dd-449f-b704-48cb95800584',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '43',
        name: '사진',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fpicture.svg?alt=media&token=a249fb74-6033-4596-85af-08ece6a64132',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '44',
        name: '사진인화지',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FphotoPaper.svg?alt=media&token=b3399ccb-31c1-4b85-9b7b-bd5a56c56982',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '45',
        name: '생선뼈',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FfishBone.svg?alt=media&token=27e4b5cb-a8d3-4f1b-837f-06d389e6dcff',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '46',
        name: '샤프펜슬',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FmechanicalPencil.svg?alt=media&token=3eb29e4e-f24c-41e6-8092-9ef381f75ac6',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '47',
        name: '성냥',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmatches.svg?alt=media&token=7f99198b-98ee-468f-9970-0c9fd2538c27',
        recyclingInstructions: ['물에 적신 후 종량제 봉투로 배출합니다.'],
      },
      {
        id: '48',
        name: '송곳',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fawl.svg?alt=media&token=a281dcb9-c928-4dbb-b750-c5a8ab6b5c6f',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '49',
        name: '수세미',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fscrubbers.svg?alt=media&token=39ee46ff-e6a6-4cfa-9d6a-8639999a1c4c',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '50',
        name: '숯',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcharcoal.svg?alt=media&token=a2d9337f-c83a-4214-b4f8-42e70eb3fa17',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '51',
        name: '스폰지',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fsponge.svg?alt=media&token=f00a22dc-b092-43c2-a740-520f5d019936',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '52',
        name: '시계',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fwatch.svg?alt=media&token=e4d92f1a-9361-4991-8b24-db8ad27bb809',
        recyclingInstructions: [
          '종량제 봉투에 담을 수 없는 경우 대형폐기물로 처리합니다.',
          '건전지는 분리하여 전용수거함으로 배출합니다.',
        ],
      },
      {
        id: '53',
        name: '신발',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fshoes.svg?alt=media&token=db449c10-2152-4427-8658-380430b12acf',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '54',
        name: '아이스팩',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FicePack.svg?alt=media&token=1b98f699-bdf8-4ee6-bf5e-f0086df24df2',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '55',
        name: '애완동물 용변 시트',
        imageURL: 'petToiletSeat 이미지 없음',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '56',
        name: '야구공',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbaseballBall.svg?alt=media&token=ddf1005a-d99e-4803-9a68-0830c7decbc4',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '57',
        name: '야구글러브',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FbaseballGlove.svg?alt=media&token=f86e5b29-8a46-4db4-b7bc-27f49517eab9',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '58',
        name: '나무야구배트',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FwoodenBaseballBat.svg?alt=media&token=99163db3-ad12-49f0-af7c-c8407e0866fe',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '59',
        name: '양초',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcandle.svg?alt=media&token=169d2f14-47e7-4381-9029-d6ab566ae091',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '60',
        name: '에어매트',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FairMat.svg?alt=media&token=014bfee0-b1ec-42db-ac54-43f517b072f7',
        recyclingInstructions: ['종량제 봉투에 담을 수 없는 경우 대형폐기물로 처리합니다.'],
      },
      {
        id: '61',
        name: '연필(색연필)',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fpencil.svg?alt=media&token=c46643bd-a971-4513-afb2-8de6455002de',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '62',
        name: '연필깎이',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FpencilSharpener.svg?alt=media&token=abb14771-79bf-4d34-8f70-7d0b3dd216c1',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '63',
        name: '요가매트',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FyogaMat.svg?alt=media&token=f7aceacf-af21-4035-aaaa-b5e22bd9956a',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '64',
        name: '우산',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fumbrella.svg?alt=media&token=7cff4fd1-a836-4d27-be8a-2dafddf52dba',
        recyclingInstructions: [
          '뼈대와 비닐을 분리하여, 각각의 분리수거함으로 배출합니다.',
          '분리가 어렵다면 종량제 봉투로 배출합니다.',
        ],
      },
      {
        id: '65',
        name: '자석',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fmagnet.svg?alt=media&token=cf08ddd5-a135-4d45-986a-745d0da456d1',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '66',
        name: '전기코드',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FelectricalCord.svg?alt=media&token=fdcdafcd-9b2f-4a53-b2d8-609f277af351',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '67',
        name: '전동칫솔',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FelectricToothbrush.svg?alt=media&token=c8b25523-21e8-4cfd-88e8-37df06af808b',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '68',
        name: '접착제',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fglue.svg?alt=media&token=19c22437-42dd-4e66-a113-244d34fa880d',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '69',
        name: '젖꼭지(아기용품)',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fnipple.svg?alt=media&token=e957abcf-e981-45bb-8fb4-02a1f65f2cfd',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '70',
        name: '조각칼',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FcarvingKnife.svg?alt=media&token=5aabe4e9-2868-41cd-88f3-4755ac5643b8',
        recyclingInstructions: ['수거원이 다치지 않도록 종이 등으로 감싸서 배출합니다.'],
      },
      {
        id: '71',
        name: '종이 기저귀',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FpaperDiapers.svg?alt=media&token=4b71dd20-36c1-4a11-90e5-367203a3ee6e',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '72',
        name: '줄자',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FtapeMeasure.svg?alt=media&token=fb7890ac-12af-4f39-859d-d8588c5bf204',
        recyclingInstructions: ['재질에 맞게 배출 또는 종량제 봉투로 배출합니다.'],
      },
      {
        id: '73',
        name: '지우개',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Feraser.svg?alt=media&token=ab4cd119-4d41-4447-8391-4cdcedbed62a',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '74',
        name: '차 찌꺼기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FcoffeeBeanIngredients.svg?alt=media&token=dff78633-5878-4d6f-a59d-58802feda72b',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '75',
        name: '체온계',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fthermometer.svg?alt=media&token=df941842-0935-4eeb-916b-d018eb7ec9c0',
        recyclingInstructions: ['건전지는 분리하여 전용수거함으로 배출합니다.'],
      },
      {
        id: '76',
        name: '체중계',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FweightMeasuringMachine.svg?alt=media&token=c3c2ab3a-2478-4f92-82ce-740253789821',
        recyclingInstructions: ['종량제 봉투에 담을 수 없는 경우 대형폐기물로 처리합니다.'],
      },
      {
        id: '77',
        name: '축구공',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fsoccer.svg?alt=media&token=96141d81-b397-46e9-a221-0ed826f6e07f',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '78',
        name: '커피원두 찌꺼기',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FcoffeeBeanIngredients.svg?alt=media&token=dff78633-5878-4d6f-a59d-58802feda72b',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '79',
        name: '코르크따개',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcorkscrew.svg?alt=media&token=764aecd3-5d17-4385-bc18-56e21f11716b',
        recyclingInstructions: [
          '수거원이 다치지 않도록 종이 등으로 감싸서 배출합니다.',
          '재질에 맞게 해당 분리수거함으로 배출합니다.',
        ],
      },
      {
        id: '80',
        name: '코르크마개',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FcorkStopper.svg?alt=media&token=c25c1af4-61de-483e-bcd7-5b510db98b51',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '81',
        name: '콘센트',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FpowerSocket.svg?alt=media&token=ec827a86-6a9c-4a4c-b387-ec2721293c45',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '82',
        name: '콘텍트렌즈',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FcontactLenses.svg?alt=media&token=6074f1b0-05c8-4935-8b90-086ea00feffc',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '83',
        name: '크레용',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fcrayon.svg?alt=media&token=ff562e23-bcca-47ca-a51f-e64f4d43f62b',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '84',
        name: '틀니',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fdenture.svg?alt=media&token=6b5c046a-0016-480a-9e8d-fa3a88fe2bc6',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '85',
        name: '티백(녹차)',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FteaBag.svg?alt=media&token=53dc2cd9-5605-480b-99b0-e48326a9b062',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '86',
        name: '파인애플껍질',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FpineapplePeel.svg?alt=media&token=49c790ac-bea6-4fe4-b198-369bec383598',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '87',
        name: '필름(사진용)',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FphotoFilm.svg?alt=media&token=71df9d05-d0ff-4631-9240-610844f81913',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '88',
        name: '핫팩',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2FhotPack.svg?alt=media&token=d5e16fd3-4bb5-4c34-9c70-71f4efcd95a9',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '89',
        name: '헝겊',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fpieceofcloth.svg?alt=media&token=5f172ec5-8910-4de6-94d9-e16f601cb2a3',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
      {
        id: '90',
        name: '헬멧',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Fhelmet.svg?alt=media&token=c0a772d8-dc7f-4605-9ab1-a0a24bd50c99',
        recyclingInstructions: ['분리하여 재질별로 분리배출 가능합니다.'],
      },
      {
        id: '91',
        name: '호일',
        imageURL:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/detailItemImages%2Flab.svg?alt=media&token=0e557817-ab65-4ca0-b33e-ccbe326e88ac',
        recyclingInstructions: ['종량제 봉투로 배출합니다.'],
      },
    ],
  },
];

export const saveWasteCategories = async () => {
  for (const category of wasteCategories) {
    const categoryRef = doc(db, 'WasteCategories', category.id);

    await setDoc(categoryRef, {
      name: category.name,
      imageURL: category.imageURL,
      items: category.items,
    });
  }
  console.log('Categories 저장 완료 되었습니다.');
};
