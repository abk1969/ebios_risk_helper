import React from 'react';

interface Props {
  sections: Array<{
    title: string;
    ref: React.RefObject<HTMLElement>;
  }>;
}

export const ReportNavigation: React.FC<Props> = ({ sections }) => {
  const [activeSection, setActiveSection] = React.useState<string>('');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (ref: React.RefObject<HTMLElement>) => {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      className="sticky top-0 z-50 bg-white shadow-md p-4" 
      aria-label="Navigation des sections"
    >
      <ul className="flex flex-wrap gap-4" role="list">
        {sections.map((section) => (
          <li key={`section-${section.title}`}>
            <button
              onClick={() => handleClick(section.ref)}
              className={`font-medium px-3 py-2 rounded-md transition-colors
                ${activeSection === section.ref.current?.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                }`}
              aria-current={activeSection === section.ref.current?.id}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};