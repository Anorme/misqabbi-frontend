export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'name-a-z', label: 'Name: A to Z' },
  { value: 'name-z-a', label: 'Name: Z to A' },
];

export const getSortLabel = value => {
  const option = SORT_OPTIONS.find(opt => opt.value === value);
  return option ? option.label : 'Latest';
};
