import { useState, useRef, useEffect } from 'react';

interface Props<T> {
  options: T[];
  value: T[];
  onChange: (value: T[]) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  placeholder?: string;
}

export function MultiSelect<T>({
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
  placeholder = 'Sélectionner...'
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: T) => {
    const optionValue = getOptionValue(option);
    const isSelected = value.some(v => getOptionValue(v) === optionValue);
    
    if (isSelected) {
      onChange(value.filter(v => getOptionValue(v) !== optionValue));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 border rounded text-left bg-white flex justify-between items-center"
      >
        <span className="truncate">
          {value.length > 0
            ? value.map(v => getOptionLabel(v)).join(', ')
            : placeholder}
        </span>
        <span className="ml-2">▼</span>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 border rounded bg-white shadow-lg max-h-60 overflow-auto">
          {options.map((option) => {
            const isSelected = value.some(
              v => getOptionValue(v) === getOptionValue(option)
            );
            return (
              <div
                key={getOptionValue(option)}
                onClick={() => handleSelect(option)}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  isSelected ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  {getOptionLabel(option)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
