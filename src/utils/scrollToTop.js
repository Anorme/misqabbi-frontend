/**
 * Scrolls to the top of the page with smooth behavior
 * @param {Object} options - Scroll options
 * @param {number} options.top - Position to scroll to (default: 0)
 * @param {string} options.behavior - Scroll behavior (default: 'smooth')
 */
export const scrollToTop = (options = {}) => {
  const { top = 0, behavior = 'smooth' } = options;
  window.scrollTo({ top, behavior });
};

export default scrollToTop;
