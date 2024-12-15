import { describe, it, expect } from 'vitest';
import { loginSchema } from '../loginSchema';

describe('로그인 스키마 검증', () => {
  it('유효한 이메일과 비밀번호로 로그인 시도시 성공해야 합니다.', () => {
    // Given 준비
    const validData = {
      email: 'test@naver.com',
      password: '12345678',
    };

    // When 실행
    const result = loginSchema.safeParse(validData);

    // Then 검증
    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('비밀번호가 8자 미만일 때 유효성 검사에 실패해야 합니다', () => {
    // Given
    const invalidData = {
      email: 'test@naver.com',
      password: '111',
    };

    // When
    const result = loginSchema.safeParse(invalidData);

    // Then
    expect(result.success).toBe(false);
  });

  it('이메일 형식이 잘못되었을 때 유효성 검사에 실패해야 합니다.', () => {
    // Given
    const invalidData = {
      email: 'invalid-email',
      password: '12345678',
    };

    // When
    const result = loginSchema.safeParse(invalidData);

    // Then
    expect(result.success).toBe(false);
  });
});
