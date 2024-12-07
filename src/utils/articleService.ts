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
        image: 'https://mediahub.seoul.go.kr/uploads/mediahub/2024/04/cUWUKOvtDamqngZqegpDwgDajLqGaHqb.jpg',
      },
    ],
  },
  {
    id: '2',
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
        image: 'https://mediahub.seoul.go.kr/uploads/mediahub/2024/04/cUWUKOvtDamqngZqegpDwgDajLqGaHqb.jpg',
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
