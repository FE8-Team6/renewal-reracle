import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { MdAlternateEmail } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import KakaoAdfit320x50 from '@/components/KakaoAdfit320x50';
import KakaoAdfit320x100 from '@/components/KakaoAdfit320x100';
import { Input } from '@/components/ui/input';

const emailSchema = z.object({
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
});

const PasswordReset = () => {
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof emailSchema>) => {
    try {
      await sendPasswordResetEmail(auth, values.email);
      setEmailSent(true);
    } catch (error) {
      if ((error as { code: string }).code === 'auth/user-not-found') {
        form.setError('email', { message: '가입되어 있지 않은 이메일 주소입니다.' });
      } else {
        form.setError('email', { message: '비밀번호 재설정 이메일 전송에 실패했습니다.' });
      }
    }
  };

  return (
    <main className="flex flex-col min-h-[calc(100vh-8rem)]">
      <section>
        <KakaoAdfit320x50 />
        <KakaoAdfit320x100 />
        <div className="relative flex flex-col items-center justify-center w-full h-[30rem] gap-3 bg-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-purple">이메일</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MdAlternateEmail className="absolute text-xl left-3 top-4 text-purple" />
                        <Input type="text" placeholder="email@example.com" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="default" type="submit" size="default">
                비밀번호 재설정
              </Button>
            </form>
          </Form>
          {emailSent && <p>비밀번호 재설정 이메일이 전송되었습니다.</p>}
        </div>
      </section>
    </main>
  );
};
export default PasswordReset;
