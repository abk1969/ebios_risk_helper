import React from 'react';

interface ScaleSelectorProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  labels?: string[];
  onChange: (value: number) => void;
  disabled?: boolean;
  showValue?: boolean;
  className?: string;
  labelClassName?: string;
  orientation?: 'horizontal' | 'vertical';
}

const ScaleSelector: React.FC<ScaleSelectorProps> = ({
  value,
  min = 1,
  max = 4,
  step = 1,
  labels = [],
  onChange,
  disabled = false,
  showValue = true,
  className = '',
  labelClassName = '',
  orientation = 'horizontal',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    onChange(newValue);
  };

  const getLabel = (index: number): string => {
    if (labels && labels[index - min]) {
      return labels[index - min];
    }
    return index.toString();
  };

  const getCurrentLabel = (): string => {
    return getLabel(value);
  };

  const containerStyles = orientation === 'vertical' ? 'flex-col h-64' : 'w-full';
  const labelsContainerStyles = orientation === 'vertical' 
    ? 'flex-col space-y-4 mr-2' 
    : 'justify-between space-x-4';

  return (
    <div className={`flex items-center ${containerStyles} ${className}`}>
      <div className="flex-grow">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`
            w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${orientation === 'vertical' ? 'transform -rotate-90' : ''}
          `}
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${
              ((value - min) / (max - min)) * 100
            }%, #E5E7EB ${((value - min) / (max - min)) * 100}%, #E5E7EB 100%)`
          }}
        />
      </div>

      <div className={`flex ${labelsContainerStyles} ${labelClassName}`}>
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((val) => (
          <div
            key={val}
            className={`text-sm text-gray-600 text-center ${
              val === value ? 'font-medium text-blue-600' : ''
            }`}
          >
            {getLabel(val)}
          </div>
        ))}
      </div>

      {showValue && (
        <div className="ml-4 text-sm font-medium text-gray-700">
          {getCurrentLabel()}
        </div>
      )}
    </div>
  );
};

export default ScaleSelector;