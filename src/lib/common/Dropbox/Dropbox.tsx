import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';

export default function Dropbox({
  options,
  placeholder,
  className,
}: {
  options: { value: string; label: string }[];
  placeholder: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Select onOpenChange={setIsOpen}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
        <span className="ml-2">{isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}</span>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
