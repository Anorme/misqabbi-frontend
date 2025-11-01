export const CATEGORIES = [
  { value: '', label: 'ALL' },
  { value: 'pants', label: 'PANTS' },
  { value: 'shorts', label: 'SHORTS' },
  { value: 'skirts', label: 'SKIRTS' },
  { value: 'dresses', label: 'DRESSES' },
  { value: 'tops', label: 'TOPS' },
  { value: 'dungarees', label: 'DUNGARREES' },
];

export const getCategoryLabel = value => {
  const category = CATEGORIES.find(cat => cat.value === value);
  return category ? category.label : 'ALL CATEGORIES';
};

export const getCategoryValue = label => {
  const category = CATEGORIES.find(cat => cat.label === label);
  return category ? category.value : '';
};
