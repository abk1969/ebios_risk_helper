import React, { useState } from 'react';

interface HelpTooltipProps {
  content: string;
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({ content }) => {
  const [showTooltip, setShowTooltip] = useState(false);

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
          className={`absolute top-full mt-2 bg-gray-800 text-white text-sm rounded-md p-3 w-64 z-10 transition-opacity duration-200 ease-in-out whitespace-pre-wrap`}
          style={{
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default HelpTooltip;