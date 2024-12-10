import React from 'react';

interface Props {
  sections: Array<{
    title: string;
    ref: React.RefObject<HTMLElement>;
  }>;
}

export const ReportNavigation: React.FC<Props> = ({ sections }) => {
  const handleClick = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md p-4">
      <ul className="flex flex-wrap gap-4">
        {sections.map((section, index) => (
          <li key={index}>
            <button
              onClick={() => handleClick(section.ref)}
              className="text-blue-600 hover:text-blue-800 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};