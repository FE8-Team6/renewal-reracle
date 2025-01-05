import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { MdAlternateEmail, MdOutlinePassword, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getUserProfile } from '@/apis/userApi/user';
import { auth } from '@/firebase';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { loginSchema } from '@/constant/loginSchema';
import { KakaoAdfit320x50 } from '@/components/KakaoAdfit';
import { GoogleButton } from '@/components/GoogleButton/GoogleButton';

export const LoginPage = () => {
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
    <main className="flex flex-col min-h-[calc(100vh-8rem)] pb-[5rem]" aria-label="로그인 페이지" tabIndex={0}>
      <section className="flex-grow overflow-y-auto">
        <KakaoAdfit320x50 />
        <div className="relative flex flex-col items-center justify-center w-full h-full gap-3 bg-white ">
          <img src="/images/loginPageImg.png" alt="로그인 페이지 이미지" className="w-[12rem] h-[12rem] " />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2" aria-label="로그인 양식" tabIndex={0}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-purple" tabIndex={0} aria-label="이메일">
                      이메일
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MdAlternateEmail className="absolute text-xl left-3 top-4 text-purple" />
                        <Input
                          placeholder="email@example.com"
                          {...field}
                          className="pl-10"
                          aria-required="true"
                          aria-describedby="email-error"
                        />
                      </div>
                    </FormControl>
                    <FormMessage id="email-error" role="alert" tabIndex={0} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-purple" tabIndex={0} aria-label="비밀번호">
                      비밀번호
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MdOutlinePassword className="absolute text-xl left-3 top-4 text-purple" />
                        <Input
                          type={isShowPassword ? 'text' : 'password'}
                          placeholder="Password"
                          {...field}
                          className="pl-10"
                          aria-required="true"
                          aria-describedby="password-error"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute text-xl right-3 top-4 text-purple"
                          aria-label={`비밀번호 ${isShowPassword ? '숨기기' : '보기'}`}
                        >
                          {isShowPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage id="password-error" role="alert" tabIndex={0} />
                  </FormItem>
                )}
              />
              {error && <p className="text-sm font-medium text-error-40">{error}</p>}
              <Button variant="default" type="submit" size="default" aria-label="로그인하기">
                로그인
              </Button>
            </form>
          </Form>
          <GoogleButton />
          <Button variant="link" size="sm" onClick={() => navigate('/signup')} aria-label="회원가입 페이지로 이동">
            <span>회원가입</span>
          </Button>
        </div>
      </section>
    </main>
  );
};
