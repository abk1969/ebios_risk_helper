import React, { useState } from 'react';

interface HelpTooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right'; // Optionnel : Position de la tooltip
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({
  text,
  position = 'top', // Valeur par défaut : top
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Définir les classes de positionnement en fonction de la prop "position"
  let positionClass = '';
  switch (position) {
    case 'bottom':
      positionClass = 'top-full mt-2';
      break;
    case 'left':
      positionClass = 'right-full mr-2';
      break;
    case 'right':
      positionClass = 'left-full ml-2';
      break;
    default: // top
      positionClass = 'bottom-full mb-2';
  }

  return (
    <div className="relative inline-block group">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-2 rounded-full text-xs focus:outline-none"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Aide"
      >
        ?
      </button>
      {showTooltip && (
        <div
          className={`absolute ${positionClass} bg-gray-800 text-white text-sm rounded-md p-3 w-64 z-10 transition-opacity duration-200 ease-in-out whitespace-pre-wrap`}
          style={{
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default HelpTooltip;