export const isValidUser = user => {
  return Boolean(user && typeof user === 'object' && user.userId);
};
