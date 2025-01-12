import { useEffect } from 'react';

export const GoogleAdsense = () => {
  useEffect(() => {
    // 프로덕션 환경에서만 실행
    if (process.env.NODE_ENV === 'production') {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1166711304342551';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <ins
      className="adsbygoogle"
      data-ad-client="ca-pub-1166711304342551"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
