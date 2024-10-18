import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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

const Question = styled.button`
  display: block;
  margin: 1vh auto;
  border: none;
  background: #93fd98;
  color: white;
  font-size: 2vh;
`;

const QnaArea = styled.div`
  text-align: center;
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

const QuestionInput = styled.input`
  background: #ffffff;
  border: none;
  border-radius: 5px;
  height: 2.5vh;
  width: 35vh;
  padding: 0.5vh;
  font-size: 1.5vh;
`;

const AddButton = styled.button`
  background: #9747ff;
  border: none;
  border-radius: 5px;
  height: 2.5vh;
  color: white;
  cursor: pointer;
  padding: 0 1vh;
  font-size: 1.5vh;
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

export const Qna = () => {
  const [questions, setQuestions] = useState<{ question: string; author: string; authorUid: string }[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const questionList: { question: string; author: string; authorUid: string }[] = [];
      querySnapshot.forEach((doc) => {
        const questionData = doc.data();
        questionList.push({
          question: questionData.question,
          author: questionData.author,
          authorUid: questionData.authorUid,
        });
      });
      setQuestions(questionList);
    };
    fetchQuestions();
  }, []);

  const handleAddQuestion = async () => {
    if (!currentUser) {
      alert('질문을 추가하려면 로그인해야 합니다.');
      return;
    }
    if (currentQuestion.trim() === '') return;

    try {
      const docRef = await addDoc(collection(db, 'questions'), {
        question: currentQuestion,
        author: currentUser.displayName, // 현재 사용자의 이름 저장
        authorUid: currentUser.uid, // 현재 사용자의 UID 저장
      });
      console.log('Document written with ID: ', docRef.id);

      setQuestions([
        ...questions,
        { question: currentQuestion, author: currentUser.displayName, authorUid: currentUser.uid },
      ]);
      setCurrentQuestion('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleDeleteQuestion = async (index: number) => {
    if (!currentUser) {
      alert('질문을 삭제하려면 로그인해야 합니다.');
      return;
    }
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        const deletedQuestion = questions[index];
        if (deletedQuestion.authorUid === currentUser.uid) {
          const updatedQuestions = [...questions];
          updatedQuestions.splice(index, 1);
          setQuestions(updatedQuestions);

          const querySnapshot = await getDocs(collection(db, 'questions'));
          querySnapshot.forEach((doc) => {
            if (
              doc.data().question === deletedQuestion.question &&
              doc.data().author === deletedQuestion.author
            ) {
              deleteDoc(doc.ref);
            }
          });
        } else {
          alert('자신의 질문만 삭제할 수 있습니다.');
        }
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    }
  };

  return (
    <Layout>
      <HeaderQna>R 지식in</HeaderQna>
      <Question>질문하기</Question>
      <QnaArea>
        <QuestionInput
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          placeholder="질문을 입력하세요"
        />
        <AddButton onClick={handleAddQuestion}>추가</AddButton>
      </QnaArea>

      <QuestionListContainer>
        {questions.map((questionData, index) => (
          <QuestionContainer key={index}>
            <StyledLink
              to={`/answer/${encodeURIComponent(questionData.question)}`}
              state={{ question: questionData.question }}>
              {questionData.question}
            </StyledLink>
            {currentUser && questionData.authorUid === currentUser.uid && (
              <DeleteButton onClick={() => handleDeleteQuestion(index)}>삭제</DeleteButton>
            )}
          </QuestionContainer>
        ))}
      </QuestionListContainer>
    </Layout>
  );
};
