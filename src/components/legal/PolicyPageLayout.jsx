import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Cookie,
  Database,
  FileText,
  Globe,
  Lock,
  Mail,
  Package,
  Phone,
  Scale,
  Shield,
  ShieldCheck,
  Truck,
  User,
  Users,
} from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../SEO';
import PolicySectionLegend from './PolicySectionLegend';
import { LEGAL_META } from '../../constants/legal/legalMeta';

const ICON_MAP = {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Cookie,
  Database,
  FileText,
  Globe,
  Lock,
  Mail,
  Package,
  Phone,
  Scale,
  Shield,
  ShieldCheck,
  Truck,
  User,
  Users,
};

const resolveIcon = (name, className) => {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
};

const renderRichText = (text, key) => {
  if (typeof text !== 'string') return text;

  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|support@misqabbigh\.com)/g);

  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      if (href.startsWith('/')) {
        return (
          <Link
            key={`${key}-link-${index}`}
            to={href}
            className="text-msq-purple-rich hover:text-msq-purple-deep font-semibold underline"
          >
            {label}
          </Link>
        );
      }
      return (
        <a
          key={`${key}-link-${index}`}
          href={href}
          className="text-msq-purple-rich hover:text-msq-purple-deep font-semibold underline"
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {label}
        </a>
      );
    }

    if (part === LEGAL_META.contactEmail) {
      return (
        <a
          key={`${key}-email-${index}`}
          href={`mailto:${LEGAL_META.contactEmail}`}
          className="text-msq-purple-rich hover:text-msq-purple-deep font-semibold underline"
        >
          {LEGAL_META.contactEmail}
        </a>
      );
    }

    return <span key={`${key}-text-${index}`}>{part}</span>;
  });
};

const PolicyPageLayout = ({ policy }) => {
  const {
    title,
    description,
    subtitle,
    canonicalPath,
    intro,
    sections = [],
    closing,
    contactCta,
  } = policy;

  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto font-lato">
      <SEO title={title} description={description} canonicalPath={canonicalPath} />

      <header className="text-center mb-8 lg:mb-12">
        <h1 className="font-bebas text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-msq-purple-rich mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </header>

      <PolicySectionLegend sections={sections} variant="mobile" />

      <div className="lg:flex lg:items-start lg:gap-10 xl:gap-14">
        <PolicySectionLegend sections={sections} variant="desktop" />

        <div className="min-w-0 lg:flex-1">
          {intro && (
            <section className="mb-10 lg:mb-12 p-4 md:p-8 bg-gradient-to-br from-msq-purple-light/10 to-msq-purple-rich/10 rounded-xl border border-msq-purple-light/20 text-center">
              <div className="flex flex-col items-center gap-4">
                {intro.icon && (
                  <div className="flex-shrink-0">
                    {resolveIcon(intro.icon, 'w-8 h-8 sm:w-10 sm:h-10 text-msq-purple-rich')}
                  </div>
                )}
                <div className="min-w-0 w-full">
                  {intro.title && (
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bebas text-msq-purple-rich mb-2 md:mb-3">
                      {intro.title}
                    </h2>
                  )}
                  {intro.body && (
                    <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                      {renderRichText(intro.body, 'intro')}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {sections.length > 0 && (
            <section className="mb-10 lg:mb-12">
              <div className="space-y-6">
                {sections.map(section => (
                  <article
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 flex flex-col items-center gap-3 p-4 md:p-6 bg-white border-2 border-gray-100 rounded-lg hover:border-msq-purple-light transition-colors text-center"
                  >
                    {section.icon && (
                      <div className="flex-shrink-0">
                        {section.iconBadge ? (
                          <div className="p-2 sm:p-3 bg-msq-purple-rich/10 rounded-full">
                            {resolveIcon(
                              section.icon,
                              'w-6 h-6 sm:w-8 sm:h-8 text-msq-purple-rich'
                            )}
                          </div>
                        ) : (
                          resolveIcon(section.icon, 'w-6 h-6 sm:w-8 sm:h-8 text-msq-purple-rich')
                        )}
                      </div>
                    )}
                    <div className="min-w-0 w-full">
                      <h2 className="text-base sm:text-lg md:text-xl font-bebas text-msq-purple-rich mb-2">
                        {section.title}
                      </h2>
                      {section.paragraphs?.map((paragraph, index) => (
                        <p
                          key={`${section.id}-p-${index}`}
                          className={`text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed ${
                            index < section.paragraphs.length - 1 || section.bullets?.length
                              ? 'mb-3'
                              : ''
                          }`}
                        >
                          {renderRichText(paragraph, `${section.id}-p-${index}`)}
                        </p>
                      ))}
                      {section.bullets?.length > 0 && (
                        <ul className="mt-1 space-y-2 list-disc list-inside text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                          {section.bullets.map((bullet, index) => (
                            <li key={`${section.id}-b-${index}`}>
                              {renderRichText(bullet, `${section.id}-b-${index}`)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {closing && (
            <section
              className={`mb-10 lg:mb-12 p-4 md:p-8 rounded-xl text-center ${
                closing.variant === 'solid'
                  ? 'bg-msq-purple-rich text-white'
                  : 'bg-gradient-to-br from-msq-purple-light/10 to-msq-purple-rich/10 border border-msq-purple-light/20'
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                {closing.icon && (
                  <div className="flex-shrink-0">
                    {resolveIcon(
                      closing.icon,
                      closing.variant === 'solid'
                        ? 'w-8 h-8 sm:w-10 sm:h-10 text-white'
                        : 'w-8 h-8 sm:w-10 sm:h-10 text-msq-purple-rich'
                    )}
                  </div>
                )}
                <div className="min-w-0 w-full">
                  {closing.title && (
                    <h2
                      className={`text-lg md:text-xl lg:text-2xl font-bebas mb-2 md:mb-3 ${
                        closing.variant === 'solid' ? 'text-white' : 'text-msq-purple-rich'
                      }`}
                    >
                      {closing.title}
                    </h2>
                  )}
                  {(closing.paragraphs || (closing.body ? [closing.body] : [])).map(
                    (paragraph, index) => (
                      <p
                        key={`closing-${index}`}
                        className={`text-xs sm:text-sm lg:text-base leading-relaxed ${
                          closing.variant === 'solid' ? 'text-white/95' : 'text-gray-700'
                        } ${index < (closing.paragraphs?.length || 1) - 1 ? 'mb-3 md:mb-4' : ''}`}
                      >
                        {renderRichText(paragraph, `closing-${index}`)}
                      </p>
                    )
                  )}
                </div>
              </div>
            </section>
          )}

          {contactCta && (
            <section
              className={`p-4 md:p-8 rounded-xl ${
                contactCta.variant === 'solid'
                  ? 'bg-msq-purple-rich text-white'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <h2
                className={`text-lg md:text-xl lg:text-2xl font-bebas mb-2 md:mb-4 text-center ${
                  contactCta.variant === 'solid' ? 'text-white' : 'text-msq-purple-rich'
                }`}
              >
                {contactCta.title}
              </h2>
              {contactCta.body && (
                <p
                  className={`text-xs sm:text-sm lg:text-base mb-4 md:mb-6 leading-relaxed text-center ${
                    contactCta.variant === 'solid' ? 'text-white/95' : 'text-gray-700'
                  }`}
                >
                  {renderRichText(contactCta.body, 'cta')}
                </p>
              )}
              {contactCta.actions?.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center">
                  {contactCta.actions.map(action => {
                    const className =
                      action.style === 'primary'
                        ? contactCta.variant === 'solid'
                          ? 'text-xs sm:text-sm lg:text-base bg-white text-msq-purple-rich px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center'
                          : 'text-xs sm:text-sm lg:text-base bg-msq-purple-rich text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-msq-purple-deep transition-colors text-center'
                        : contactCta.variant === 'solid'
                          ? 'text-xs sm:text-sm lg:text-base bg-transparent border-2 border-white text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center'
                          : 'text-xs sm:text-sm lg:text-base bg-transparent border-2 border-msq-purple-rich text-msq-purple-rich px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-msq-purple-rich hover:text-white transition-colors text-center';

                    if (action.to) {
                      return (
                        <Link key={action.label} to={action.to} className={className}>
                          {action.label}
                        </Link>
                      );
                    }

                    return (
                      <a
                        key={action.label}
                        href={action.href}
                        target={action.external ? '_blank' : undefined}
                        rel={action.external ? 'noopener noreferrer' : undefined}
                        className={className}
                      >
                        {action.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default PolicyPageLayout;
