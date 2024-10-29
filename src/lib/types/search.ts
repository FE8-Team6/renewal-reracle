export type RecentSearchHistory = {
  id: string;
  categoryId: string;
  itemId: string;
  query: string;
  userId: string;
}[];

export type SearchResults = {
  categoryId: string;
  id: string;
  name: string;
}[];
