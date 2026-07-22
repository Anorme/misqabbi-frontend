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
        className="hidden lg:block lg:sticky lg:top-24 lg:w-60 lg:shrink-0 lg:self-start text-center"
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
                  className={`block px-3 py-2 text-sm font-lato leading-snug transition-colors border-l-2 -ml-px ${
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
    <nav aria-label="On this page" className="lg:hidden mb-10 text-center">
      <p className="font-bebas text-base sm:text-lg text-msq-purple-rich mb-3 tracking-wide">
        On this page
      </p>
      <div className="overflow-hidden rounded-lg border border-msq-purple-light/30">
        <table className="w-full border-collapse text-center">
          <tbody>
            {sections.map((section, index) => {
              const isActive = activeId === section.id;
              const isLast = index === sections.length - 1;
              return (
                <tr
                  key={section.id}
                  className={isLast ? undefined : 'border-b border-msq-purple-light/30'}
                >
                  <td className="p-0">
                    <a
                      href={`#${section.id}`}
                      onClick={event => handleNavClick(event, section.id)}
                      className={`block px-3.5 py-2.5 text-sm font-lato leading-snug transition-colors ${
                        isActive
                          ? 'bg-msq-purple-rich/10 text-msq-purple-rich font-semibold'
                          : 'text-gray-700 hover:bg-msq-purple-light/10 hover:text-msq-purple-rich'
                      }`}
                    >
                      {section.title}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </nav>
  );
};

export default PolicySectionLegend;
