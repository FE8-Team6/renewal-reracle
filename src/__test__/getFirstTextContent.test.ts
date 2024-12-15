import { getFirstTextContent } from '@/constant/getFirstTextContent';
import { describe, expect, it } from 'vitest';

describe('getFirstTextContent', () => {
  it('첫 번째 텍스트 내용을 반환합니다.', () => {
    const content = [
      { text: '첫 번째 텍스트', image: 'image1.png' },
      { text: '두 번째 텍스트', image: 'image2.png' },
    ];
    expect(getFirstTextContent(content)).toBe('첫 번째 텍스트');
  });

  it('텍스트가 없을 경우 기본 메시지를 반환합니다.', () => {
    const content = [{ image: 'image.jpg' }, { video: 'video.mp4' }];
    expect(getFirstTextContent(content)).toBe('요약 내용이 없습니다.');
  });
});
