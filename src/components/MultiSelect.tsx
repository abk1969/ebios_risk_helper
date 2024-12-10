import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';

interface Option {
  id: string;
  name: string;
}

interface MultiSelectProps {
  label: string;
  id: string;
  options: Option[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  id,
  options,
  selectedIds,
  onChange,
  placeholder = 'Sélectionnez des options',
  className = '',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const isSelected = (optionId: string) => selectedIds.includes(optionId);

  const handleChange = (optionId: string) => {
    const newSelectedIds = isSelected(optionId)
      ? selectedIds.filter(id => id !== optionId)
      : [...selectedIds, optionId];
    onChange(newSelectedIds);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getSelectedDisplay = () => {
    if (selectedIds.length === 0) return placeholder;
    if (selectedIds.length === 1) {
      const selectedOption = options.find(
        option => option.id === selectedIds[0],
      );
      return selectedOption ? selectedOption.name : placeholder;
    }
    return `${selectedIds.length} option(s) sélectionnée(s)`;
  };

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`relative w-full bg-white border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={id}
      >
        <span className="block truncate">{getSelectedDisplay()}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </button>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          role="listbox"
        >
          <div className="sticky top-0 z-10 bg-white px-2 py-1.5">
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Rechercher"
            />
          </div>

          <div className="pt-1 pb-2 px-2 space-y-1">
            {filteredOptions.length === 0 ? (
              <div
                className="text-gray-500 text-sm py-2 px-3"
                role="option"
              >
                Aucun résultat trouvé
              </div>
            ) : (
              filteredOptions.map(option => (
                <div
                  key={option.id}
                  className={`flex items-center px-3 py-2 cursor-pointer hover:bg-blue-50 rounded-md ${
                    isSelected(option.id) ? 'bg-blue-50 font-semibold' : ''
                  }`}
                  onClick={() => handleChange(option.id)}
                  role="option"
                  aria-selected={isSelected(option.id)}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                    checked={isSelected(option.id)}
                    onChange={() => {}}
                    onClick={e => e.stopPropagation()}
                    aria-hidden="true"
                  />
                  <span className="ml-3 block truncate">{option.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;