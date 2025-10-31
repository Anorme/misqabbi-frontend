import { Helmet } from '@dr.pogodin/react-helmet';
import { SOCIALS_MAP } from '../../constants/socials';
import { getImageUrl } from '../../utils/productImages';

const BASE_URL = 'https://misqabbigh.com';
const DEFAULT_CURRENCY = 'GHS';

/**
 * StructuredData component for JSON-LD structured data
 * Supports Organization, WebSite, and Product schemas
 */
export default function StructuredData({ type, data }) {
  if (!type || !data) return null;

  let jsonLd = {};

  switch (type) {
    case 'Organization': {
      const socialProfiles = [SOCIALS_MAP.Instagram, SOCIALS_MAP.Tiktok].filter(Boolean); // Remove any undefined/null values

      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: data.name || 'Misqabbi',
        url: BASE_URL,
        logo: data.logo || `${BASE_URL}/images/Logo.png`,
        description: data.description || 'Misqabbi | Uniquely Made for Her',
        sameAs: data.sameAs || socialProfiles,
      };
      break;
    }

    case 'WebSite':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: data.name || 'Misqabbi',
        url: BASE_URL,
        description: data.description || 'Misqabbi | Uniquely Made for Her',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BASE_URL}/shop?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      };
      break;

    case 'Product': {
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data.name,
        description: data.description || `Shop ${data.name} at Misqabbi`,
        images: data.images?.map(getImageUrl) || [],
        url: `${BASE_URL}/product/${data.slug}`,
        sku: data._id,
        brand: {
          '@type': 'Brand',
          name: 'Misqabbi',
        },
        category: data.category || 'Fashion',
        offers: {
          '@type': 'Offer',
          url: `${BASE_URL}/product/${data.slug}`,
          priceCurrency: DEFAULT_CURRENCY,
          price: data.price?.toString() || '0',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: 'Misqabbi',
          },
        },
      };

      break;
    }

    default:
      return null;
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd, null, 2)}</script>
    </Helmet>
  );
}
