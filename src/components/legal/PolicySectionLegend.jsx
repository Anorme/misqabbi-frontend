import { useEffect, useState } from 'react';

const PolicySectionLegend = ({ sections = [], variant = 'mobile' }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);

  useEffect(() => {
    if (!sections.length) return undefined;

    const elements = sections.map(section => document.getElementById(section.id)).filter(Boolean);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  const handleNavClick = (event, sectionId) => {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveId(sectionId);
    window.history.replaceState(null, '', `#${sectionId}`);
  };

  if (!sections.length) return null;

  if (variant === 'desktop') {
    return (
      <nav
        aria-label="On this page"
        className="hidden lg:block lg:sticky lg:top-24 self-start w-full max-w-[240px]"
      >
        <p className="font-bebas text-lg text-msq-purple-rich mb-4 tracking-wide">On this page</p>
        <ul className="space-y-1 border-l border-msq-purple-light/40">
          {sections.map(section => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={event => handleNavClick(event, section.id)}
                  className={`block pl-4 py-2 text-sm font-lato leading-snug transition-colors border-l-2 -ml-px ${
                    isActive
                      ? 'border-msq-purple-rich text-msq-purple-rich font-semibold'
                      : 'border-transparent text-gray-600 hover:text-msq-purple-rich hover:border-msq-purple-light'
                  }`}
                >
                  {section.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav
      aria-label="On this page"
      className="lg:hidden mb-10 p-4 sm:p-5 rounded-xl border border-msq-purple-light/20 bg-gradient-to-br from-msq-purple-light/10 to-msq-purple-rich/10"
    >
      <p className="font-bebas text-base sm:text-lg text-msq-purple-rich mb-3 tracking-wide">
        On this page
      </p>
      <ul className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
        {sections.map(section => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                onClick={event => handleNavClick(event, section.id)}
                className={`inline-flex items-center min-h-10 px-3 py-2 text-xs sm:text-sm font-lato rounded-lg border transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-msq-purple-rich text-white border-msq-purple-rich'
                    : 'bg-white text-msq-purple-rich border-gray-100 hover:border-msq-purple-light'
                }`}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PolicySectionLegend;
