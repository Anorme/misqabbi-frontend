const HTML_ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#x2F;': '/',
  '&#39;': "'",
  '&#47;': '/',
};

export const decodeHtmlEntities = value => {
  if (typeof value !== 'string') return value;
  return value.replace(
    /&(amp|lt|gt|quot);|&#x(27|2F);|&#(39|47);/gi,
    entity => HTML_ENTITIES[entity] ?? HTML_ENTITIES[entity.toLowerCase()] ?? entity
  );
};
