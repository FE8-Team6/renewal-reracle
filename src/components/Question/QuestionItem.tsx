import { NavLink } from 'react-router-dom';
import { formatDateToKoreanTime } from '@/lib/utils/dateKoreanTime';
import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';

type QuestionItemProps = {
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

const QuestionItem = ({ question, likedPosts, currentUser, handleLiked }: QuestionItemProps) => {
  const truncateTitle = (title: string) => {
    return title.length > 23 ? `${title.slice(0, 23)}...` : title;
  };

  return (
    <div
      key={question.id}
      className=" bg-greenLight w-full h-[6rem] mx-auto my-3 flex items-center justify-between px-3 rounded-4 text-black ">
      <NavLink
        to={`/answer/${question.id}`}
        state={{
          questionId: question.id,
          question: question.question,
          content: question.content,
          author: question.author,
          createdAt: question.createdAt ? question.createdAt.toDate().toISOString() : null,
          likes: question.likes,
          likedPosts: Array.from(likedPosts),
          commentCount: question.commentCount,
          currentUser,
          authorUid: question.authorUid,
          postCategory: question.postCategory,
        }}
        className="flex flex-col flex-grow">
        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-900 truncate">{truncateTitle(question.question)}</h2>
          <p className="text-sm text-gray-500">{question.author}</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-2">
            {question.createdAt && (
              <time className="text-sm">{formatDateToKoreanTime(question.createdAt.toDate())}</time>
            )}
            <p className="text-sm">댓글 {question.commentCount}개</p>
          </div>
          <div className="flex items-center">
            <Button
              className="bg-transparent hover:bg-transparent"
              variant="secondary"
              size="icon"
              onClick={(event) => {
                event.preventDefault();
                handleLiked(question.id);
              }}>
              <ThumbsUp className={`w-[1rem] h-[1rem] ${likedPosts.has(question.id) ? 'text-blue-500' : ''}`} />
            </Button>
            <span>{question.likes}</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default QuestionItem;
