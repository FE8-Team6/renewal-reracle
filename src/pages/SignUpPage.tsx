import { useState } from 'react';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { MdAlternateEmail, MdOutlinePassword, MdOutlineTagFaces } from 'react-icons/md';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { signUpSchema } from '@/constant/signUpSchema';
import { KakaoAdfit320x50 } from '@/components/KakaoAdfit';

export const SignUpPage = () => {
  const [error, setError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [isDisplayNameChecked, setIsDisplayNameChecked] = useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const saveUserInfoToFirestore = async (userId: string, email: string, displayName: string) => {
    try {
      await setDoc(doc(db, 'users', userId), {
        email: email,
        displayName: displayName,
        uid: userId,
      });
      console.log('사용자 정보가 성공적으로 Firestore에 저장되었습니다.');
    } catch (error) {
      console.error('Firestore에 사용자 정보 저장 중 오류:', error);
    }
  };

  const checkDisplayName = async () => {
    setError('');
    const displayName = form.getValues('displayName');
    if (displayName.length < 2) {
      setError('닉네임은 2자 이상이어야 합니다.');
      setIsDisplayNameChecked(false);
      return;
    }
    const q = query(collection(db, 'users'), where('displayName', '==', displayName));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setError('이미 사용 중인 닉네임입니다.');
      setIsDisplayNameChecked(false);
    } else {
      alert('사용 가능한 닉네임입니다.');
      setIsDisplayNameChecked(true);
    }
  };

  const checkEmail = async () => {
    setError('');
    setEmailError('');
    const email = form.getValues('email');
    const emailSchema = z.string().email('이메일 형식이 올바르지 않습니다.');
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setEmailError(result.error.errors[0].message);
      return;
    }
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setEmailError('이미 사용 중인 이메일입니다.');
      setIsEmailChecked(false);
    } else {
      alert('사용 가능한 이메일입니다.');
      setIsEmailChecked(true);
    }
  };

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    if (!isDisplayNameChecked) {
      setError('닉네임 중복 확인을 해주세요.');
      return;
    }

    if (!isEmailChecked) {
      setError('이메일 중복 확인을 해주세요.');
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError('회원가입 중 오류가 발생했습니다.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await saveUserInfoToFirestore(userCredential.user.uid, values.email, values.displayName);
      const userInfoDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userInfoDoc.exists()) {
        const userInfo = userInfoDoc.data();
        localStorage.setItem('userData', JSON.stringify(userInfo));
        navigate('/login');
      } else {
        setError('회원가입 중 오류가 발생했습니다.');
      }
    } catch {
      setError('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <main className="flex flex-col min-h-[calc(100vh-8rem)] pb-[5rem]" aria-label="회원가입 페이지" tabIndex={0}>
      <section>
        <KakaoAdfit320x50 />
        <div className="relative flex flex-col items-center justify-center w-full h-full gap-3 bg-white">
          <img src="/images/loginPageImg.png" alt="로그인 페이지 이미지" className="w-[12rem] h-[12rem] " />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-md px-4 space-y-2"
              aria-label="회원가입 폼"
              tabIndex={0}
            >
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-purple" tabIndex={0}>
                      닉네임
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <MdOutlineTagFaces className="absolute text-xl left-3 top-4 text-purple" />
                        <Input
                          id="displayName"
                          placeholder="닉네임"
                          {...field}
                          className="w-full pl-10"
                          aria-required="true"
                          aria-invalid={!!error}
                          aria-describedby="displayName-error"
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={checkDisplayName}
                          className="mt-2"
                          aria-label="닉네임 중복 확인"
                        >
                          중복 확인
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage id="displayName-error" role="alert" tabIndex={0} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-purple" tabIndex={0}>
                      이메일
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <MdAlternateEmail className="absolute text-xl left-3 top-4 text-purple" />
                        <Input
                          id="email"
                          placeholder="이메일"
                          {...field}
                          className="w-full pl-10"
                          aria-required="true"
                          aria-invalid={!!emailError}
                          aria-describedby="email-error"
                        />
                        <Button variant="secondary" size="sm" onClick={checkEmail} className="mt-2">
                          중복 확인
                        </Button>
                      </div>
                    </FormControl>
                    {emailError && (
                      <FormMessage className="text-error-40" id="email-error" role="alert" tabIndex={0}>
                        {emailError}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-purple" tabIndex={0}>
                      비밀번호
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <MdOutlinePassword className="absolute text-xl left-3 top-4 text-purple" />
                        <Input
                          type="password"
                          placeholder="비밀번호"
                          {...field}
                          className="w-full pl-10"
                          aria-required="true"
                          aria-describedby="password-error"
                        />
                      </div>
                    </FormControl>
                    <FormMessage id="password-error" role="alert" tabIndex={0} className="text-error-40" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-purple" tabIndex={0}>
                      비밀번호 확인
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <MdOutlinePassword className="absolute text-xl left-3 top-4 text-purple" />
                        <Input
                          type="password"
                          placeholder="비밀번호 확인"
                          {...field}
                          className="w-full pl-10"
                          aria-required="true"
                          aria-describedby="confirm-password-error"
                        />
                      </div>
                    </FormControl>
                    <FormMessage id="confirm-password-error" role="alert" tabIndex={0} className="text-error-40" />
                  </FormItem>
                )}
              />
              {error && (
                <p className="text-sm font-medium text-error-40" role="alert" aria-live="polite">
                  {error}
                </p>
              )}
              <Button variant="default" type="submit" size="default" className="w-full" aria-label="회원가입하기">
                회원가입
              </Button>
            </form>
          </Form>
          <Button variant="link" size="sm" onClick={() => navigate('/login')} aria-label="로그인 페이지로 이동">
            <span>로그인</span>
          </Button>
        </div>
      </section>
    </main>
  );
};
