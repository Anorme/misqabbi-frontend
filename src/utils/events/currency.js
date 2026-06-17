/** Convert pesewas to GHS (100 pesewas = 1 GHS) */
export const pesewasToGhs = pesewas => {
  const amount = Number(pesewas);
  if (!Number.isFinite(amount)) return 0;
  return amount / 100;
};

/** Convert GHS to pesewas for API payloads */
export const ghsToPesewas = ghs => {
  const amount = Number(ghs);
  if (!Number.isFinite(amount)) return 0;
  return Math.round(amount * 100);
};
