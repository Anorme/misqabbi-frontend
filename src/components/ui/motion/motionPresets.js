export const motionTimings = {
  fast: 0.28,
  base: 0.4,
  slow: 0.55,
};

export const motionEasing = [0.22, 1, 0.36, 1];

export const fadeOnly = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionTimings.fast,
      ease: motionEasing,
    },
  },
};

export const presenceFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionTimings.fast,
      ease: motionEasing,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: motionTimings.fast,
      ease: motionEasing,
    },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTimings.base,
      ease: motionEasing,
    },
  },
};

export const softScale = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: motionTimings.slow,
      ease: motionEasing,
    },
  },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionTimings.base,
      ease: motionEasing,
    },
  },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionTimings.base,
      ease: motionEasing,
    },
  },
};

export const dropdownBelow = {
  hidden: { opacity: 0, y: -6, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.18,
      ease: motionEasing,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: {
      duration: 0.14,
      ease: motionEasing,
    },
  },
};

export const dropdownAbove = {
  hidden: { opacity: 0, y: 6, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.18,
      ease: motionEasing,
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.98,
    transition: {
      duration: 0.14,
      ease: motionEasing,
    },
  },
};

export const bottomSheet = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.26,
      ease: motionEasing,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: {
      duration: 0.2,
      ease: motionEasing,
    },
  },
};

export const modalPop = {
  hidden: { opacity: 0, y: 8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: motionEasing,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.96,
    transition: {
      duration: 0.16,
      ease: motionEasing,
    },
  },
};

export const createStaggerContainer = ({ delayChildren = 0.08, staggerChildren = 0.12 } = {}) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});

export const staggerContainer = createStaggerContainer();

export const slideInLeft = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: {
      duration: motionTimings.base,
      ease: motionEasing,
    },
  },
  exit: {
    x: '-100%',
    transition: {
      duration: motionTimings.fast,
      ease: motionEasing,
    },
  },
};
