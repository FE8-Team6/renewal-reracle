import { z } from 'zod';

export const signUpSchema = z.object({
  displayName: z.string().min(2, '닉네임은 2자 이상이어야 합니다.'),
  email: z.string().email('이메일을 올바르게 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
  confirmPassword: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
});
