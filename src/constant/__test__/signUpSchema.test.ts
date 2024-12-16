import { describe, it, expect } from 'vitest';
import { signUpSchema } from '../signUpSchema';

describe('회원가입 스키마 검증합니다.', () => {
  it('모든 필드가 유효할 떄 검증에 성공해야 합니다.', () => {
    const validData = {
      displayName: '유현욱',
      email: 'test@naver.com',
      password: '12345678',
      confirmPassword: '12345678',
    };

    const result = signUpSchema.safeParse(validData);

    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('닉네임이 2자 미만일 때 유효성 검사에 실패해야 합니다', () => {
    const invalidData = {
      displayName: '유',
      email: 'test@naver.com',
      password: '12345678',
      confirmPassword: '12345678',
    };

    const result = signUpSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });

  it('이메일 형식이 잘못되었을 때 유효성 검사에 실패해야 합니다', () => {
    const invalidData = {
      displayName: '홍길동',
      email: 'invalid-email',
      password: '12345678',
      confirmPassword: '12345678',
    };

    const result = signUpSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });

  it('비밀번호가 8자 미만일 때 유효성 검사에 실패해야 합니다', () => {
    const invalidData = {
      displayName: '유현욱',
      email: 'test@naver.com',
      password: '123',
      confirmPassword: '123',
    };

    const result = signUpSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });
});
