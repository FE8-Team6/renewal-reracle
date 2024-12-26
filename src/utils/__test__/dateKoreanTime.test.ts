import { describe, expect, it } from 'vitest';
import { formatDateToKoreanTime } from '@/utils/dateKoreanTime';

describe('formatDateToKoreanTime', () => {
  it('날짜를 한국 시간 형식으로 변환합니다.', () => {
    const date = new Date('2024-01-01T12:00:00.000Z');
    const result = formatDateToKoreanTime(date);

    // 2024. 01. 01. 오후 09:00
    expect(result).toMatch(/2024\. 01\. 01\. 오후 09:00/);
  });

  it('잘못된 날짜 입력시 기본 메시지를 반환합니다.', () => {
    const invalidDate = null as unknown as Date;
    const result = formatDateToKoreanTime(invalidDate);

    expect(result).toBe('알 수 없는 시간');
  });
});
