import React from 'react';

interface ScaleSelectorProps {
  value: number;
  onChange: (value: number) => void;
  scale: number[]; // Par exemple, [1, 2, 3, 4]
  labels: string[]; // Par exemple, ['Négligeable', 'Modéré', 'Important', 'Critique']
  name: string; // Nom du groupe de boutons radio pour l'accessibilité
}

const ScaleSelector: React.FC<ScaleSelectorProps> = ({
  value,
  onChange,
  scale,
  labels,
  name,
}) => {
  return (
    <div className="inline-flex items-center space-x-4" role="group" aria-label={name}>
      {scale.map((level, index) => (
        <label key={level} className="flex items-center">
          <input
            type="radio"
            name={name}
            value={level}
            checked={value === level}
            onChange={() => onChange(level)}
            className="hidden" // Cacher visuellement le bouton radio
            aria-label={labels[index]}
          />
          <span
            className={`px-4 py-2 rounded-md cursor-pointer inline-flex items-center justify-center transition-colors duration-200 ${
              value === level
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {labels[index]}
          </span>
        </label>
      ))}
    </div>
  );
};

export default ScaleSelector;