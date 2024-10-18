import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { Layout } from '@/components/layout/Layout';

const HeaderQna = styled.div`
  width: 56.3vh;
  height: 3.75vh;
  background: #9747ff;
  text-align: center;
  align-content: center;
  color: white;
  font-size: 2vh;
`;

const QuestionListContainer = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 1.5vh auto;
  width: 52vh;
  position: relative;
`;

const QuestionContainer = styled.div`
  background: #93fd98;
  width: 50vh;
  margin: 1.5vh auto;
  height: 3.75vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1vh;
  border-radius: 10px;
  color: white;
  font-size: 2vh;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  width: 35vh;
`;

const DeleteButton = styled.button`
  background: #ff4747;
  border: none;
  border-radius: 5px;
  height: 2.5vh;
  color: white;
  cursor: pointer;
  padding: 0 1vh;
  font-size: 1.5vh;
`;

export const MyQuestion = () => {
  const [questions, setQuestions] = useState<
    { id: string; question: string; author: string; authorUid: string }[]
  >([]);
  const currentUser = getAuth().currentUser;

  useEffect(() => {
    if (currentUser) {
      const fetchQuestions = async () => {
        const q = query(collection(db, 'questions'), where('authorUid', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const questionList: { id: string; question: string; author: string; authorUid: string }[] = [];
        querySnapshot.forEach((doc) => {
          const questionData = doc.data();
          questionList.push({
            id: doc.id,
            question: questionData.question,
            author: questionData.author,
            authorUid: questionData.authorUid,
          });
        });
        setQuestions(questionList);
      };
      fetchQuestions();
    }
  }, [currentUser]);

  const handleDeleteQuestion = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'questions', id));
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <Layout>
      <HeaderQna>
        <div>마이 R지식in</div>
      </HeaderQna>
      <QuestionListContainer>
        {questions.map((questionData, index) => (
          <QuestionContainer key={index}>
            <StyledLink to={`/answer/${questionData.id}`} state={{ question: questionData.question }}>
              {questionData.question}
            </StyledLink>
            <DeleteButton onClick={() => handleDeleteQuestion(questionData.id)}>삭제</DeleteButton>
          </QuestionContainer>
        ))}
      </QuestionListContainer>
    </Layout>
  );
};
