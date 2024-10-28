"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

type SearchResults = {
  categoryId: string;
  id: string;
  name: string;
}[];

type Category = {
  id: string;
  items: {
    name: string;
    id: string;
    imageURL: string;
    description: string;
  }[];
};

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ error, className, ...props }, ref) => {
    const [value, setValue] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResults>([]);
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (props.onChange) {
        props.onChange(event);
      }
    };

    const handleClear = () => {
      setValue("");
      setSearchResults([]);
      if (props.onChange) {
        props.onChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const handleSearch = async () => {
      if (value.trim() === "") {
        setSearchResults([]);
        return;
      }

      const categoriesCollectionRef = collection(db, "WasteCategories");
      const categoriesSnap = await getDocs(categoriesCollectionRef);
      const categoriesData = categoriesSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];

      const results = categoriesData.flatMap((category) =>
        category.items
          .filter((item) =>
            item.name?.toLowerCase().includes(value.toLowerCase())
          )
          .map((item) => ({
            ...item,
            categoryId: category.id,
          }))
      );
      setSearchResults(results);
    };

    useEffect(() => {
      handleSearch();
    }, [value]);

    const handleResultClick = (categoryId: string, itemId: string) => {
      navigate(`/category/${categoryId}/item/${itemId}`);
    };

    return (
      <div className={`${className || "w-full"}`}>
        <div className={"relative flex items-center w-full"}>
          <div className="absolute left-3">
            <Search className="w-5 h-5" />
          </div>
          <Input
            {...props}
            ref={ref}
            value={value}
            onChange={handleChange}
            className={`h-[50px] rounded-5 focus:outline-none ${
              error
                ? "focus:border focus:border-error-40"
                : "focus:border focus:border-primary-40"
            }`}
            placeholder={
              props.placeholder ||
              "ex. 명함, 수첩 등 분리 수거 품목을 입력해주세요"
            }
          />
          {value && (
            <button
              onClick={handleClear}
              className={`absolute right-3 rounded-10 ${
                error ? "bg-error-40" : ""
              }`}
              type="button"
            >
              <X className={`h-5 w-5 ${error ? "text-neutral-0" : ""} `} />
            </button>
          )}
        </div>
        {searchResults.length > 0 && (
          <div className="absolute bg-white border shadow-lg rounded-4 w-[23rem] z-10">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleResultClick(result.categoryId, result.id)}
              >
                {result.name}
              </div>
            ))}
          </div>
        )}
        {error && (
          <div className="w-full rounded-4 bg-error-5 text-error-30 text-[13px] mt-1 p-2">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-error-30" />
              {error}
            </div>
          </div>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
