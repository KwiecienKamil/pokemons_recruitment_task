import type { ChangeEvent } from "react";
import { Input } from "./ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      type="text"
      placeholder="Search Pokémon..."
      value={value}
      onChange={handleInputChange}
      className="min-w-[30%] rounded-full w-full sm:w-64"
    />
  );
}