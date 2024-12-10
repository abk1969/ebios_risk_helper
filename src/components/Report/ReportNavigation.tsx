import React from 'react';

interface NavigationSection {
  title: string;
  ref: React.RefObject<HTMLElement>;
}

interface ReportNavigationProps {
  sections: NavigationSection[];
}

const ReportNavigation: React.FC<ReportNavigationProps> = ({ sections }) => {
  return (
    <nav className="sticky top-0 bg-white shadow-md p-4 z-10">
      <ul className="flex space-x-4">
        {sections.map((section, index) => (
          <li key={index}>
            <a
              href={`#${section.title.toLowerCase().replace(/ /g, '-')}`}
              onClick={e => {
                e.preventDefault();
                section.ref.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ReportNavigation;