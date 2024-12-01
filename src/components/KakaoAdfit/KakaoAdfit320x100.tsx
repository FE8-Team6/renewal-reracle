import { useEffect, useRef } from 'react';

export const KakaoAdfit320x100 = () => {
  const scriptElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://t1.daumcdn.net/kas/static/ba.min.js');
    script.setAttribute('charset', 'utf-8');

    script.setAttribute('async', 'true');
    scriptElement.current?.appendChild(script);
  }, []);
  return (
    <div ref={scriptElement}>
      <ins
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit="DAN-RBk2VKL4tlNUfh1n"
        data-ad-width="320"
        data-ad-height="100"
      />
    </div>
  );
};
