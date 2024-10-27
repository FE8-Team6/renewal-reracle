"use client";

import React, { useState } from "react";
import { AlertCircle, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ error, className, ...props }, ref) => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (props.onChange) {
        props.onChange(event);
      }
    };

    const handleClear = () => {
      setValue("");
      if (props.onChange) {
        props.onChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <div className={`${className || "w-full"}`}>
        <div className={"relative flex items-center w-full"}>
          <div className=" absolute left-3 ">
            <Search className="h-5 w-5" />
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
            placeholder={props.placeholder || "Searchbar"}
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
