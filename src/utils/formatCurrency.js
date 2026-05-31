export const formatCedis = value => {
  const amount = Number(value);
  const safeAmount = Number.isFinite(amount) ? amount : 0;

  return `\u20B5 ${safeAmount.toFixed(2)}`;
};
