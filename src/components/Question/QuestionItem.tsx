import { NavLink } from 'react-router-dom';
import { formatDateToKoreanTime } from '@/utils/dateKoreanTime';
import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import { QuestionItemProps } from '@/types/question';

export const QuestionItem = ({ question, likedPosts, currentUser, handleLiked }: QuestionItemProps) => {
  const truncateTitle = (title: string) => {
    return title.length > 23 ? `${title.slice(0, 23)}...` : title;
  };

  return (
    <article
      key={question.id}
      className="bg-greenLight w-full h-[6rem] mx-auto my-3 flex items-center justify-between px-3 rounded-4 text-black"
      aria-label={`${question.question} 질문`}
    >
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
        className="flex flex-col flex-grow"
        aria-label={`${question.question} 질문 상세보기`}
      >
        <header className="flex flex-col">
          <h2 className="font-semibold text-gray-900 truncate" tabIndex={0} aria-label={`제목: ${question.question} `}>
            {truncateTitle(question.question)}
          </h2>
          <p className="text-sm text-gray-700" aria-label={`작성자: ${question.author}`} tabIndex={0}>
            {question.author}
          </p>
        </header>
        <footer className="flex items-center justify-between mt-1">
          <div className="flex gap-2" aria-label="게시물 정보">
            {question.createdAt && (
              <time
                className="text-sm"
                tabIndex={0}
                aria-label={`작성 시간: ${formatDateToKoreanTime(question.createdAt.toDate())}`}
              >
                {formatDateToKoreanTime(question.createdAt.toDate())}
              </time>
            )}
            <p className="text-sm" tabIndex={0} aria-label={`댓글 ${question.commentCount}개`}>
              댓글 {question.commentCount}개
            </p>
          </div>
          <div className="flex items-center">
            <Button
              className="bg-transparent hover:bg-transparent"
              variant="secondary"
              size="icon"
              onClick={(event) => {
                event.preventDefault();
                handleLiked(question.id);
              }}
              aria-label={`좋아요 ${likedPosts.has(question.id) ? '취소하겠습니까?' : '누르시겠습니까?'}`}
              aria-pressed={likedPosts.has(question.id)}
            >
              <ThumbsUp className={`w-[1rem] h-[1rem] ${likedPosts.has(question.id) ? 'text-blue-500' : ''}`} />
            </Button>
            <span tabIndex={0} aria-label={`좋아요 ${question.likes}개`}>
              {question.likes}
            </span>
          </div>
        </footer>
      </NavLink>
    </article>
  );
};
