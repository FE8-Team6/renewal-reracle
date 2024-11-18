import React from 'react';
import { Button } from '@/components/ui/button';

type AnnouncementCategoryButtonProps = {
  postCategory: string;
  isActive: boolean;
  onClick: () => void;
};

const AnnouncementCategoryButton: React.FC<AnnouncementCategoryButtonProps> = ({ postCategory, isActive, onClick }) => {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size="sm"
      className={`px-3 py-1 mr-2 mb-2 rounded-full text-sm ${isActive ? 'bg-yellow text-white hover:bg-yellow' : 'bg-gray-200 text-gray-700'}`}
      onClick={onClick}
    >
      {postCategory}
    </Button>
  );
};

export default AnnouncementCategoryButton;
