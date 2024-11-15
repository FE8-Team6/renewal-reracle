import React from 'react';
import { Button } from '@/components/ui/button';

type CategoryButtonProps = {
  postCategory: string;
  isActive: boolean;
  onClick: () => void;
};

const PostCategoryButton: React.FC<CategoryButtonProps> = ({ postCategory, isActive, onClick }) => {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size="sm"
      className={`px-3 py-1 mr-2 mb-2 rounded-full text-sm ${isActive ? 'bg-purple text-white' : 'bg-gray-200 text-gray-700'}`}
      onClick={onClick}>
      {postCategory}
    </Button>
  );
};

export default PostCategoryButton;
