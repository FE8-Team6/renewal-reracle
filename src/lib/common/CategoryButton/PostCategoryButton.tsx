import React from 'react';
import { Button } from '@/components/ui/button.tsx';

type CategoryButtonProps = {
  postCategory: string;
  isActive: boolean;
  onClick: () => void;
};

export const PostCategoryButton: React.FC<CategoryButtonProps> = ({ postCategory, isActive, onClick }) => {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size="sm"
      className={`px-3 py-1 mr-2 mb-2 rounded-full text-sm ${isActive ? 'bg-purple text-white' : 'bg-gray-200 text-gray-700'}`}
      onClick={onClick}
      role="radio"
      aria-checked={isActive}
      tabIndex={0}
      aria-label={`${postCategory} 카테고리 ${isActive ? '선택 되었습니다.' : '선택 하시겠습니까?'}`}
    >
      {postCategory}
    </Button>
  );
};
