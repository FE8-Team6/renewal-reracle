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
import KakaoAdfit320x50 from '@/components/KakaoAdfit320x50';
import { signUpSchema } from '@/lib/constant/signUpSchema';

export const SignUp = () => {
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
    <main className="flex flex-col h-[calc(100vh-5rem)]">
      <section className="flex-grow overflow-y-auto">
        <KakaoAdfit320x50 />
        <div className="w-full h-full bg-white relative flex flex-col justify-center items-center gap-3 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full max-w-md px-4">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-purple">닉네임</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <MdOutlineTagFaces className="absolute text-xl left-3 top-4 text-purple" />
                        <Input placeholder="닉네임" {...field} className="w-full pl-10" />
                        <Button variant="secondary" size="sm" onClick={checkDisplayName} className="mt-2">
                          중복 확인
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-purple">이메일</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <MdAlternateEmail className="absolute text-xl left-3 top-4 text-purple" />
                        <Input placeholder="이메일" {...field} className="w-full pl-10" />
                        <Button variant="secondary" size="sm" onClick={checkEmail} className="mt-2">
                          중복 확인
                        </Button>
                      </div>
                    </FormControl>
                    {emailError && <FormMessage className="text-error-40">{emailError}</FormMessage>}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-purple">비밀번호</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <MdOutlinePassword className="absolute text-xl left-3 top-4 text-purple" />
                        <Input type="password" placeholder="비밀번호" {...field} className="w-full pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold text-purple">비밀번호 확인</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <MdOutlinePassword className="absolute text-xl left-3 top-4 text-purple" />
                        <Input type="password" placeholder="비밀번호 확인" {...field} className="w-full pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-sm font-medium text-error-40">{error}</p>}
              <Button variant="default" type="submit" size="default" className="w-full">
                회원가입
              </Button>
            </form>
          </Form>
          <Button variant="link" size="sm" onClick={() => navigate('/login')}>
            <span>로그인</span>
          </Button>
        </div>
      </section>
    </main>
  );
};
