import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import styled from 'styled-components';
import LoginToSignUpTitle from '@/components/LoginToSignUpTitle';
import { MdAlternateEmail } from 'react-icons/md';
import { PurpleButton, WhiteButton } from '@/components/Buttons';

const Container = styled.section`
  width: 56.3vh;
  height: 79.7vh;
  background-color: var(--color-white);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vh;
  overflow-y: hidden;
`;
const PwResetFrom = styled.form`
  width: 46vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const InputContainer = styled.div`
  display: flex;
  position: relative;
`;
const TextInput = styled.input`
  width: 46vh;
  height: 6vh;
  border: 1px solid var(--color-purple);
  border-radius: 1vh;
  margin-bottom: 1vh;
  padding-left: 5vh;
  box-sizing: border-box;
  font-size: 2vh;
`;
const EmailLabel = styled(MdAlternateEmail)`
  position: absolute;
  left: 1.5vh;
  top: 1.8vh;
  font-size: 2.5vh;
  color: var(--color-purple);
`;
const ErrorMessage = styled.p`
  position: absolute;
  bottom: 7.5vh;
  animation: vibration 0.1s;
  @keyframes vibration {
    0% {
      transform: translateX(0);
      color: var(--color-gray-dark);
    }
    25% {
      transform: translateX(-5px);
      ccolor: #7e3f46;
    }
    50% {
      transform: translateX(5px);
      color: #be3f46;
    }
    75% {
      transform: translateX(-5px);
      color: #ff3f46;
    }
    100% {
      transform: translateX(0);
      color: var(--color-red);
    }
  }
`;

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
      <Container>
        <PwResetFrom onSubmit={handlePasswordReset}>
          <InputContainer>
            <TextInput type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
            <EmailLabel />
          </InputContainer>
          {error && <ErrorMessage key={errorKey}>{error}</ErrorMessage>}
          <PurpleButton type="submit">비밀번호 재설정 이메일 전송</PurpleButton>
        </PwResetFrom>
        {emailSent && <p>비밀번호 재설정 이메일이 전송되었습니다.</p>}
        <WhiteButton onClick={() => navigate('/login')}>취소</WhiteButton>
      </Container>
    </Layout>
  );
};
