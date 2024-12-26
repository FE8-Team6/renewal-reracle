import { describe, expect, it } from 'vitest';
import { chunkArray } from '@/utils/chunkArray';

describe('chunkArray', () => {
  it('배열을 지정된 크기로 나눕니다', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const result = chunkArray(array, 2);
    expect(result).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it('배열의 길이가 chunkSize로 나누어떨어지지 않아도 처리할 수 있습니다', () => {
    const array = [1, 2, 3, 4, 5];
    const result = chunkArray(array, 2);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('빈 배열일 경우는 빈 배열을 반환합니다.', () => {
    const array: number[] = [];
    const result = chunkArray(array, 2);
    expect(result).toEqual([]);
  });
});
