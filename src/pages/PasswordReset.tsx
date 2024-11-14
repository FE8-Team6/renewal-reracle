import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import LoginToSignUpTitle from '@/components/LoginToSignUpTitle';
import { MdAlternateEmail } from 'react-icons/md';
import { Button } from '@/components/ui/button';

export const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [errorKey, setErrorKey] = useState(0);
  const navigate = useNavigate();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailSent(false);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('이메일 형식이 올바르지 않습니다.');
      setErrorKey((prev) => prev + 1);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setError('가입되어 있지 않은 이메일 주소입니다.');
      } else {
        setError('비밀번호 재설정 이메일 전송에 실패했습니다.');
      }
    }
  };

  return (
    <Layout>
      <LoginToSignUpTitle title="비밀번호 재설정" />
      <section className="w-[56.3vh] h-[79.7vh] bg-white flex flex-col justify-center items-center gap-2 overflow-hidden">
        <form onSubmit={handlePasswordReset} className="w-[46vh] flex flex-col justify-center items-center">
          <div className="relative flex">
            <input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[46vh] h-[6vh] border border-purple-500 rounded-[1vh] mb-[1vh] pl-[5vh] box-border text-[2vh]"
            />
            <MdAlternateEmail className="absolute left-[1.5vh] top-[1.8vh] text-[2.5vh] text-purple-500" />
          </div>
          {error && (
            <p key={errorKey} className="absolute bottom-[7.5vh] animate-vibration text-red-500">
              {error}
            </p>
          )}
          <Button type="submit">비밀번호 재설정 이메일 전송</Button>
        </form>
        {emailSent && <p>비밀번호 재설정 이메일이 전송되었습니다.</p>}
        <Button onClick={() => navigate('/login')}>취소</Button>
      </section>
    </Layout>
  );
};
