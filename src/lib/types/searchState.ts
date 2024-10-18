export interface SearchState {
  searchHistory: SearchHistoryItem[];
  addSearchHistory: (searchQuery: string, categoryId: string, itemId: string) => void;
  clearSearchHistory: () => void;
}

interface SearchHistoryItem {
  queryData: string;
  categoryId: string;
  itemId: string;
}
