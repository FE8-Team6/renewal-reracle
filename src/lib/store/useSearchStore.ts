import { create } from "zustand";
import { produce } from "immer";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { SearchState } from "@/lib/types/searchState";

const MAX_SEARCH_HISTORY_LENGTH = 8;

export const useSearchStore = create<SearchState>()(
  devtools(
    persist(
      (set) => ({
        searchHistory: [],
        addSearchHistory: (searchQuery, categoryId, itemId) =>
          set(
            produce((state: SearchState) => {
              const newHistoryItem = {
                queryData: searchQuery,
                categoryId,
                itemId,
              };
              state.searchHistory.unshift(newHistoryItem);
              if (state.searchHistory.length > MAX_SEARCH_HISTORY_LENGTH) {
                state.searchHistory.pop();
              }
            })
          ),
        clearSearchHistory: () => set({ searchHistory: [] }),
      }),
      {
        name: "search-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
