import { db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

const articles = [
  {
    id: '1',
    title: '헷갈리기 쉬운 재활용품, 올바른 분리배출 방법은 이렇게!',
    video:
      'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/article%2FcmYwYFLwWqovdSjMlCDNAeztLwMvOQQW.mp4?alt=media&token=8ae2ab46-faff-4a4e-ad52-452b1b580fcb',
    content: [
      {
        text: `얼마 전, 아파트 엘리베이터에 부착된 '재활용품 분리배출' 안내문을 보았다. 새삼스럽다고 생각했지만, 재차 안내하게 된 이유가 있으리라 보고 다시 한번 읽어보았다. 특히 부피가 크고, 많이 버려지는 '폐지류'에 대해서 상세히 안내하고 있었는데, 수거일 하루 전, 재활용품 배출 장소에 가보았더니 얼마나 무분별하게 버려지고 있었는지 깨달았다.`,
      },
      {
        text: `각 가정에 안내하고 있는 기본적인 재활용품 분리배출 방법을 숙지하고 있더라도, 많은 품목과 혼합재질 등으로 인해 헷갈릴 때가 많다. 그럴 땐 <내손안의 분리배출> 앱의 '분리배출요령'과 'FAQ'를 참고하면 좋다. 그래도 궁금증이 해결되지 않을 때는 'Q&A' 메뉴에서 관련 키워드 검색 후 답변 내용을 확인하면 도움이 된다.`,
      },
      {
        text: `비닐, 플라스틱, 유리류, 스티로폼 분리배출 방법`,
      },
      {
        text: `모든 재활용품은 비우고, 헹구고, 재질별로 분리하여 각 수거함에 배출하는 것을 기본 수칙으로 한다. 먼저 <b>'비닐류'</b>는 이물질을 물로 헹구거나 제거한 후 배출한다. 만약 비닐에 묻은 음식물, 스티커 등을 제거하기 어렵다면 종량제봉투로 배출해야 한다.`,
      },
      {
        image:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/article%2F1.jpg?alt=media&token=3e5f4b19-b889-4394-9994-5e85a7a8f14d',
      },
      {
        text: '이물질을 제거한 깨끗한 비닐을 모아서 비닐류 전용 수거함에 배출한다.',
      },
      {
        text: `'플라스틱'과 '유리류 또한 마찬가지다. 용기의 내용물을 비우고 깨끗하게 헹군 뒤, 라벨·스티커 제거 후 분리배출 하면 된다. 페트병의 경우, 같은 과정을 거친 후 압축해서 투명과 유색을 분리하여 배출한다. 마요네즈·케첩·기름통같이 세척이 어려운 용기는 종량제봉투에 배출해야 한다. 단, 제대로 씻고 말렸을 땐 재활용이 가능하다. 깨진 병·판유리·조명 기구용 유리류는 재활용이 어렵기 때문에 신문지 등에 싸서 종량제봉투로 배출하고, 도자기·사기그릇은 불연성쓰레기로 배출해야 한다.`,
      },
      {
        image:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/article%2F2.jpg?alt=media&token=0f9a58ff-4ce0-41ac-9839-20e2f695b55f',
      },
      {
        text: '플라스틱류와 유리류는 용기의 내용물을 비우고 깨끗하게 헹군 뒤, 라벨·스티커 제거 후 분리배출 한다. 페트병의 경우, 압축해서 투명과 유색을 분리하여 배출한다.',
      },
      {
        image:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/article%2F3.jpg?alt=media&token=37b80511-bcb1-4904-ae10-c1bdb20ac084',
      },
      {
        text: '습기 제거제는 재활용이 어려운 은박지와 부직포는 제거 후 종량제봉투에 버리고, 내용물을 비운 용기는 깨끗이 세척 후 분리배출 한다.',
      },
      {
        image:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/article%2F4.jpg?alt=media&token=e706cd66-f3ef-472b-9f61-89e82da65590',
      },
      {
        text: '비닐류로 오해하기 쉬운 은박지와 부직포는 재활용이 안 된다. ',
      },
      {
        image:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/article%2F5.jpg?alt=media&token=c8978497-720e-4b7e-b9d3-3ea3d48f58c9',
      },
      {
        text: '마요네즈·케첩·기름통같이 세척이 어려운 용기는 종량제봉투에 배출해야 한다. 단, 제대로 씻고 말렸을 땐 재활용이 가능하다.',
      },
      {
        text: '폐지류 분리배출 방법',
      },
      {
        text: `'폐지류' 분리배출 방법은 최근 다시 강조해서 안내하고 있는 만큼 충분히 숙지해둘 필요가 있다. 골판지 상자(택배 상자)는 조립과 포장이 간단하지만 수고스러운 일인 만큼, 사용한 상자를 해체하는 일 또한 마찬가지다. 집 앞이나 가까운 재활용품 분리배출 장소에 가보면 내용물만 쏙 뺀 채 테이프, 택배 전표 등이 고스란히 부착된 상자가 산더미만큼 쌓여있는 것을 심심찮게 볼 수 있다. 어쩌면 번거롭고 귀찮아서, 어쩌면 올바른 배출 방법을 숙지하지 못했기 때문일 수도 있다.`,
      },
      {
        text: `골판지 상자(택배 상자)나 신문지·책자 등 폐지류는 다른 품목처럼 종이 외 재질(이물질) 제거 후, ‘접어서’ 차곡차곡 쌓은 뒤 배출해야 한다. 다른 재질 (이물질)이라 함은 골판지 상자의 경우 테이프, 택배 전표 등을 말하며, 책자류는 비닐코팅 표지(찢어지지 않는 종이 외 재질), 스프링 등을 말한다. 달력, 노트에 사용된 ‘스프링’이 고철 단일재질일 땐 고철 수거함에 배출하고, 종이는 종이류로, 찢어지지 않는 재질들은 종량제봉투로 배출하면 된다.`,
      },
      {
        image:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/article%2F6.jpg?alt=media&token=0cfb6f27-9702-4ee1-bcc4-53ef7df4d17b',
      },
      {
        text: '폐지류는 종이 외 재질(이물질) 제거 후, ‘접어서’ 차곡차곡 쌓은 뒤 배출해야 한다.',
      },
      {
        image:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/article%2F7.jpg?alt=media&token=87f61879-9891-48db-bd03-e01f86fcdf40',
      },
      {
        text: '달력, 노트에 사용된 ‘스프링’이 고철 단일재질일 땐 고철 수거함에 배출하고, 종이는 종이류로, 찢어지지 않는 재질들은 종량제봉투로 배출한다.',
      },
      {
        text: `이밖에 영수증, 택배 전표, 라벨, 금·은박지, 코팅지, 알루미늄, 명함·사진, 방수 코팅된 상자, 도배지(벽지), 부직포, 화장지, 물티슈, 테이프, 다른 이물질이 섞이거나 오염된 종이 등은 재활용이 어렵기 때문에 반드시 '종량제봉투'에 담아서 배출해야 한다.`,
      },
      {
        text: `분리배출 대상이 아니지만, 재활용품으로 오해하기 쉬운 재질`,
      },
      {
        text: `음식물이 묻어있는 치킨 상자, 컵밥, 컵라면 용기 등 헹궈도 깨끗해지지 않는 용기와 보온보냉팩, 문구류(볼펜, 샤프), 칫솔, 고무장갑, 슬리퍼, 노끈, 화장지, 은박지, 알루미늄 호일 등은 종량제봉투로 배출한다. 물로 된 아이스팩은 물을 따라버린 후 포장재를 분리배출 하면 되지만, 고흡수성 수지 아이스팩일 경우 전용 수거함이 따로 없다면 반드시 종량제봉투에 버려야 한다. 물처럼 하수구, 변기 등에 따라버리면 배관을 완전히 막히게 할 수 있으니 주의하자. 스티로폼 재질로 오해하기 쉬운 과일망 또한 재활용이 어렵기 때문에 종량제봉투로 배출해야 한다.`,
      },
      {
        image:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/article%2F8.jpg?alt=media&token=e657bf8f-0c74-48ab-a741-ad47389dc90e',
      },
      {
        text: `스티로폼 재질로 오해하기 쉬운 과일망은 재활용이 어렵기 때문에 종량제봉투로 배출한다.`,
      },
      {
        image:
          'https://firebasestorage.googleapis.com/v0/b/web-game-5b1b6.appspot.com/o/article%2F9.jpg?alt=media&token=9c6e6607-d0c6-435e-b375-77ffbbb7c283',
      },
      {
        text: '재활용품으로 오해하기 쉽지만, 종량제봉투나 불연성쓰레기로 배출해야 하는 물건들',
      },
      {
        text: `쉽게 생각해서 우선 큰 틀에서 사용된 ‘재질’을 먼저 확인하고, 다음으로 내용물(이물질) 제거 여부, 마지막으로 혼합된 재질일 경우 분리하여 배출할 수 있는지 확인하면 된다. 재질을 확인하기 어려울 땐 앞서 설명한 <내손안의 분리배출> 앱의 ‘Q&A’ 메뉴에서 도움을 받을 수 있다.`,
      },
      {
        text: `재활용품 분리배출은 자발적인 행동이지만, 올바른 시민의식을 바탕으로 한 구체적인 실천이 요구된다. ‘나 하나뿐이야’라는 이기적인 마음보다 공동체, 환경, 더 나아가 지구를 생각하는 마음으로 적극적으로 참여하기를 바란다.`,
      },
    ],
  },
];

export const saveArticles = async () => {
  for (const article of articles) {
    const articleRef = doc(db, 'Article', article.id);

    await setDoc(articleRef, {
      title: article.title,
      video: article.video,
      content: article.content,
    });
  }
  console.log('Article 저장 완료 되었습니다.');
};
