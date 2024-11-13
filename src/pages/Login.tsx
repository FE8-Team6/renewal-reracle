import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { MdAlternateEmail, MdOutlinePassword, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import GoogleButton from '@/components/GoogleButton';
import { Input } from '@/components/ui/input';
import { getUserProfile } from '@/api/userApi/user';
import { auth } from '@/firebase';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import KakaoAdfit320x50 from '@/components/KakaoAdfit320x50';

const loginSchema = z.object({
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
});

export const Login = () => {
  const [error, setError] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const togglePasswordVisibility = () => {
    setIsShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      const userData = await getUserProfile(user.uid);
      localStorage.setItem('userData', JSON.stringify(userData));
      navigate('/');
    } catch (error) {
      setError('이메일 또는 비밀번호가 잘못되었습니다.');
      console.error('이메일 로그인 실패:', error);
    }
  };

  return (
    <>
      <KakaoAdfit320x50 />
      <section className="w-full h-[80vh] bg-white relative flex flex-col justify-center items-center gap-3 overflow-y-auto">
        <img src="/images/loginPageImg.png" alt="로그인 페이지 이미지" className="w-[12rem] h-[12rem] " />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-purple">이메일</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MdAlternateEmail className="absolute text-xl left-3 top-4 text-purple" />
                      <Input placeholder="email@example.com" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-purple">비밀번호</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MdOutlinePassword className="absolute text-xl left-3 top-4 text-purple" />
                      <Input
                        type={isShowPassword ? 'text' : 'password'}
                        placeholder="Password"
                        {...field}
                        className="pl-10"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute text-xl right-3 top-4 text-purple">
                        {isShowPassword ? <MdVisibilityOff /> : <MdVisibility />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-sm font-medium text-error-40">{error}</p>}
            <Button variant="default" type="submit" size="default">
              로그인
            </Button>
          </form>
        </Form>
        <GoogleButton />
        <Button variant="link" size="sm" onClick={() => navigate('/signup')}>
          <span>회원가입</span>
        </Button>
      </section>
    </>
  );
};
