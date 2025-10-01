export const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'pants', label: 'Pants' },
  { value: 'shorts', label: 'Shorts' },
  { value: 'skirts', label: 'Skirts' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'tops', label: 'Tops' },
  { value: 'dungarees', label: 'Dungarees' },
  { value: 'custom', label: 'Custom' },
];

export const getCategoryLabel = value => {
  const category = CATEGORIES.find(cat => cat.value === value);
  return category ? category.label : 'All Categories';
};

export const getCategoryValue = label => {
  const category = CATEGORIES.find(cat => cat.label === label);
  return category ? category.value : '';
};
