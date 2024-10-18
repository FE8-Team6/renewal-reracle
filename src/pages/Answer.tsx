import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { Layout } from "@/components/layout/Layout";

const AnswerBlock = styled.button`
  display: block;
  margin: 1vh auto;
  border: none;
  background: #93fd98;
  color: white;
  font-size: 2vh;
`;

const AnswerContainer = styled.div`
  text-align: center;
  margin-top: 4vh;
  overflow: hidden;
`;

const AnswerDisplay = styled.div`
  margin-top: 2vh;
  height: 50vh;
  overflow-y: auto;
`;

const InputAnswer = styled.textarea`
  width: 50vh;
  height: 10vh;
`;

const AnswerBtn = styled.button`
  width: 12vh;
  height: 4vh;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 2vh;
  background: #93fd98;
  color: white;
`;

const AnswerBox = styled.div`
  position: relative;
  background: #93fd98;
  width: 50vh;
  margin: 1.5vh auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1vh;
  border-radius: 10px;
  color: white;
  font-size: 2.5vh;
`;

const AnswerContent = styled.p`
  color: black;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
`;

const AnswerInfo = styled.div`
  margin-top: 1vh;
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
  margin-top: 1vh;
`;

const QuestionBox = styled.p`
  text-align: center;
  font-size: 2.5vh;
  font-weight: bold;
`;

export const Answer = () => {
  const location = useLocation();
  const question = location.state?.question || "";

  const [answer, setAnswer] = useState("");
  const [submittedAnswers, setSubmittedAnswers] = useState<
    { id: string; author: string; authorUid: string; content: string }[]
  >([]);
  const [nickname, setNickname] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userQuery = query(
          collection(db, "users"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setNickname(userData.nickname);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchAnswers = async () => {
      const answersCollection = collection(db, "answers");
      const answerQuery = query(
        answersCollection,
        where("question", "==", question)
      );
      const querySnapshot = await getDocs(answerQuery);
      const answersData = querySnapshot.docs.map(
        (doc) =>
          ({ id: doc.id, ...doc.data() } as {
            id: string;
            author: string;
            authorUid: string;
            content: string;
          })
      );
      setSubmittedAnswers(answersData);
    };

    fetchAnswers();
  }, [question]);

  const handleSubmit = async () => {
    try {
      const user = getAuth().currentUser;
      const docRef = await addDoc(collection(db, "answers"), {
        question: question,
        author: nickname,
        authorUid: user.uid, // 작성자의 UID도 함께 저장
        content: answer,
      });
      setSubmittedAnswers([
        ...submittedAnswers,
        {
          id: docRef.id,
          author: nickname,
          authorUid: user.uid,
          content: answer,
        },
      ]);
      setAnswer("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDeleteAnswer = async (id: string) => {
    try {
      await deleteDoc(doc(db, "answers", id));
      setSubmittedAnswers(
        submittedAnswers.filter((answer) => answer.id !== id)
      );
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <Layout>
      <div>
        <AnswerBlock>답변하기</AnswerBlock>
        <QuestionBox>{question}</QuestionBox>
        <AnswerContainer>
          <InputAnswer
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <AnswerBtn onClick={handleSubmit}>제출</AnswerBtn>
        </AnswerContainer>
        <AnswerDisplay>
          {submittedAnswers.map(({ id, author, authorUid, content }) => (
            <AnswerBox key={id}>
              <AnswerInfo>{author}</AnswerInfo>
              <AnswerContent>{content}</AnswerContent>
              {currentUser &&
                currentUser.uid === authorUid && ( // 현재 사용자와 작성자의 UID를 비교하여 삭제 버튼 표시
                  <DeleteButton onClick={() => handleDeleteAnswer(id)}>
                    삭제
                  </DeleteButton>
                )}
            </AnswerBox>
          ))}
        </AnswerDisplay>
      </div>
    </Layout>
  );
};
