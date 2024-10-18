import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { wasteCategories } from '@/lib/constants/wasteCategories';
import { useSearchStore } from '@/lib/store/useSearchStore';

type SearchResults = {
  categoryId: string;
  id: string;
  name: string;
  img?: string;
  disposalMethod?: string;
}[];

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResults>([]);

  const resultContainerRef = useRef<HTMLUListElement | null>(null);
  const addSearchHistory = useSearchStore((state) => state.addSearchHistory);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (resultContainerRef.current && !resultContainerRef.current.contains(target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const matchedItems = wasteCategories
        .flatMap((category) =>
          category.items ? category.items.map((item) => ({ ...item, categoryId: category.id })) : [],
        )
        .filter((item) => item.name && item.name.includes(query));
      setSearchResults(matchedItems);
    } else {
      setSearchResults([]);
    }
  };

  const handleItemClick = (categoryId: string, itemId: string, itemName: string) => {
    navigate(`/${categoryId}/${itemId}`);
    addSearchHistory(itemName, categoryId, itemId);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchResults.length > 0) {
      const firstSearchResult = searchResults[0];
      handleItemClick(firstSearchResult.categoryId, firstSearchResult.id, firstSearchResult.name);
    }
  };

  return (
    <div className=" w-[37vh]">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="검색어를 입력하세요"
          className="w-[37vh] h-[5vh] text-[2vh] font-medium text-gray-700 focus:outline-none focus:shadow-none"
        />
      </form>
      {searchResults.length > 0 && (
        <ul
          ref={resultContainerRef}
          className="absolute w-[37vh] top-[5vh] mt-[1vh] bg-white border border-purple-600 rounded-[0.5vh] shadow-lg z-10">
          {searchResults.map((item) => (
            <li
              key={item.id}
              onClick={() => handleItemClick(item.categoryId, item.id, item.name)}
              className="p-[1.2vh] text-[2vh] cursor-pointer hover:bg-gray-200">
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
