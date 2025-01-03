import { Timestamp } from 'firebase/firestore';

export type QuestionFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleAddQuestion: () => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  setPostCategory: (category: string) => void;
};

export type QuestionItemProps = {
  question: {
    id: string;
    question: string;
    author: string;
    authorUid: string;
    content: string;
    createdAt: Timestamp;
    likes: number;
    commentCount: number;
    postCategory: string;
  };
  likedPosts: Set<string>;
  currentUser: {
    displayName: string;
    uid: string;
  };
  handleLiked: (id: string) => void;
};
