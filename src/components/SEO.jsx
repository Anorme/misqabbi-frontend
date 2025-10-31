import { Helmet } from '@dr.pogodin/react-helmet';

const BASE_URL = 'https://misqabbigh.com';

export default function SEO({
  title,
  description = 'Discover premium fashion tailored for you at Misqabbi.',
  canonicalPath,
  image,
  type = 'website',
  robots,
  titleTemplate,
}) {
  const formatTitle = t => {
    if (!t) return 'Misqabbi';
    if (titleTemplate) return titleTemplate.replace('{title}', t);
    return `${t} | Misqabbi`;
  };
  const fullTitle = formatTitle(title);
  const canonical = canonicalPath ? `${BASE_URL}${canonicalPath}` : BASE_URL;
  const ogImage = image || `${BASE_URL}/images/Logo.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {robots && <meta name="robots" content={robots} />}

      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
